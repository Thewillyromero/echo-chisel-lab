# CALLA/Psycoboost -- n8n Post-Call Workflow Design

**Version:** 1.0 -- Design Only (no deployment)
**Date:** 2026-03-26
**Status:** DESIGN DOCUMENT -- NOT DEPLOYED

---

## 1. Architecture Overview

```
VAPI (end-of-call-report)
        |
        v
[VAW Event Router]  (existing workflow rrMxLnsZTTJHtIHk)
        |
        | filters type === "end-of-call-report"
        v
[POST-CALL BRAIN]  <<<--- THIS WORKFLOW (new)
        |
        +---> Route by "resultado"
        |       |
        |       +---> INTERESADO_AGENDO
        |       +---> INTERESADO_NO_AGENDO
        |       +---> PEDIR_CALLBACK
        |       +---> NO_INTERESADO
        |       +---> GATEKEEPER / NO_DISPONIBLE
        |       +---> ERROR / unknown
        |
        +---> Airtable (all paths write here)
        +---> Telegram (error alerts to Willy)
        +---> [future] WhatsApp Business API

[SMART CALLBACK CRON]  <<<--- SECOND WORKFLOW (new)
        |
        +---> Every 15 min: check Airtable for due callbacks
        +---> POST /call to VAPI API
        +---> Update Airtable status
```

### Workflow IDs (planned)

| Workflow | Purpose | Trigger |
|----------|---------|---------|
| Post-Call Brain | Process all call outcomes | Webhook from VAW Event Router |
| Smart Callback Cron | Execute scheduled callbacks | Cron every 15 min |

---

## 2. VAPI end-of-call-report Payload Reference

The VAPI webhook sends the following structure (relevant fields):

```json
{
  "message": {
    "type": "end-of-call-report",
    "call": {
      "id": "call_abc123",
      "orgId": "org_xxx",
      "assistantId": "asst_xxx",
      "phoneNumberId": "pn_xxx",
      "customer": {
        "number": "+34612345678"
      },
      "status": "ended",
      "startedAt": "2026-03-26T10:00:00Z",
      "endedAt": "2026-03-26T10:05:30Z",
      "duration": 330,
      "endedReason": "assistant-ended-call",
      "recordingUrl": "https://...",
      "stereoRecordingUrl": "https://...",
      "transcript": "...",
      "summary": "...",
      "structuredData": {
        "resultado": "INTERESADO_AGENDO",
        "nombre_contacto": "Dra. Maria Lopez",
        "nombre_clinica": "Centro Psicologia Bienestar",
        "interes_nivel": "alto",
        "callback_datetime": null,
        "notas": "Agendo demo para jueves 28 a las 11:00",
        "booking_confirmado": true,
        "motivo_no_interes": null
      }
    }
  }
}
```

The `structuredData` comes from the VAPI assistant's `structuredDataSchema` -- Laura extracts this at the end of every call.

---

## 3. Airtable Schema Design

### Table: `Llamadas_PostCall`

| Field Name | Type | Description |
|------------|------|-------------|
| `call_id` | Single line text | VAPI call ID (unique) |
| `phone` | Phone | Lead phone number (+34...) |
| `nombre_contacto` | Single line text | Contact name from conversation |
| `nombre_clinica` | Single line text | Clinic/business name |
| `resultado` | Single select | INTERESADO_AGENDO, INTERESADO_NO_AGENDO, PEDIR_CALLBACK, NO_INTERESADO, GATEKEEPER, NO_DISPONIBLE, ERROR |
| `interes_nivel` | Single select | alto, medio, bajo, nulo |
| `notas` | Long text | Free-form notes from Laura |
| `transcript` | Long text | Full call transcript |
| `summary` | Long text | VAPI auto-summary |
| `recording_url` | URL | Link to call recording |
| `call_duration_sec` | Number | Duration in seconds |
| `call_started_at` | Date/time | ISO timestamp |
| `call_ended_at` | Date/time | ISO timestamp |
| `booking_confirmado` | Checkbox | Whether Cal.com booking was confirmed |
| `callback_datetime` | Date/time | Requested callback time (PEDIR_CALLBACK only) |
| `callback_status` | Single select | pendiente, ejecutado, fallido, cancelado |
| `wa_sent` | Checkbox | Whether WhatsApp was sent (future) |
| `wa_message_id` | Single line text | WA message ID for tracking (future) |
| `dnc` | Checkbox | Do Not Call flag |
| `closer_notified` | Checkbox | Whether closer team was notified |
| `error_details` | Long text | Error info if resultado=ERROR |
| `priority` | Single select | normal, alta, urgente |
| `created_at` | Created time | Auto |
| `last_modified` | Last modified time | Auto |

### Table: `DNC_List` (Do Not Call)

| Field Name | Type | Description |
|------------|------|-------------|
| `phone` | Phone | Phone number (primary key) |
| `reason` | Single select | no_interesado, pidio_baja, duplicado |
| `added_date` | Date/time | When added to DNC |
| `source_call_id` | Single line text | Original call that triggered DNC |

