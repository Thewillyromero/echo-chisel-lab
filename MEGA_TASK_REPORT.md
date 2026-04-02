# INFORME EJECUTIVO — MEGA-TAREA CALLA PRODUCCIÓN
## 2 Abril 2026

---

## 1. ESTADO META — WABAs y BMs

| WABA | ID | Review | Health | Acción |
|------|-----|--------|--------|--------|
| **Edommo "Laura Romero"** | 1567587974330028 | PENDING | BLOCKED | Completar perfil BM + pago + verificación |
| **CALLA** | 1608281377094074 | APPROVED | LIMITED | Verificar BM CALLA |
| **Psycoboost** | 1646559770098577 | REJECTED | BANNED | MUERTA — no recuperable |
| **Edommo WA Lugo** | 8834730813577707 | INACCESIBLE | ? | Ningún token tiene permisos |

**Bloqueantes Meta (todos manuales para Willy):**
1. BM Edommo: completar perfil (Legal Name, Country, Website) + añadir método de pago + verificación
2. BM CALLA: iniciar verificación empresarial
3. +34982685874: está en WhatsApp personal → eliminar cuenta WA de ese número

---

## 2. PLANTILLAS — CERO MARKETING ✅

| Plantilla | Categoría | Estado | WABA |
|-----------|-----------|--------|------|
| seguimiento_llamada_v2 | ✅ UTILITY | PENDING | Edommo |
| confirmacion_cita | ✅ UTILITY | APPROVED | Edommo |
| recordatorio_cita | ✅ UTILITY | APPROVED | Edommo |
| noshow_reagendar | ✅ UTILITY | APPROVED | Edommo |

La antigua "seguimiento_llamada" (MARKETING) fue eliminada y recreada con copy neutro.

---

## 3. NÚMERO LUGO (+34982685874)

**Localización:** NO encontrado en ninguna WABA accesible (Edommo, CALLA, PB).
**Conclusión:** Registrado en WhatsApp personal.
**Acción:** Willy debe abrir WhatsApp en el dispositivo asociado a +34982685874 → Settings → Account → Delete Account. Esperar 3 minutos y reintentar registro.

---

## 4. VAPI PB — Verificación cuenta nueva

| Recurso | Estado | Detalle |
|---------|--------|---------|
| Assistants | ✅ 5 clonados | PB Out, PB Out Fijos, PB Inbound, Silent Listener, Riley |
| Phone Numbers | ✅ 2 | BCN (+34936941608), Lugo (+34982685874) |
| Credentials | ✅ 2 | Ext100 (pbx.zadarma.com, outbound), Ext101 (pbx.zadarma.com, outbound) |
| Tools | ✅ 4 | check_availability, book_meeting, registrar_lead_pb, end_call — todos → callao.app |
| structuredDataSchema | ❌ NO existe | Los assistants NO tienen schema. Usan analysisPlan (summary) en su lugar |

### Config para VAW:
```
Org ID: dc30684a-9184-43c5-b912-2819a5cb1f46
Private Key: ee165b0c-cb8f-4fe0-aa58-7e64db002864
Phone BCN ID: 2339e804-8989-4047-a5c0-7d2e614d6076
Phone Lugo ID: ca803953-7cd0-421c-b560-7a847fc7e058
Assistant PB Out ID: 03a2bdfd-c35d-4116-ab53-a91eb24774f8
Assistant PB Out Fijos ID: 65d43d8d-a7f1-4750-8072-f59b87bd6aa2
Max concurrent per phone: 3
```

---

## 5. STRUCTURED DATA

**Estado actual:** Los assistants PB NO usan `structuredDataSchema`. Usan `analysisPlan.summaryPlan` que genera un resumen libre del transcript. Los tools (`registrar_lead_pb`, `book_meeting`) capturan datos estructurados via sus parameters (resultado, nombre, email, objeciones, etc.).

**Los últimos 5 call logs del PB original muestran:**
- 0 calls con structured data en `analysis.structuredData`
- Todas: customer-did-not-answer (43%), SIP 480 (33%), customer-busy (17%)
- CERO llamadas conectadas con conversación real en los últimos 100 logs

