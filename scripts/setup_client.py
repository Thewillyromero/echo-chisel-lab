#!/usr/bin/env python3
"""
CALLA Client Ecosystem Setup
=============================
Automates VAPI resource creation for new CALLA enterprise clients.

Steps automated:
  1. Read client config from YAML
  2. Create VAPI BYO-SIP credential (Zadarma PBX)
  3. Create VAPI phone number linked to credential
  4. Create VAPI assistants from templates
  5. Save all IDs to clients/{slug}/config.json

Usage:
  python setup_client.py path/to/client.yaml
  python setup_client.py path/to/client.yaml --dry-run
  python setup_client.py path/to/client.yaml --force   # recreate even if exists

Requires:
  - pip install requests pyyaml
  - env var VAPI_PRIVATE_KEY
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from typing import Optional

try:
    import yaml
except ImportError:
    print("ERROR: PyYAML not installed. Run: pip install pyyaml")
    sys.exit(1)

try:
    import requests
except ImportError:
    print("ERROR: requests not installed. Run: pip install requests")
    sys.exit(1)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
VAPI_BASE = "https://api.vapi.ai"
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
TEMPLATES_DIR = PROJECT_ROOT / "templates"
CLIENTS_DIR = PROJECT_ROOT / "clients"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def slugify(text: str) -> str:
    """Convert text to a filesystem-safe slug."""
    text = text.lower().strip()
    text = re.sub(r"[áàäâ]", "a", text)
    text = re.sub(r"[éèëê]", "e", text)
    text = re.sub(r"[íìïî]", "i", text)
    text = re.sub(r"[óòöô]", "o", text)
    text = re.sub(r"[úùüû]", "u", text)
    text = re.sub(r"[ñ]", "n", text)
    text = re.sub(r"[^a-z0-9]+", "_", text)
    return text.strip("_")


def json_escape(text: str) -> str:
    """Escape a string so it is safe to embed inside a JSON string value."""
    # json.dumps adds surrounding quotes; strip them
    return json.dumps(text, ensure_ascii=False)[1:-1]


def fill_template(template_str: str, values: dict) -> str:
    """Replace {{key}} placeholders in a template string.

    Values are JSON-escaped so that newlines and special chars
    don't break the surrounding JSON structure.
    """
    result = template_str
    for key, val in values.items():
        placeholder = "{{" + key + "}}"
        if isinstance(val, str):
            result = result.replace(placeholder, json_escape(val))
        else:
            # For non-string values, dump without outer quotes
            result = result.replace(placeholder, json.dumps(val, ensure_ascii=False))
    return result


def format_equipo(equipo: list) -> str:
    """Format the equipo list as readable text for prompts."""
    lines = []
    for dept in equipo:
        lines.append(f"- {dept['nombre']}: extensión {dept['extension']}")
    return "\n".join(lines)


def vapi_headers(api_key: str) -> dict:
    return {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }


def vapi_request(method: str, endpoint: str, api_key: str, data: dict = None) -> dict:
    """Make a VAPI API request with error handling."""
    url = f"{VAPI_BASE}/{endpoint.lstrip('/')}"
    headers = vapi_headers(api_key)
    resp = requests.request(method, url, headers=headers, json=data, timeout=30)
    if resp.status_code >= 400:
        raise RuntimeError(
            f"VAPI {method} {endpoint} failed ({resp.status_code}): {resp.text}"
        )
    return resp.json()


# ---------------------------------------------------------------------------
# VAPI resource creators
# ---------------------------------------------------------------------------
def create_credential(cfg: dict, api_key: str, dry_run: bool) -> dict:
    """Create a BYO-SIP credential in VAPI for Zadarma PBX."""
    z = cfg["zadarma"]
    payload = {
        "provider": "byo-sip-trunk",
        "name": f"{cfg['empresa']} — Zadarma Outbound",
        "gateways": [
            {
                "ip": z["server"],
                "port": z["port"],
                "netmask": 32,
                "inboundEnabled": False,
                "outboundEnabled": True,
            }
        ],
        "outboundAuthenticationPlan": {
            "authUsername": z["extension_user"],
            "authPassword": z["extension_pass"],
        },
        "outboundLeadingPlusEnabled": True,
    }

    if dry_run:
        print("\n[DRY-RUN] POST /credential")
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return {"id": "dry-run-credential-id", "name": payload["name"]}

    print("\n[CREATING] VAPI credential...")
    result = vapi_request("POST", "/credential", api_key, payload)
    print(f"  -> Credential ID: {result['id']}")
    return result


def create_phone_number(cfg: dict, credential_id: str, api_key: str, dry_run: bool) -> dict:
    """Create a VAPI phone number linked to the BYO-SIP credential."""
    z = cfg["zadarma"]
    payload = {
        "provider": "byo-phone-number",
        "name": f"{cfg['empresa']} — Línea principal",
        "number": z["caller_id"],
        "credentialId": credential_id,
        "numberE164CheckEnabled": False,
    }

    if dry_run:
        print("\n[DRY-RUN] POST /phone-number")
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return {"id": "dry-run-phone-id", "number": z["caller_id"]}

    print("\n[CREATING] VAPI phone number...")
    result = vapi_request("POST", "/phone-number", api_key, payload)
    print(f"  -> Phone Number ID: {result['id']}")
    print(f"  -> Number: {result.get('number', z['caller_id'])}")
    return result


def create_assistant(cfg: dict, assistant_type: str, phone_number_id: str,
                     api_key: str, dry_run: bool) -> dict:
    """Create a VAPI assistant from a template."""
    template_file = TEMPLATES_DIR / f"assistant_{assistant_type}.json"
    if not template_file.exists():
        raise FileNotFoundError(
            f"Template not found: {template_file}\n"
            f"Available templates: {list(TEMPLATES_DIR.glob('assistant_*.json'))}"
        )

    template_str = template_file.read_text(encoding="utf-8")

    # Build placeholder values
    values = {
        "empresa": cfg["empresa"],
        "sector": cfg.get("sector", ""),
        "direccion": cfg.get("direccion", ""),
        "tono": cfg.get("tono", "profesional"),
        "idioma": cfg.get("idioma", "es"),
        "servicios": cfg.get("servicios", ""),
        "horarios": cfg.get("horarios", ""),
        "faq": cfg.get("faq", ""),
        "voice_nombre": cfg["voice"]["nombre"],
        "voice_id": cfg["voice"]["voice_id"],
        "voice_saludo": cfg["voice"]["saludo"],
        "equipo_formatted": format_equipo(cfg.get("equipo", [])),
    }

    filled = fill_template(template_str, values)

    # Parse the filled JSON
    try:
        payload = json.loads(filled)
    except json.JSONDecodeError as e:
        raise RuntimeError(f"Template JSON parse error after filling placeholders: {e}\n{filled}")

    if dry_run:
        print(f"\n[DRY-RUN] POST /assistant ({assistant_type})")
        print(json.dumps(payload, indent=2, ensure_ascii=False))
        return {"id": f"dry-run-assistant-{assistant_type}", "name": payload["name"]}

    print(f"\n[CREATING] VAPI assistant: {assistant_type}...")
    result = vapi_request("POST", "/assistant", api_key, payload)
    print(f"  -> Assistant ID: {result['id']}")
    print(f"  -> Name: {result.get('name', '?')}")
    return result


# ---------------------------------------------------------------------------
# Idempotency: check for existing config
# ---------------------------------------------------------------------------
def load_existing_config(slug: str) -> Optional[dict]:
    """Load existing client config if it exists."""
    config_path = CLIENTS_DIR / slug / "config.json"
    if config_path.exists():
        return json.loads(config_path.read_text(encoding="utf-8"))
    return None


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        description="CALLA Client Ecosystem Setup — automates VAPI resource creation"
    )
    parser.add_argument("config_file", help="Path to client YAML config file")
    parser.add_argument("--dry-run", action="store_true",
                        help="Show what would be created without calling APIs")
    parser.add_argument("--force", action="store_true",
                        help="Recreate resources even if client config already exists")
    args = parser.parse_args()

    # ---- Load client config ----
    config_path = Path(args.config_file)
    if not config_path.exists():
        print(f"ERROR: Config file not found: {config_path}")
        sys.exit(1)

    with open(config_path, "r", encoding="utf-8") as f:
        cfg = yaml.safe_load(f)

    empresa = cfg.get("empresa")
    if not empresa:
        print("ERROR: 'empresa' field is required in the config file")
        sys.exit(1)

    slug = slugify(empresa)

    print("=" * 60)
    print(f"  CALLA Client Setup: {empresa}")
    print(f"  Slug: {slug}")
    print(f"  Dry run: {args.dry_run}")
    print("=" * 60)

    # ---- Check API key ----
    api_key = os.environ.get("VAPI_PRIVATE_KEY", "")
    if not api_key and not args.dry_run:
        print("ERROR: Set VAPI_PRIVATE_KEY environment variable")
        print("  export VAPI_PRIVATE_KEY='your-key-here'")
        sys.exit(1)

    # ---- Idempotency check ----
    existing = load_existing_config(slug)
    if existing and not args.force:
        print(f"\n[SKIP] Client '{empresa}' already set up.")
        print(f"  Config: {CLIENTS_DIR / slug / 'config.json'}")
        print(f"  Credential ID: {existing.get('credential_id', '?')}")
        print(f"  Phone Number ID: {existing.get('phone_number_id', '?')}")
        for a in existing.get("assistants", []):
            print(f"  Assistant ({a['type']}): {a['id']}")
        print("\nUse --force to recreate.")
        sys.exit(0)

    # ---- Validate config ----
    required_fields = ["empresa", "zadarma", "voice", "assistants"]
    for field in required_fields:
        if field not in cfg:
            print(f"ERROR: Required field '{field}' missing from config")
            sys.exit(1)

    zadarma_required = ["server", "port", "extension_user", "extension_pass", "caller_id"]
    for field in zadarma_required:
        if field not in cfg["zadarma"]:
            print(f"ERROR: Required field 'zadarma.{field}' missing from config")
            sys.exit(1)

    voice_required = ["nombre", "voice_id", "saludo"]
    for field in voice_required:
        if field not in cfg["voice"]:
            print(f"ERROR: Required field 'voice.{field}' missing from config")
            sys.exit(1)

    # ---- Track created resources for rollback hints ----
    created = {
        "empresa": empresa,
        "slug": slug,
        "credential_id": None,
        "phone_number_id": None,
        "phone_number": cfg["zadarma"]["caller_id"],
        "assistants": [],
        "zadarma": {
            "server": cfg["zadarma"]["server"],
            "port": cfg["zadarma"]["port"],
            "extension_user": cfg["zadarma"]["extension_user"],
            "caller_id": cfg["zadarma"]["caller_id"],
            "max_channels": cfg["zadarma"].get("max_channels", 3),
        },
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }

    try:
        # ---- Step 1: Create credential ----
        cred = create_credential(cfg, api_key, args.dry_run)
        created["credential_id"] = cred["id"]

        # ---- Step 2: Create phone number ----
        phone = create_phone_number(cfg, cred["id"], api_key, args.dry_run)
        created["phone_number_id"] = phone["id"]

        # ---- Step 3: Create assistants ----
        for assistant_cfg in cfg.get("assistants", []):
            a_type = assistant_cfg["type"]
            assistant = create_assistant(cfg, a_type, phone["id"], api_key, args.dry_run)
            created["assistants"].append({
                "type": a_type,
                "id": assistant["id"],
                "name": assistant.get("name", ""),
            })

    except Exception as e:
        print(f"\n{'=' * 60}")
        print(f"  ERROR DURING SETUP")
        print(f"{'=' * 60}")
        print(f"\n{e}\n")

        # Rollback hints
        if created["credential_id"] and not args.dry_run:
            print("ROLLBACK HINTS:")
            print(f"  - Delete credential: curl -X DELETE {VAPI_BASE}/credential/{created['credential_id']} \\")
            print(f"      -H 'Authorization: Bearer $VAPI_PRIVATE_KEY'")
        if created["phone_number_id"] and not args.dry_run:
            print(f"  - Delete phone number: curl -X DELETE {VAPI_BASE}/phone-number/{created['phone_number_id']} \\")
            print(f"      -H 'Authorization: Bearer $VAPI_PRIVATE_KEY'")
        for a in created["assistants"]:
            print(f"  - Delete assistant ({a['type']}): curl -X DELETE {VAPI_BASE}/assistant/{a['id']} \\")
            print(f"      -H 'Authorization: Bearer $VAPI_PRIVATE_KEY'")

        sys.exit(1)

    # ---- Save config ----
    client_dir = CLIENTS_DIR / slug
    client_dir.mkdir(parents=True, exist_ok=True)
    config_out = client_dir / "config.json"

    if not args.dry_run:
        config_out.write_text(
            json.dumps(created, indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )
        print(f"\n[SAVED] {config_out}")
    else:
        print(f"\n[DRY-RUN] Would save to: {config_out}")
        print(json.dumps(created, indent=2, ensure_ascii=False))

    # ---- Summary ----
    print(f"\n{'=' * 60}")
    print(f"  SETUP COMPLETE: {empresa}")
    print(f"{'=' * 60}")
    print(f"""
  Credential ID:    {created['credential_id']}
  Phone Number ID:  {created['phone_number_id']}
  Phone Number:     {created['phone_number']}
  Max Channels:     {created['zadarma']['max_channels']}
""")
    for a in created["assistants"]:
        print(f"  Assistant ({a['type']}): {a['id']}")

    print(f"""
  Config saved:     {config_out}

{'=' * 60}
  TEST CHECKLIST
{'=' * 60}

  [ ] 1. Verify Zadarma extension {cfg['zadarma']['extension_user']} is active
  [ ] 2. Test call via VAPI dashboard using phone number {created['phone_number_id']}
  [ ] 3. Verify caller ID shows {cfg['zadarma']['caller_id']}
  [ ] 4. Test each assistant:""")
    for a in created["assistants"]:
        print(f"        [ ] {a['type']}: {a['id']}")
    print(f"""  [ ] 5. Verify max concurrent calls = {created['zadarma']['max_channels']}
  [ ] 6. Configure CRM middleware (n8n/webhook) with these IDs
  [ ] 7. Run 3 test calls to real numbers
  [ ] 8. Confirm audio bidirectional + transcription working
""")


if __name__ == "__main__":
    main()