### View: `Callbacks_Pendientes`

Filtered view on `Llamadas_PostCall`:
- `resultado` = PEDIR_CALLBACK
- `callback_status` = pendiente
- `callback_datetime` <= NOW() + 15 minutes
- Sorted by `callback_datetime` ASC

---

## 4. Workflow 1: POST-CALL BRAIN -- Node-by-Node Design

### Node Map

```
[1. Webhook Trigger]
        |
[2. Validate Payload]
        |
[3. Extract Structured Data]
        |
[4. Check Duplicate Call]
        |
   (if duplicate) ---> [4b. Stop - Log Duplicate]
        |
   (if new)
        |
[5. Switch: resultado]
        |
        +---> [6a. INTERESADO_AGENDO branch]
        |         |
        |    [6a1. Verify Booking Exists]
        |         |
        |    (booking OK) ---> [6a2. Register Airtable: agendado]
        |         |                    |
        |         |              [6a3. WA Confirmation] (disabled/skip)
        |         |                    |
        |         |              [6a4. Schedule Reminder -24h]
        |         |                    |
        |         |              [6a5. Schedule Reminder -2h]
        |         |
        |    (booking MISSING) ---> [6a6. Register Airtable: booking_error]
        |                                  |
        |                            [6a7. Telegram Alert: Booking Failed]
        |                                  |
        |                            [6a8. Priority Follow-up Flag]
        |
        +---> [6b. INTERESADO_NO_AGENDO branch]
        |         |
        |    [6b1. Register Airtable: warm lead]
        |         |
        |    [6b2. Notify Closers (Telegram)]
        |         |
        |    [6b3. WA Follow-up 2-5min] (disabled/skip)
        |
        +---> [6c. PEDIR_CALLBACK branch]
        |         |
        |    [6c1. Parse callback_datetime]
        |         |
        |    [6c2. Register Airtable: callback pendiente]
        |         |
        |    [6c3. Telegram: Callback Scheduled]
        |
        +---> [6d. NO_INTERESADO branch]
        |         |
        |    [6d1. Register Airtable: cold]
        |         |
        |    [6d2. Add to DNC List]
        |         |
        |    --- NO WhatsApp ---
        |
        +---> [6e. GATEKEEPER / NO_DISPONIBLE branch]
        |         |
        |    [6e1. Register Airtable: gatekeeper/no_disponible]
        |         |
        |    [6e2. Flag for Manual Review]
        |
        +---> [6f. ERROR / unknown branch]
                  |
             [6f1. Register Airtable: error]
                  |
             [6f2. Telegram Alert to Willy]
                  |
             [6f3. Check if booking tool failed]
                  |
             (if booking error) ---> [6f4. Priority Follow-up]
```

---

### Node Details

#### Node 1: Webhook Trigger

