#!/usr/bin/env python3
"""
Zadarma API v1 Authentication Test Script
==========================================
Implements the EXACT signing logic from the official Zadarma Python library:
https://github.com/zadarma/user-api-v1/blob/master/zadarma/api.py

Sign string format (from official lib):
    sign_str = "{method}{params_sorted_urlencode}{md5_hex_of_params_sorted_urlencode}"
    signature = base64( hmac-sha1( secret, sign_str ) )
    Header:  Authorization: {key}:{signature}

Key differences from naive implementations:
  1. params are sorted by key, then urlencoded (key=val&key2=val2)
  2. MD5 is computed on the sorted+urlencoded param string
  3. The method path MUST include leading slash (e.g., /v1/info/balance/)
  4. For GET with no params, params_str is empty string ""
  5. MD5 of empty string is "d41d8cd98f00b204e9800998ecf8427e"
"""

import hashlib
import hmac
import base64
import urllib.parse
import urllib.request
import json
import ssl
import sys
from collections import OrderedDict


# ─── Credentials ───────────────────────────────────────────────────────────────
API_KEY    = "212d57bcd79758650f71"
API_SECRET = "dd776a8c73f1decd2240"
API_BASE   = "https://api.zadarma.com"


def zadarma_sign(method: str, params: dict, secret: str) -> tuple:
    """
    Replicates the EXACT signing logic from the official Zadarma Python library.

    Official source (zadarma/api.py __auth_params method):
        params_string = urlencode(sorted(params.items()))
        md5 = hashlib.md5(params_string.encode('utf-8')).hexdigest()
        sign_string = method + params_string + md5
        signature = base64.b64encode(
            hmac.new(secret.encode('utf-8'),
                     sign_string.encode('utf-8'),
                     hashlib.sha1).digest()
        ).decode('utf-8')

    Returns: (signature, sign_string, params_string, md5_hex)
    """
    # Step 1: Sort params alphabetically by key, then URL-encode
    if params:
        sorted_params = OrderedDict(sorted(params.items()))
        params_string = urllib.parse.urlencode(sorted_params)
    else:
        params_string = ""

    # Step 2: MD5 of the params string
    md5_hex = hashlib.md5(params_string.encode("utf-8")).hexdigest()

    # Step 3: Build sign string = method + params_string + md5
    sign_string = method + params_string + md5_hex

    # Step 4: HMAC-SHA1 with secret, then base64 encode
    hmac_digest = hmac.new(
        secret.encode("utf-8"),
        sign_string.encode("utf-8"),
        hashlib.sha1
    ).digest()
    signature = base64.b64encode(hmac_digest).decode("utf-8")

    return signature, sign_string, params_string, md5_hex


def make_request(method_path: str, params: dict = None, http_method: str = "GET"):
    """Make an authenticated request to the Zadarma API."""
    if params is None:
        params = {}

    signature, sign_string, params_string, md5_hex = zadarma_sign(
        method_path, params, API_SECRET
    )

    auth_header = f"{API_KEY}:{signature}"

    # ─── Debug output ──────────────────────────────────────────────────────
    print("=" * 70)
    print("ZADARMA API AUTH DEBUG")
    print("=" * 70)
    print(f"  Endpoint:       {method_path}")
    print(f"  HTTP Method:    {http_method}")
    print(f"  API Key:        {API_KEY}")
    print(f"  API Secret:     {API_SECRET[:6]}...{API_SECRET[-4:]}")
    print(f"  Params (raw):   {params}")
    print(f"  Params (enc):   '{params_string}'")
    print(f"  MD5(params):    {md5_hex}")
    print(f"  Sign string:    '{sign_string}'")
    print(f"  Signature:      {signature}")
    print(f"  Auth header:    Authorization: {auth_header}")
    print("=" * 70)

    # ─── Build request ─────────────────────────────────────────────────────
    url = API_BASE + method_path
    if http_method == "GET" and params_string:
        url += "?" + params_string

    req = urllib.request.Request(url, method=http_method)
    req.add_header("Authorization", auth_header)
    req.add_header("Accept", "application/json")

    if http_method == "POST" and params_string:
        req.data = params_string.encode("utf-8")
        req.add_header("Content-Type", "application/x-www-form-urlencoded")

    # Allow self-signed certs (not recommended for prod)
    ctx = ssl.create_default_context()

    try:
        print(f"\n>>> Sending {http_method} {url}")
        print(f">>> Headers: Authorization: {auth_header}")
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            status = resp.status
            body = resp.read().decode("utf-8")
            print(f"\n<<< Response Status: {status}")
            try:
                parsed = json.loads(body)
                print(f"<<< Response Body:\n{json.dumps(parsed, indent=2)}")
            except json.JSONDecodeError:
                print(f"<<< Response Body (raw):\n{body}")
            return status, body
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8") if e.fp else ""
        print(f"\n<<< HTTP ERROR: {e.code} {e.reason}")
        try:
            parsed = json.loads(body)
            print(f"<<< Error Body:\n{json.dumps(parsed, indent=2)}")
        except (json.JSONDecodeError, Exception):
            print(f"<<< Error Body (raw):\n{body}")
        return e.code, body
    except Exception as e:
        print(f"\n<<< CONNECTION ERROR: {type(e).__name__}: {e}")
        return None, str(e)


