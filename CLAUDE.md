# CALLA — Instrucciones permanentes para Claude Code
## Credenciales y contexto completo en SESSION_STATE.md y en el prompt de cada sesión
## Reglas globales
- NUNCA exponer VAPI, VAW, n8n, Zadarma, Airtable en materiales client-facing
- Excluir equipo: +34671544780, +34653177837, +34651524434
- CSV: CERO celdas vacías, fallback first_name = "el equipo"
- Meta WhatsApp: SOLO plantillas UTILITY, NUNCA MARKETING
- n8n Code nodes: SIEMPRE this.helpers.httpRequest(), NUNCA require('https')
- Después de PUT a webhook workflow: docker restart n8n + reactivar
- Limpiar datos de test después de CADA test
- SMS: one-way, terminar con "No respondas a este SMS"

## Sesión Guille v5 — 2026-04-25

### Cambios aplicados
- **Schema v3** en 3 asistentes VAPI: +4 campos (producto_interes, motivo_no_cualifica_psyco, pivot_intentado, pivot_resultado) en todos, +1 campo (lead_dijo_si_a_huecos) solo en Inbound
- **FASE 6.5 PIVOT** insertada en PB Out (77043229) y PB Out Fijos (f500d630): reveal IA + propuesta asistente de voz cuando lead no cualifica para PB
- **PB Inbound (a8e97599) reescrito completo**: firstMessage="Sí, ¿quién es? Soy Guille.", prompt v5 con palanca de cierre (lead_dijo_si_a_huecos), pivot integrado
- **Event Router (7eGv7dSEgwaZvkwm)**: Classify con routing por producto/pivot, tags dinámicos, Add Note con campos v3
- **Bugs pre-existentes corregidos**: Add Note + Is Callback? referenciaban $json (output de Move Opportunity) en vez de $('Merge').first().json; customerNumber extraction no leía message.customer

### Backups
- `backup_77043229.json`, `backup_f500d630.json`, `backup_a8e97599.json`, `backup_event_router.json`

### IDs relevantes
- PB Out: `77043229-6055-4028-b4d1-f7fba9c751e9`
- PB Out Fijos: `f500d630-2525-468f-b8a6-467a58a70ee2`
- PB Inbound: `a8e97599-1df2-4afa-b2ce-9f12dc47a025`
- Event Router: `7eGv7dSEgwaZvkwm`
- Pipeline: `cIadISWJSmLxRzXAaDrT`

### Tests E2E: 5/5 PASS (contacts limpiados)

## Sesión Retro-fill — 2026-04-25

### Diagnóstico (FASE A)
- 0 appointmentBooked=true en 200 llamadas VAPI → causa comercial, no bug
- 42 cold SIP failures (21%), 47 calls con structuredData, 0 cierres
- H2/H3 no aplicaban

### Retro-process (FASE B)
- 1366 oportunidades en pipeline, 48 con match VAPI, 48 notas internas creadas
- 0 duplicados, 0 errores
- Leads más prometedores: Susana (Repesca, interesado_sin_cita), Jaime (New Lead, interesado_sin_cita)
- Report: `RETROPROCESS_REPORT.md`

## Sesión Duration Fix — 2026-04-25

### Bug
- Classify node leía `call.duration || message.duration` → ambos MISSING en VAPI payload → siempre 0s
- Campo correcto: `message.durationSeconds` (float, nativo VAPI)

### Fix
- Classify: cascada `message.durationSeconds` → timestamp calc → 0
- Test E2E: 47s ✅
- 48 notas retro-procesadas corregidas (0s → duración real)
- Report: `DEPLOY_REPORT_DURATION_FIX.md`

### Auditoría producción (FASE 5)
- 1366 contactos escaneados, 48 notas IA encontradas, **todas retro-fill, 0 de producción**
- Confirmado: no hay notas de producción con "Duración: 0s" — el Add Note estaba roto hasta el fix v5, y entre v5 y el duration fix no hubo ejecuciones reales

## Sesión Teamsale Upload — 2026-04-27

### API
- Endpoint: `api.zadarma.com/v1/zcrm/` (NOT teamsale.es/io)
- Auth: HMAC-SHA1 (Zadarma standard), lib local `user-api-py-v1/`
- Key: `212d57bcd79758650f71`, Secret: `dd776a8c73f1decd2240`
- Fields nested bajo `lead` key; phones dentro de `lead.phones[]`
- **PUT sin phones en body BORRA los phones existentes** — siempre incluir

### Upload
- 1000 leads del CSV `TEAMSALE_ANTHONY_TOP1000_FINAL_clean.csv`
- 995 ya existían (import previo Magdalena) → actualizados via identify→PUT
- 5 nuevos creados + 2 recreados (emojis en nombre)
- Todos asignados a "Willy Pruebas" (283581) con label "Campaña Tests Willy" (349348)
- Report: `DEPLOY_REPORT_TEAMSALE_UPLOAD.md`