- **Type:** n8n Webhook
- **Method:** POST
- **Path:** `/post-call-brain`
- **Authentication:** Header Auth (shared secret with VAW Event Router)
- **Response mode:** "Respond immediately" (return 200 right away so VAW doesn't timeout)

**Config:**
```json
{
  "httpMethod": "POST",
  "path": "post-call-brain",
  "responseMode": "responseNode",
  "options": {}
}
```

> NOTE: The VAW Event Router workflow (rrMxLnsZTTJHtIHk) must be updated to add an HTTP Request node that forwards `end-of-call-report` events to this webhook URL. Add a branch after the existing Switch node for `message.type === "end-of-call-report"`.

---

#### Node 2: Validate Payload (Code Node)

- **Type:** Code (JavaScript)
- **Purpose:** Validate that the incoming payload has required fields and is an end-of-call-report

```javascript
// Node: Validate Payload
const body = $input.first().json;

// Accept both direct body and nested message format
const message = body.message || body;
const call = message.call;

if (!call) {
  throw new Error('INVALID_PAYLOAD: No call object found in webhook body');
}

if (!call.id) {
  throw new Error('INVALID_PAYLOAD: Missing call.id');
}

if (!call.customer?.number) {
  throw new Error('INVALID_PAYLOAD: Missing customer phone number');
}

const structuredData = call.structuredData || {};

// Normalize resultado -- default to ERROR if missing
const resultado = (structuredData.resultado || 'ERROR').toUpperCase().trim();

// Valid resultado values
const VALID_RESULTS = [
  'INTERESADO_AGENDO',
  'INTERESADO_NO_AGENDO',
  'PEDIR_CALLBACK',
  'NO_INTERESADO',
  'GATEKEEPER',
  'NO_DISPONIBLE',
  'ERROR'
];

const normalizedResultado = VALID_RESULTS.includes(resultado) ? resultado : 'ERROR';

return [{
  json: {
    call_id: call.id,
    phone: call.customer.number,
    assistant_id: call.assistantId || null,
    status: call.status,
    started_at: call.startedAt || null,
    ended_at: call.endedAt || null,
    duration: call.duration || 0,
    ended_reason: call.endedReason || 'unknown',
    recording_url: call.recordingUrl || call.stereoRecordingUrl || null,
    transcript: call.transcript || '',
    summary: call.summary || '',
    resultado: normalizedResultado,
    nombre_contacto: structuredData.nombre_contacto || '',
    nombre_clinica: structuredData.nombre_clinica || '',
    interes_nivel: structuredData.interes_nivel || 'nulo',
    callback_datetime: structuredData.callback_datetime || null,
    notas: structuredData.notas || '',
    booking_confirmado: structuredData.booking_confirmado === true,
    motivo_no_interes: structuredData.motivo_no_interes || '',
    raw_structured_data: JSON.stringify(structuredData)
  }
}];
```

---

#### Node 3: Check Duplicate Call (Airtable Search)

- **Type:** Airtable (Search)
- **Table:** `Llamadas_PostCall`
- **Filter:** `{call_id} = "{{ $json.call_id }}"`
- **Purpose:** VAPI can send duplicate webhooks. Only process each call_id once.

**Followed by IF node:**
- Condition: `{{ $json.length }}` equals 0 (no existing record)
- True path: continue processing
- False path: Respond with 200 + log "duplicate ignored"

---

#### Node 4: Switch on `resultado`

- **Type:** Switch
- **Field:** `{{ $('Validate Payload').item.json.resultado }}`
- **Cases:**

| Output | Value |
|--------|-------|
| 0 | INTERESADO_AGENDO |
| 1 | INTERESADO_NO_AGENDO |
| 2 | PEDIR_CALLBACK |
| 3 | NO_INTERESADO |
| 4 | GATEKEEPER |
| 5 | NO_DISPONIBLE |
| Fallback | (anything else -> ERROR path) |

---

### Branch 6a: INTERESADO_AGENDO

#### Node 6a1: Verify Booking Exists (HTTP Request)

- **Type:** HTTP Request
- **Purpose:** Check Cal.com API to verify the booking was actually created
- **Method:** GET
- **URL:** `https://api.cal.com/v1/bookings?apiKey={{$credentials.calcom_api_key}}`
- **Query params:** Filter by attendee email/phone and date range (last 1 hour)

```
GET https://api.cal.com/v1/bookings
  ?apiKey={CAL_API_KEY}
  &status=accepted
  &afterDate={{ $json.started_at }}
```

> NOTE: The exact Cal.com query depends on how Laura books (by phone or email). If Laura uses a `book_appointment` tool that returns a booking ID, that ID should be in structuredData and can be used directly:
> `GET https://api.cal.com/v1/bookings/{booking_id}?apiKey={CAL_API_KEY}`

**Followed by IF node:**
- Condition: HTTP status 200 AND booking found
- True: booking confirmed path
- False: booking missing path

#### Node 6a2: Register in Airtable (booking confirmed)

- **Type:** Airtable (Create Record)
- **Table:** `Llamadas_PostCall`

```json
{
  "call_id": "={{ $('Validate Payload').item.json.call_id }}",
  "phone": "={{ $('Validate Payload').item.json.phone }}",
  "nombre_contacto": "={{ $('Validate Payload').item.json.nombre_contacto }}",
  "nombre_clinica": "={{ $('Validate Payload').item.json.nombre_clinica }}",
  "resultado": "INTERESADO_AGENDO",
  "interes_nivel": "alto",
  "notas": "={{ $('Validate Payload').item.json.notas }}",
  "transcript": "={{ $('Validate Payload').item.json.transcript }}",
  "summary": "={{ $('Validate Payload').item.json.summary }}",
  "recording_url": "={{ $('Validate Payload').item.json.recording_url }}",
  "call_duration_sec": "={{ $('Validate Payload').item.json.duration }}",
  "call_started_at": "={{ $('Validate Payload').item.json.started_at }}",
  "call_ended_at": "={{ $('Validate Payload').item.json.ended_at }}",
  "booking_confirmado": true,
  "priority": "normal"
}
```

#### Node 6a3: WA Confirmation (DISABLED -- future)

- **Type:** IF (gate node)
- **Condition:** `{{ $vars.WA_ENABLED }}` equals `true`
- **Currently:** Variable `WA_ENABLED` = `false` -- skips this node
- **When ready:** Sends WhatsApp confirmation message via WA Business API

```
[PLACEHOLDER - DISABLED]
When WA is ready, this node will:
1. Send template message: "Hola {nombre}, confirmamos tu cita de demo con Calla
   el {fecha} a las {hora}. Si necesitas cambiar, responde a este mensaje."
2. Use WA Business API HTTP Request
3. Store wa_message_id in Airtable
```

#### Node 6a4: Schedule Reminder -24h (Code + Wait)

- **Type:** Code node that calculates reminder times, followed by n8n "Wait" node or a separate workflow trigger

**Strategy:** Rather than using Wait nodes (which don't survive n8n restarts), write reminder records to Airtable and let a Reminder Cron workflow pick them up.

```javascript
// Node: Calculate Reminder Times
const data = $input.first().json;
const notas = data.notas || '';

// Try to extract booking datetime from notes or structuredData
// This is best-effort -- the Cal.com API verification should have the actual time
const bookingTime = data.booking_datetime || null;

if (!bookingTime) {
  // If we can't determine booking time, skip reminders
  return [{ json: { ...data, reminders_scheduled: false, reason: 'no_booking_time' } }];
}

const bookingDate = new Date(bookingTime);
const reminder24h = new Date(bookingDate.getTime() - 24 * 60 * 60 * 1000);
const reminder2h = new Date(bookingDate.getTime() - 2 * 60 * 60 * 1000);
const now = new Date();

return [{
  json: {
    ...data,
    reminders_scheduled: true,
    booking_datetime: bookingTime,
    reminder_24h: reminder24h > now ? reminder24h.toISOString() : null,
    reminder_2h: reminder2h > now ? reminder2h.toISOString() : null
  }
}];
```

> Reminders are written to a `Reminders` Airtable table (see Section 7) and processed by the Reminder Cron.

#### Node 6a6: Booking Missing -- Register with Error Flag

- **Type:** Airtable (Create Record)
- **Same as 6a2 but with:**
  - `booking_confirmado`: false
  - `priority`: "urgente"
  - `error_details`: "Booking not found in Cal.com after INTERESADO_AGENDO resultado"

#### Node 6a7: Telegram Alert -- Booking Failed

- **Type:** Telegram (Send Message)
- **Chat ID:** `{{ $vars.WILLY_TELEGRAM_CHAT_ID }}`
- **Parse mode:** HTML

```
<b>ALERTA: Booking NO encontrado</b>

Lead: {{ $json.nombre_contacto }} ({{ $json.nombre_clinica }})
Tel: {{ $json.phone }}
Call ID: {{ $json.call_id }}

Laura registra INTERESADO_AGENDO pero no se encontro la cita en Cal.com.
Notas: {{ $json.notas }}

<b>Accion requerida: seguimiento manual prioritario</b>
```

---

### Branch 6b: INTERESADO_NO_AGENDO

#### Node 6b1: Register in Airtable (warm lead)

- **Type:** Airtable (Create Record)
- **Table:** `Llamadas_PostCall`
- **Key fields:**
  - `resultado`: "INTERESADO_NO_AGENDO"
  - `interes_nivel`: from structuredData (alto/medio)
  - `priority`: "alta"

#### Node 6b2: Notify Closers (Telegram)

- **Type:** Telegram (Send Message)
- **Chat ID:** `{{ $vars.CLOSERS_TELEGRAM_GROUP_ID }}`
- **Parse mode:** HTML

```
<b>LEAD CALIENTE -- Sin agendar</b>

Contacto: {{ $json.nombre_contacto }}
Clinica: {{ $json.nombre_clinica }}
Tel: {{ $json.phone }}
Interes: {{ $json.interes_nivel }}

Resumen: {{ $json.summary }}
Notas Laura: {{ $json.notas }}

<i>Seguimiento recomendado en las proximas 2 horas</i>
```

#### Node 6b3: WA Follow-up (DISABLED -- future)

```
[PLACEHOLDER - DISABLED]
When WA is ready:
1. Wait 2-5 min (randomized to feel natural)
2. Send WA: "Hola {nombre}, soy Laura de Calla. Fue un gusto hablar contigo.
   Te dejo aqui el enlace para agendar tu demo cuando te venga bien: {cal_link}"
3. Uses anti-spam guard (see Section 8)
```

---

### Branch 6c: PEDIR_CALLBACK

#### Node 6c1: Parse Callback DateTime (Code Node)

```javascript
// Node: Parse Callback DateTime
const data = $input.first().json;
let callbackDt = data.callback_datetime;

if (!callbackDt) {
  // If Laura didn't extract a specific time, default to tomorrow same hour
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setMinutes(0, 0, 0);
  callbackDt = tomorrow.toISOString();
}

// Validate the datetime is in the future
const callbackDate = new Date(callbackDt);
const now = new Date();

if (callbackDate <= now) {
  // If in the past, push to next business day at 10:00 Madrid time
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  // Skip weekends
  while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
    nextDay.setDate(nextDay.getDate() + 1);
  }
  nextDay.setHours(10, 0, 0, 0);
  callbackDt = nextDay.toISOString();
}

// Ensure callback is within business hours (9:00-20:00 Madrid)
const hours = new Date(callbackDt).getHours();
if (hours < 9) {
  const adjusted = new Date(callbackDt);
  adjusted.setHours(9, 30, 0, 0);
  callbackDt = adjusted.toISOString();
} else if (hours >= 20) {
  // Push to next day at 10:00
  const adjusted = new Date(callbackDt);
  adjusted.setDate(adjusted.getDate() + 1);
  adjusted.setHours(10, 0, 0, 0);
  callbackDt = adjusted.toISOString();
}

return [{
  json: {
    ...data,
    callback_datetime: callbackDt,
    callback_status: 'pendiente'
  }
}];
```

#### Node 6c2: Register in Airtable (callback)

- **Type:** Airtable (Create Record)
- **Table:** `Llamadas_PostCall`
- **Key fields:**
  - `resultado`: "PEDIR_CALLBACK"
  - `callback_datetime`: parsed value
  - `callback_status`: "pendiente"
  - `priority`: "alta"

#### Node 6c3: Telegram Notification

```
<b>Callback programado</b>

Contacto: {{ $json.nombre_contacto }} ({{ $json.nombre_clinica }})
Tel: {{ $json.phone }}
Callback: {{ $json.callback_datetime }}

El sistema llamara automaticamente a la hora indicada.
```

---

### Branch 6d: NO_INTERESADO

#### Node 6d1: Register in Airtable (cold)

- **Type:** Airtable (Create Record)
- **Key fields:**
  - `resultado`: "NO_INTERESADO"
  - `interes_nivel`: "nulo"
  - `dnc`: true
  - `priority`: "normal"
  - `notas`: includes `motivo_no_interes`

#### Node 6d2: Add to DNC List

- **Type:** Airtable (Create Record)
- **Table:** `DNC_List`

```json
{
  "phone": "={{ $json.phone }}",
  "reason": "no_interesado",
  "added_date": "={{ $now.toISO() }}",
  "source_call_id": "={{ $json.call_id }}"
}
```

> **IMPORTANT:** NO WhatsApp is sent to NO_INTERESADO leads. Ever.

---

### Branch 6e: GATEKEEPER / NO_DISPONIBLE

#### Node 6e1: Register in Airtable

- **Type:** Airtable (Create Record)
- **Key fields:**
  - `resultado`: "GATEKEEPER" or "NO_DISPONIBLE"
  - `priority`: "normal"
  - Flagged for manual review

#### Node 6e2: Flag for Manual Review (Telegram)

```
<b>Revision manual necesaria</b>

Resultado: {{ $json.resultado }}
Tel: {{ $json.phone }}
Contacto: {{ $json.nombre_contacto }}
Clinica: {{ $json.nombre_clinica }}

Resumen: {{ $json.summary }}

<i>Decidir manualmente si reintentar o descartar</i>
```

---

### Branch 6f: ERROR / Unknown

#### Node 6f1: Register in Airtable

- **Type:** Airtable (Create Record)
- **Key fields:**
  - `resultado`: "ERROR"
  - `priority`: "urgente"
  - `error_details`: Full raw payload for debugging

#### Node 6f2: Telegram Alert to Willy

- **Type:** Telegram (Send Message)
- **Chat ID:** `{{ $vars.WILLY_TELEGRAM_CHAT_ID }}`

```
<b>ERROR en llamada</b>

Call ID: {{ $json.call_id }}
Tel: {{ $json.phone }}
Ended Reason: {{ $json.ended_reason }}
Duration: {{ $json.duration }}s

Error: {{ $json.error_details || 'resultado no reconocido o ausente' }}

Raw structuredData:
{{ $json.raw_structured_data }}
```

#### Node 6f3: Check Booking Tool Failure (Code Node)

```javascript
// Node: Detect Booking Tool Failure
const data = $input.first().json;
const transcript = (data.transcript || '').toLowerCase();
const notas = (data.notas || '').toLowerCase();
const endedReason = data.ended_reason || '';

// Heuristics to detect booking tool failure
const bookingAttempted =
  transcript.includes('agendar') ||
  transcript.includes('reservar') ||
  transcript.includes('cita') ||
  notas.includes('agend') ||
  notas.includes('booking');

const toolFailure =
  endedReason.includes('error') ||
  endedReason.includes('pipeline-error') ||
  transcript.includes('error') ||
  transcript.includes('problema tecnico');

const isBookingError = bookingAttempted && toolFailure;

return [{
  json: {
    ...data,
    is_booking_error: isBookingError,
    priority: isBookingError ? 'urgente' : data.priority
  }
}];
```

**IF `is_booking_error` === true:**

#### Node 6f4: Priority Follow-up

- Update Airtable record: `priority` = "urgente"
- Send Telegram:

```
<b>URGENTE: Fallo de herramienta de booking</b>

El lead QUERIA agendar pero la herramienta fallo.
Contacto: {{ $json.nombre_contacto }} ({{ $json.nombre_clinica }})
Tel: {{ $json.phone }}

Accion: Llamar manualmente o programar callback inmediato.
```

---

## 5. Workflow 2: SMART CALLBACK CRON

### Node Map

```
[1. Cron Trigger: every 15 min]
        |
[2. Query Airtable: callbacks due in next 15 min]
        |
[3. IF: any results?]
        |
   (no results) ---> [Stop]
        |
   (has results)
        |
[4. Loop: for each callback]
        |
[5. POST to VAPI /call]
        |
[6. IF: call created successfully?]
        |
   (success) ---> [7a. Update Airtable: ejecutado]
        |
   (failure) ---> [7b. Update Airtable: fallido]
                        |
                  [8. Telegram: callback failed]
```

### Node Details

#### Node 1: Cron Trigger

- **Type:** Schedule Trigger
- **Interval:** Every 15 minutes
- **Timezone:** Europe/Madrid

```json
{
  "rule": {
    "interval": [{ "field": "minutes", "minutesInterval": 15 }]
  }
}
```

#### Node 2: Query Airtable for Due Callbacks

- **Type:** Airtable (List Records)
- **Table:** `Llamadas_PostCall`
- **View:** `Callbacks_Pendientes`
- **Filter formula:**

```
AND(
  {resultado} = 'PEDIR_CALLBACK',
  {callback_status} = 'pendiente',
  IS_BEFORE({callback_datetime}, DATEADD(NOW(), 15, 'minutes')),
  IS_AFTER({callback_datetime}, DATEADD(NOW(), -5, 'minutes'))
)
```

> The -5 minute buffer catches callbacks that were slightly overdue from the last cron run.

#### Node 3: IF -- Any Callbacks Due?

- **Condition:** `{{ $json.length > 0 }}`

#### Node 4: Loop Over Each Callback

- **Type:** SplitInBatches
- **Batch Size:** 1 (process one at a time to avoid rate limits)

#### Node 5: POST to VAPI /call

- **Type:** HTTP Request
- **Method:** POST
- **URL:** `https://api.vapi.ai/call/phone`
- **Headers:**
  - `Authorization: Bearer {{ $credentials.vapi_api_key }}`
  - `Content-Type: application/json`

```json
{
  "assistantId": "{{ $vars.LAURA_ASSISTANT_ID }}",
  "customer": {
    "number": "={{ $json.phone }}",
    "name": "={{ $json.nombre_contacto }}"
  },
  "phoneNumberId": "{{ $vars.VAPI_PHONE_NUMBER_ID }}",
  "assistantOverrides": {
    "firstMessage": "Hola {{ $json.nombre_contacto }}, soy Laura de Calla. Me pediste que te llamara a esta hora. Tienes un momento para hablar sobre como podemos ayudar a {{ $json.nombre_clinica }} con la gestion de llamadas?",
    "metadata": {
      "is_callback": true,
      "original_call_id": "={{ $json.call_id }}",
      "callback_attempt": 1,
      "lead_context": {
        "nombre_clinica": "={{ $json.nombre_clinica }}",
        "previous_interest": "={{ $json.interes_nivel }}",
        "previous_notes": "={{ $json.notas }}"
      }
    }
  }
}
```

> **NOTE:** The `assistantOverrides.firstMessage` makes the callback feel personal -- Laura references that the lead asked to be called back. The `metadata` passes context so Laura knows this is a callback and has the lead's history.

#### Node 6: IF -- Call Created?

- **Condition:** HTTP status 201 AND response has `id` field

#### Node 7a: Update Airtable -- Callback Executed

- **Type:** Airtable (Update Record)
- **Table:** `Llamadas_PostCall`
- **Record ID:** from the queried record
- **Fields:**
  - `callback_status`: "ejecutado"

#### Node 7b: Update Airtable -- Callback Failed

- **Type:** Airtable (Update Record)
- **Fields:**
  - `callback_status`: "fallido"
  - `error_details`: HTTP error message

#### Node 8: Telegram -- Callback Failed

```
<b>Callback fallido</b>

Lead: {{ $json.nombre_contacto }} ({{ $json.phone }})
Hora programada: {{ $json.callback_datetime }}
Error: {{ $json.error_details }}

Accion manual necesaria.
```

---

## 6. Connection Map (both workflows)

### Workflow 1: Post-Call Brain

```
Webhook Trigger
    --> Validate Payload
        --> Check Duplicate (Airtable Search)
            --> IF Not Duplicate
                --> Switch (resultado)
                    --> [output 0] INTERESADO_AGENDO
                        --> Verify Booking (HTTP)
                            --> IF Booking Found
                                --> [true] Register Airtable (confirmed)
                                    --> WA Gate (IF WA_ENABLED)
                                        --> [true] Send WA Confirmation
                                        --> [false] NoOp
                                    --> Calculate Reminders (Code)
                                        --> Write Reminders to Airtable
                                --> [false] Register Airtable (booking error)
                                    --> Telegram: Booking Failed
                    --> [output 1] INTERESADO_NO_AGENDO
                        --> Register Airtable (warm)
                            --> Notify Closers (Telegram)
                            --> WA Gate (IF WA_ENABLED)
                                --> [true] Wait 2-5min + Send WA
                                --> [false] NoOp
                    --> [output 2] PEDIR_CALLBACK
                        --> Parse Callback DateTime (Code)
                            --> Register Airtable (callback)
                                --> Telegram: Callback Scheduled
                    --> [output 3] NO_INTERESADO
                        --> Register Airtable (cold)
                            --> Add to DNC (Airtable)
                    --> [output 4] GATEKEEPER
                        --> Register Airtable (gatekeeper)
                            --> Telegram: Manual Review
                    --> [output 5] NO_DISPONIBLE
                        --> Register Airtable (no disponible)
                            --> Telegram: Manual Review
                    --> [fallback] ERROR
                        --> Register Airtable (error)
                            --> Telegram: Error Alert
                            --> Detect Booking Error (Code)
                                --> IF is_booking_error
                                    --> [true] Update Priority + Telegram Urgente
                                    --> [false] NoOp
```

### Workflow 2: Smart Callback Cron

```
Schedule Trigger (every 15 min)
    --> Airtable: List Callbacks Due
        --> IF Has Results
            --> [true] SplitInBatches
                --> HTTP: POST VAPI /call
                    --> IF Call Created
                        --> [true] Update Airtable: ejecutado
                        --> [false] Update Airtable: fallido
                            --> Telegram: Callback Failed
            --> [false] NoOp (stop)
```

---

## 7. Reminder System (Airtable + Cron)

### Airtable Table: `Recordatorios`

| Field | Type | Description |
|-------|------|-------------|
| `record_id` | Auto | Primary |
| `call_id` | Single line text | Reference to Llamadas_PostCall |
| `phone` | Phone | Lead phone |
| `nombre_contacto` | Single line text | |
| `nombre_clinica` | Single line text | |
| `reminder_type` | Single select | 24h_before, 2h_before, 1h_after_noshow |
| `trigger_at` | Date/time | When to fire |
| `status` | Single select | pendiente, enviado, cancelado |
| `channel` | Single select | telegram, whatsapp, both |
| `booking_datetime` | Date/time | The appointment time |

### Reminder Cron Workflow (third workflow, simple)

```
Schedule Trigger (every 15 min)
    --> Airtable: List Recordatorios WHERE status=pendiente AND trigger_at <= NOW()+15min
        --> IF Has Results
            --> SplitInBatches
                --> Switch (channel)
                    --> telegram: Send Telegram to closers group
                    --> whatsapp: [DISABLED until WA ready]
                    --> both: Send both
                --> Update Airtable: status = enviado
```

---

## 8. Anti-Spam Guard for WhatsApp (future implementation)

This section is for when WhatsApp Business API is connected. The guard prevents duplicate message processing and ensures rate limiting.

### Implementation: Code Node at WhatsApp Webhook Entry

Place this as the FIRST node after any WhatsApp incoming webhook.

```javascript
// Node: WA Anti-Spam Guard
// Place at the entry of any workflow that receives WhatsApp webhooks

const body = $input.first().json;

// ------------------------------------------------------------------
// FILTER 1: Only process actual messages, ignore status updates
// ------------------------------------------------------------------
// WhatsApp Cloud API sends both "messages" and "statuses" (delivered, read, etc.)
const changes = body?.entry?.[0]?.changes?.[0]?.value;

if (!changes?.messages || changes.messages.length === 0) {
  // This is a status update (delivered, read, sent) -- IGNORE
  return [];  // Empty array = stop execution
}

const message = changes.messages[0];
const phone = message.from;  // sender phone
const msgId = message.id;    // unique WA message ID
const timestamp = parseInt(message.timestamp) * 1000;

// ------------------------------------------------------------------
// FILTER 2: Duplicate message detection (msgId + phone)
// ------------------------------------------------------------------
// WhatsApp sometimes sends the same webhook multiple times
const staticData = $getWorkflowStaticData('global');

if (!staticData.processedMessages) {
  staticData.processedMessages = {};
}

const dedupeKey = `${phone}_${msgId}`;

if (staticData.processedMessages[dedupeKey]) {
  // Already processed this exact message -- IGNORE
  return [];
}

// Store with timestamp for cleanup
staticData.processedMessages[dedupeKey] = Date.now();

// Cleanup: remove entries older than 1 hour to prevent memory bloat
const ONE_HOUR = 60 * 60 * 1000;
for (const key of Object.keys(staticData.processedMessages)) {
  if (Date.now() - staticData.processedMessages[key] > ONE_HOUR) {
    delete staticData.processedMessages[key];
  }
}

// ------------------------------------------------------------------
// FILTER 3: Cooldown per phone number (30 seconds)
// ------------------------------------------------------------------
if (!staticData.lastMessageTime) {
  staticData.lastMessageTime = {};
}

const lastTime = staticData.lastMessageTime[phone] || 0;
const elapsed = Date.now() - lastTime;
const COOLDOWN_MS = 30 * 1000;  // 30 seconds

if (elapsed < COOLDOWN_MS) {
  // This phone sent a message too recently -- IGNORE
  // (prevents rapid-fire messages from overwhelming the system)
  return [];
}

// Update last message time
staticData.lastMessageTime[phone] = Date.now();

// Cleanup old cooldown entries (older than 10 minutes)
const TEN_MIN = 10 * 60 * 1000;
for (const key of Object.keys(staticData.lastMessageTime)) {
  if (Date.now() - staticData.lastMessageTime[key] > TEN_MIN) {
    delete staticData.lastMessageTime[key];
  }
}

// ------------------------------------------------------------------
// PASSED ALL FILTERS -- forward message for processing
// ------------------------------------------------------------------
return [{
  json: {
    phone: phone,
    msgId: msgId,
    timestamp: timestamp,
    type: message.type,          // text, image, audio, etc.
    text: message.text?.body || '',
    raw: message
  }
}];
```

### Anti-Spam Guard Summary

| Guard | Mechanism | Storage | TTL |
|-------|-----------|---------|-----|
| Status filter | Check `changes.messages` exists | None | N/A |
| Duplicate msgId | `staticData.processedMessages[phone_msgId]` | Workflow staticData | 1 hour cleanup |
| Cooldown 30s | `staticData.lastMessageTime[phone]` | Workflow staticData | 10 min cleanup |

> **IMPORTANT:** `staticData` is persisted in n8n's database between executions but is lost if the workflow is deactivated/reactivated. This is acceptable for a cooldown/dedup cache.

---

## 9. n8n Environment Variables Required

Set these in n8n Settings > Variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `WA_ENABLED` | `false` | Gate for WhatsApp nodes (flip to `true` when ready) |
| `WILLY_TELEGRAM_CHAT_ID` | (your chat ID) | Telegram alerts for errors |
| `CLOSERS_TELEGRAM_GROUP_ID` | (group chat ID) | Notifications for closer team |
| `LAURA_ASSISTANT_ID` | (VAPI assistant ID) | For callback VAPI calls |
| `VAPI_PHONE_NUMBER_ID` | (VAPI phone ID) | Outbound number for callbacks |
| `CAL_COM_EVENT_TYPE` | (Cal.com event type slug) | For booking verification |

### n8n Credentials Required

| Credential | Type | Purpose |
|------------|------|---------|
| Airtable API | Airtable Personal Access Token | Read/write Llamadas_PostCall, DNC_List, Recordatorios |
| VAPI API Key | HTTP Header Auth | POST /call for callbacks |
| Cal.com API Key | HTTP Header Auth | GET /bookings for verification |
| Telegram Bot | Telegram Bot API | Send alerts and notifications |
| WhatsApp Business | HTTP Header Auth | (future) Send WA messages |

---

## 10. VAW Event Router Modification Required

The existing VAW Event Router (workflow `rrMxLnsZTTJHtIHk`) needs one addition:

**Add to the existing Switch node (that routes by `message.type`):**

New output case: `message.type === "end-of-call-report"`

Connect to a new **HTTP Request** node:
- **Method:** POST
- **URL:** `https://callao.app/webhook/post-call-brain`
- **Body:** Forward the entire webhook payload as-is
- **Headers:** `X-Webhook-Secret: {{ $vars.POST_CALL_WEBHOOK_SECRET }}`

This keeps the Event Router as a thin router and delegates all post-call logic to the dedicated Post-Call Brain workflow.

---

## 11. Error Handling Strategy

### Per-node error handling:

Every critical node (Airtable writes, HTTP requests, Telegram sends) should have:

1. **Continue on Fail:** enabled on non-critical nodes (Telegram notifications)
2. **Error Workflow:** Set the global error workflow to send a Telegram message to Willy

### Global Error Workflow (set in workflow settings):

```
Error Trigger
    --> Code: Format Error
    --> Telegram: Send to Willy

Message format:
"WORKFLOW ERROR in Post-Call Brain
Node: {{ $json.execution.error.node }}
Message: {{ $json.execution.error.message }}
Execution: {{ $json.execution.id }}"
```

### Retry strategy for VAPI callback calls:

If the VAPI POST /call fails in the Smart Callback Cron:
1. Mark as `fallido` in Airtable
2. Alert via Telegram
3. The next cron run (15 min later) will NOT retry automatically (status is no longer `pendiente`)
4. Manual intervention required -- or add a separate "retry failed callbacks" button/workflow later

---

## 12. Testing Checklist

Before activating in production:

- [ ] Send test webhook with each `resultado` value and verify correct routing
- [ ] Verify Airtable records are created with all fields populated
- [ ] Test duplicate call_id rejection
- [ ] Test callback scheduling with past datetime (should auto-correct)
- [ ] Test callback scheduling with weekend datetime (should skip to Monday)
- [ ] Test Smart Callback Cron fires VAPI call correctly
- [ ] Verify Telegram messages arrive in correct chats
- [ ] Test ERROR path with missing structuredData
- [ ] Test booking verification with valid and invalid booking IDs
- [ ] Simulate WA_ENABLED=false and confirm WA nodes are skipped
- [ ] Test anti-spam guard with rapid duplicate webhooks
- [ ] Verify DNC list population for NO_INTERESADO
- [ ] Load test: send 10 webhooks in rapid succession

---

## 13. Future Enhancements (not in this design)

1. **WhatsApp activation:** Flip `WA_ENABLED` to `true`, configure WA Business API credentials, test templates
2. **No-show detection:** After booking time passes, check Cal.com for attendance, trigger follow-up
3. **Callback retry logic:** Auto-retry failed callbacks up to 3 times with exponential backoff
4. **Analytics dashboard:** Airtable views or Metabase connected to Airtable for conversion metrics
5. **Lead scoring update:** Feed call outcomes back to the lead scoring model in PB_Leads_INTELLIGENCE
6. **VAW integration:** When a lead has resultado != NO_INTERESADO, update VAW to stop calling that number from the campaign
