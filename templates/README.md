# CALLA — VAPI Assistant Templates

## Templates

| File | Purpose | Direction |
|------|---------|-----------|
| `assistant_recepcion.json` | General reception — answers all calls, routes, takes messages, books appointments | Inbound |
| `assistant_comercial.json` | Sales/commercial — qualifies leads (BANT), books meetings with sales team | Inbound + Outbound |
| `assistant_soporte.json` | Technical support — diagnoses issues, checks FAQ, creates tickets, escalates | Inbound |
| `ecosystem_config.json` | Master config per client — all placeholders centralized in one file | N/A |

## How to clone for a new client

### Step 1: Create client folder
```bash
mkdir -p clients/[client_id]
cp templates/ecosystem_config.json clients/[client_id]/config.json
```

### Step 2: Fill the master config
Open `clients/[client_id]/config.json` and replace every `{{PLACEHOLDER}}` with the client's real data. This is the single source of truth for all their info.

### Step 3: Choose which assistants the client needs
Not every client needs all 3. Most start with `recepcion`. Copy only what's needed:
```bash
cp templates/assistant_recepcion.json clients/[client_id]/
cp templates/assistant_comercial.json clients/[client_id]/   # if needed
cp templates/assistant_soporte.json clients/[client_id]/     # if needed
```

### Step 4: Fill placeholders in assistant JSONs
Replace all `{{PLACEHOLDER}}` values in each assistant file using data from the master config. Key placeholders:

| Placeholder | Example | Where it goes |
|-------------|---------|---------------|
| `{{EMPRESA}}` | Grefusa | Assistant name, system prompt |
| `{{NOMBRE_ASISTENTE}}` | Laura | System prompt persona |
| `{{DESCRIPCION_EMPRESA}}` | Empresa de snacks con sede en Valencia... | System prompt context |
| `{{VOICE_ID}}` | h2cd3gvcqTp3m65Dysk7 | 11Labs voice config |
| `{{IDIOMA}}` | Espanol | System prompt |
| `{{IDIOMA_CODE}}` | es | Deepgram transcriber |
| `{{TONO}}` | Profesional y cercano | System prompt tone |
| `{{HORARIOS}}` | L-V 9:00-18:00 | System prompt info |
| `{{SERVICIOS}}` | Fabricacion de snacks, distribucion... | System prompt info |
| `{{DIRECCION}}` | Carrer de la Innovacio 5, Valencia | System prompt info |
| `{{FAQ}}` | (multiline: pregunta/respuesta pairs) | System prompt |
| `{{EQUIPO}}` | (list: nombre - cargo - extension) | System prompt routing |
| `{{SALUDO}}` | Hola, Grefusa, soy Laura, dime! | firstMessage |
| `{{CLIENT_ID}}` | rec81ZqfxcNTWFvNO | metadata |

### Step 5: Deploy to VAPI
Use the VAPI API to create each assistant:
```bash
curl -X POST https://api.vapi.ai/assistant \
  -H "Authorization: Bearer $VAPI_API_KEY" \
  -H "Content-Type: application/json" \
  -d @clients/[client_id]/assistant_recepcion.json
```
Save the returned assistant ID back into `config.json` under `vapi.assistants.recepcion`.

## Voice ID options (11Labs)

| Voice | ID | Gender | Language | Best for |
|-------|----|--------|----------|----------|
| Guille (PB custom) | h2cd3gvcqTp3m65Dysk7 | M | ES | Sales, commercial |
| Sara | EXAVITQu4vr4xnSDxMaL | F | ES/EN | Reception, support |
| Laura | FGY2WhTYpPnrIDTdsKH5 | F | ES | Reception |
| Aria | 9BWtsMINqrJLrRacOk9x | F | EN | English clients |
| Roger | CwhRBWXzGAHq8TQ4Fs17 | M | EN/ES | Neutral male |

Note: Check 11Labs for current voice availability. Custom cloned voices are recommended for premium clients.

## Template tuning per client type

### Small practice (2-10 employees)
- Usually only needs `recepcion`
- FAQ section is critical (they get repetitive questions)
- Equipo section is short (1-3 people)

### Medium business (10-50 employees)
- Typically needs `recepcion` + `comercial`
- Add department routing in equipo section
- Consider separate phone numbers per assistant

### Larger enterprise (50-200 employees)
- All 3 templates
- Detailed FAQ per department
- Multiple escalation paths in soporte
- May need custom structured data fields

## Config reference (ecosystem_config.json)

The master config groups all client data into sections:

- **client**: Business identity and content (empresa, servicios, FAQ, etc.)
- **zadarma**: SIP telephony config (extensions, numbers, channels)
- **vapi**: Assistant IDs and credentials (filled after deployment)
- **integrations**: CRM, calendar, notifications (webhooks, IDs)
- **voice**: Persona config (name, voice, greeting)