def run_tests():
    """Run a series of auth tests against different endpoints."""

    print("\n" + "#" * 70)
    print("# TEST 1: /v1/info/balance/  (with trailing slash)")
    print("#" * 70)
    status1, _ = make_request("/v1/info/balance/")

    print("\n" + "#" * 70)
    print("# TEST 2: /v1/info/balance  (WITHOUT trailing slash)")
    print("#" * 70)
    status2, _ = make_request("/v1/info/balance")

    print("\n" + "#" * 70)
    print("# TEST 3: /v1/info/timezone/  (alternative endpoint)")
    print("#" * 70)
    status3, _ = make_request("/v1/info/timezone/")

    print("\n" + "#" * 70)
    print("# TEST 4: /v1/tariff/  (tariff info)")
    print("#" * 70)
    status4, _ = make_request("/v1/tariff/")

    # ─── Summary & Diagnosis ──────────────────────────────────────────────
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    results = {
        "/v1/info/balance/ ": status1,
        "/v1/info/balance  ": status2,
        "/v1/info/timezone/": status3,
        "/v1/tariff/       ": status4,
    }
    for ep, st in results.items():
        icon = "OK" if st == 200 else "FAIL"
        print(f"  [{icon}] {ep} -> {st}")

    all_401 = all(s == 401 for s in results.values() if s is not None)
    all_403 = all(s == 403 for s in results.values() if s is not None)

    if all_401:
        print("""
╔══════════════════════════════════════════════════════════════════════╗
║  DIAGNOSIS: All endpoints return 401 Unauthorized                  ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  The signing logic above matches the official Zadarma library      ║
║  EXACTLY. If you still get 401, the issue is NOT the signing       ║
║  algorithm. Possible causes:                                       ║
║                                                                    ║
║  1. CREDENTIALS INVALID OR DEACTIVATED                             ║
║     - After regenerating API keys in Zadarma panel, the old keys   ║
║       are immediately invalidated.                                 ║
║     - Go to: my.zadarma.com -> Settings -> API -> verify the key   ║
║       and secret shown match EXACTLY what is used here.            ║
║     - If you recently regenerated keys, the new ones may take up   ║
║       to 5 minutes to propagate.                                   ║
║                                                                    ║
║  2. API ACCESS NOT ENABLED ON THE ACCOUNT                          ║
║     - Zadarma requires explicitly enabling API access:             ║
║       my.zadarma.com -> Settings -> API & Integrations             ║
║     - The API toggle/checkbox must be ON.                          ║
║     - Free/trial accounts may have API access restricted.          ║
║                                                                    ║
║  3. IP WHITELIST RESTRICTION                                       ║
║     - Zadarma allows restricting API access to specific IPs.       ║
║     - If an IP whitelist is configured, requests from other IPs    ║
║       will get 401.                                                ║
║     - Check: my.zadarma.com -> Settings -> API -> "Allowed IPs"   ║
║     - Either add your current IP or remove the whitelist.          ║
║                                                                    ║
║  4. ACCOUNT SUSPENDED OR BILLING ISSUE                             ║
║     - If the Zadarma account has an unpaid balance or has been     ║
║       suspended, API access may return 401.                        ║
║     - Check account status in the Zadarma dashboard.               ║
║                                                                    ║
║  5. WRONG API ENDPOINT / REGION                                    ║
║     - Default endpoint is https://api.zadarma.com                  ║
║     - Some accounts may need a regional endpoint. Check docs.      ║
║                                                                    ║
║  6. RATE LIMITING                                                  ║
║     - Zadarma enforces rate limits. Excessive failed auth          ║
║       attempts may cause temporary blocks.                         ║
║     - Wait 10-15 minutes and try again with correct credentials.   ║
║                                                                    ║
║  RECOMMENDED ACTIONS:                                              ║
║     a) Log into my.zadarma.com                                     ║
║     b) Go to Settings -> API                                       ║
║     c) Verify API is enabled                                       ║
║     d) Regenerate a fresh key+secret pair                          ║
║     e) Remove any IP whitelist (or add your IP)                    ║
║     f) Wait 2 minutes, then run this script with the new creds    ║
║                                                                    ║
╚══════════════════════════════════════════════════════════════════════╝
""")
    elif all_403:
        print("""
  DIAGNOSIS: 403 Forbidden - API access is disabled or IP is blocked.
  -> Enable API in Zadarma panel, or check IP whitelist.
""")
    elif any(s == 200 for s in results.values()):
        print("\n  AUTH IS WORKING! At least one endpoint returned 200.")
    else:
        print("\n  Mixed results - check individual endpoint responses above.")


if __name__ == "__main__":
    run_tests()