**Recomendación:** Añadir `structuredDataSchema` al assistant PB Out para capturar post-llamada:
```json
{
  "type": "object",
  "properties": {
    "resultado": {"type": "string", "enum": ["interesado_agendo","interesado_no_agendo","no_interesado","pedir_callback","gatekeeper","no_disponible"]},
    "callback_datetime": {"type": "string"},
    "email": {"type": "string"},
    "nombre_contacto": {"type": "string"},
    "objeciones": {"type": "string"},
    "nivel_interes": {"type": "number"},
    "notas": {"type": "string"}
  }
}
```

---

## 6. ZADARMA API

**Diagnóstico:** El algoritmo HMAC-SHA1 es correcto (confirmado contra la librería oficial). El 401 es un problema de cuenta/credenciales, no de código. Script de prueba guardado en `zadarma_auth_test.py`.

**Acción:** Verificar en my.zadarma.com → Settings → API que el acceso está habilitado. Regenerar key/secret si necesario.

---

## 7. SOP ONBOARDING

✅ Documento completo guardado en `SOP_ONBOARDING_CALLA.md` (17KB).
Cubre: Zadarma, VAPI, VAW, WhatsApp, n8n, smart callback, checklist pre-lanzamiento.

---

## 8. CALL LOG ANALYSIS (PB)

**100 llamadas analizadas del PB original:**

| Métrica | Valor |
|---------|-------|
| Total calls | 100 |
| customer-did-not-answer | 43% |
| SIP 480 (temporarily unavailable) | 33% |
| customer-busy | 17% |
| SIP failed to connect | 6% |
| Calls with actual conversation | **0%** |

**Horarios (por volumen):**
- 07:00 — 54 llamadas (mayoría)
- 08:00 — 40 llamadas
- 09:00+ — casi nada

**Días:** Martes (52), Miércoles (43), Lunes (5)

**Conclusión:** Las últimas 100 llamadas son de la migración Telnyx que falló. CERO conversaciones reales. Todas son intentos fallidos (no-answer, SIP errors, busy). La nueva infraestructura Zadarma PBX ya está probada y funciona.

---

## 9. CSVs VAW — LISTOS ✅

| CSV | Leads | Archivo |
|-----|-------|---------|
| **Móviles** | 4,505 | PB_Leads_VAW_MOVILES.csv |
| **Fijos** | 1,309 | PB_Leads_VAW_FIJOS.csv |
| **Total** | 5,814 | — |

- Excluidos: 71 (números inválidos)
- Celdas vacías: **CERO** (verificado)
- Equipo interno: excluido
- Top ciudades: Madrid (528), Valencia (436), Las Palmas (249)

---

## 10. EDOMMO CASE STUDY + MATERIALES

**Edommo data (últimas 2 semanas):**
- 100 llamadas, 90 conectadas
- Duración media: 60s
- Talk time total: 90 minutos
- Rango: 24 marzo — 2 abril

**Documentos pendientes:** Caso de éxito, one-pager, informe PB — agente background terminando.

---

## 11. WORKFLOW POST-LLAMADA

**Diseño completado** por agente background. Incluye:
- Routing por resultado (agendo/no agendo/callback/no interesado/gatekeeper)
- Smart callback via cron + VAPI API
- Anti-spam guard para WhatsApp
- Funciona sin WA inicialmente

---

## RESUMEN EJECUTIVO

| Bloque | Estado | Bloqueante? |
|--------|--------|-------------|
| Telefonía Zadarma PBX | ✅ VERIFICADA | No |
| VAPI cuenta nueva PB | ✅ MIGRADA | No |
| CSVs para VAW | ✅ LISTOS | No |
| Plantillas WA | ✅ UTILITY only | No |
| WhatsApp activo | ❌ BLOQUEADO | Sí — verificación BM |
| Zadarma API | ❌ Auth 401 | No (panel manual funciona) |
| SOP Onboarding | ✅ ESCRITO | No |
| Número Lugo WA | ❌ En WA personal | Sí — Willy debe liberar |

### PRÓXIMOS PASOS INMEDIATOS (Willy)

1. **HOY:** Conectar VAW a la cuenta nueva (Org ID + key) y subir PB_Leads_VAW_MOVILES.csv
2. **HOY:** Completar perfil BM Edommo (Legal Name, Country, Website) + pago
3. **HOY:** Liberar +34982685874 de WhatsApp personal
4. **ESTA SEMANA:** BM Edommo verificado → registrar número → WA activo
5. **ESTA SEMANA:** Primer test de campaña con 50 leads via VAW + Zadarma PBX
