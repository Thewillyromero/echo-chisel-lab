# SOP: Onboarding de Nuevo Cliente — Plataforma CALLA

> **Clasificacion:** INTERNO — CONFIDENCIAL
> **Version:** 1.0
> **Fecha:** 2026-03-26
> **Tiempo estimado:** ~90 min activos + 2-5 dias de espera (verificacion Meta)
> **Coste mensual por cliente:** ~EUR 15-25

---

## INDICE

1. [Resumen del Proceso](#1-resumen-del-proceso)
2. [Prerequisitos](#2-prerequisitos)
3. [Fase 1 — Telefonia SIP](#3-fase-1--telefonia-sip)
4. [Fase 2 — Agente de Voz](#4-fase-2--agente-de-voz)
5. [Fase 3 — Plataforma de Campanas](#5-fase-3--plataforma-de-campanas)
6. [Fase 4 — WhatsApp Business](#6-fase-4--whatsapp-business)
7. [Fase 5 — Automatizaciones Post-Llamada](#7-fase-5--automatizaciones-post-llamada)
8. [Fase 6 — Pruebas y Validacion](#8-fase-6--pruebas-y-validacion)
9. [Fase 7 — Go-Live](#9-fase-7--go-live)
10. [Pre-Launch Checklist](#10-pre-launch-checklist)
11. [Troubleshooting](#11-troubleshooting)
12. [Costes Desglosados](#12-costes-desglosados)
13. [Reglas de Seguridad y Confidencialidad](#13-reglas-de-seguridad-y-confidencialidad)

---

## 1. Resumen del Proceso

El onboarding de un nuevo cliente en CALLA implica la configuracion de cinco capas:

| Orden | Capa | Componente | Tiempo |
|-------|------|-----------|--------|
| 1 | Telefonia SIP | Zadarma PBX | 15 min |
| 2 | Agente de voz | VAPI | 20 min |
| 3 | Campanas de llamadas | VAW (VoiceAIWrapper) | 15 min |
| 4 | Mensajeria WhatsApp | Meta WABA | 10 min activos + 2-5 dias espera |
| 5 | Automatizaciones | n8n workflows | 30 min |

**Ruta critica:** La verificacion del Business Manager de Meta tarda 2-5 dias laborables. Iniciar este paso lo antes posible.

---

## 2. Prerequisitos

Antes de comenzar, verificar que se dispone de:

- [ ] Nombre del cliente y identificador interno (`client_id`)
- [ ] Numero de telefono espanol a comprar o ya comprado en Zadarma
- [ ] Datos del negocio del cliente (nombre legal, CIF, direccion) para Meta BM
- [ ] Cuenta VAPI disponible en Airtable (Base: `CALLA_OPS`, Tabla: `Cuentas_VAPI`) — hay 100 pre-creadas
- [ ] Acceso al panel de Zadarma
- [ ] Acceso al dashboard de n8n
- [ ] Prompt/script del agente de voz aprobado por el cliente
- [ ] CSV de leads del cliente (revisado, sin celdas vacias)

---

## 3. Fase 1 — Telefonia SIP

### 3.1 Crear Extension en Zadarma

1. Acceder al panel de Zadarma > PBX > Extensiones.
2. Crear nueva extension (ej: `100`, `101`, etc.).
   - Las extensiones son **gratuitas**, incluidas en el plan.
   - Cada extension soporta **3 canales simultaneos** (verificado con llamadas reales).
3. Anotar las credenciales:
   - **Login:** `{SIP_ID}-{extension_number}` (ej: `511497-100`)
   - **Password:** generado automaticamente
4. Configurar el **CallerID** de la extension:
   - Debe ser un numero **comprado en Zadarma**.
   - Ir a Extensiones > Editar > CallerID externo > seleccionar el numero.

### 3.2 Datos Tecnicos de Referencia

| Parametro | Valor |
|-----------|-------|
| Servidor PBX | `pbx.zadarma.com:5060` |
| Canales por extension | 3 simultaneos |
| Facturacion | Por segundo (no bloques de 60s) |
| Recargo CPS | Ninguno (verificado: 7 SIP INVITEs simultaneos, EUR 0 extra) |
| Coste movil espanol | ~EUR 0.009/min |

### 3.3 Comprar Numero (si es necesario)

1. Panel Zadarma > Numeros virtuales > Espana.
2. Seleccionar numero y completar compra (~EUR 3/mes).
3. Asignar como CallerID de la extension creada.

---

## 4. Fase 2 — Agente de Voz

### 4.1 Asignar Cuenta VAPI

1. Abrir Airtable > Base `CALLA_OPS` > Tabla `Cuentas_VAPI`.
2. Localizar la primera cuenta con estado `Disponible`.
3. Cambiar estado a `Asignada` y rellenar el campo `client_id`.
4. Anotar las credenciales: **Org ID** y **Private Key**.

### 4.2 Configurar SIP Trunk (byo-sip-trunk)

Crear el trunk en VAPI con estos parametros exactos:

```
Provider: byo-sip-trunk
Gateway: pbx.zadarma.com
Port: 5060
outboundEnabled: true
outboundLeadingPlusEnabled: true
outboundAuthenticationPlan:
  authUsername: {SIP_ID}-{extension_number}
  authPassword: {password_de_extension}
```

### 4.3 Configurar Numero (byo-phone-number)

1. Crear un `byo-phone-number` en VAPI.
2. Vincularlo al credential del SIP trunk creado en 4.2.
3. Asignar el numero espanol comprado en Zadarma.

### 4.4 Clonar Asistente desde Template

1. En VAPI, duplicar el asistente template de CALLA.
2. Personalizar:
   - Nombre del asistente: `calla-{client_id}`
   - Prompt del sistema: el script aprobado por el cliente
   - Voz: seleccionar segun idioma/tono
3. Clonar las **tools** del template.
4. **CRITICO:** Remapear todos los `toolIds` en el asistente clonado para que apunten a las tools clonadas (no a las del template).

### 4.5 Verificacion

- Realizar una llamada de prueba desde VAPI dashboard.
- Confirmar que el CallerID correcto aparece en el telefono destino.
- Confirmar que la llamada se establece y el agente responde.

---

## 5. Fase 3 — Plataforma de Campanas

### 5.1 Conectar Pod en VAW

1. Acceder a VoiceAIWrapper.
2. Crear nuevo pod o workspace para el cliente.
3. Conectar usando:
   - **Org ID:** de la cuenta VAPI asignada
   - **Private Key:** de la cuenta VAPI asignada

### 5.2 Configurar Campana

Aplicar estos parametros de campana:

| Parametro | Valor | Justificacion |
|-----------|-------|---------------|
| Total de intentos | 12 | Maximizar contactabilidad |
| Intentos diarios | 4 | No saturar al lead |
| Espaciado entre intentos | 60 minutos | Cumplir buenas practicas |
| Llamadas concurrentes | **3** | Coincide con canales Zadarma por extension |

> **IMPORTANTE:** Nunca configurar concurrencia > 3. Zadarma limita a 3 canales por extension. Si se necesitan mas, crear extensiones adicionales.

### 5.3 Preparar CSV de Leads

**Reglas obligatorias del CSV:**

1. **CERO celdas vacias** — cada campo debe tener un valor.
2. Si `first_name` esta vacio, usar el fallback: `"el equipo"`.
3. Formato de telefono: internacional con prefijo (ej: `+34612345678`).
4. Validar antes de subir:
   - Sin filas duplicadas
   - Sin numeros malformados
   - Sin caracteres especiales en nombres

**Script de validacion rapida:**
```bash
# Verificar celdas vacias en el CSV
awk -F',' '{for(i=1;i<=NF;i++) if($i=="") print "Fila "NR", Columna "i" vacia"}' leads.csv
```

### 5.4 Configurar Webhook

- URL del webhook: `callao.app/webhook/vaw-{client_id}-events`
- Verificar que el endpoint responde con HTTP 200.

---

## 6. Fase 4 — WhatsApp Business

> **NOTA:** Esta fase tiene un bloqueo de 2-5 dias laborables por verificacion de Meta. Iniciar cuanto antes.

### 6.1 Verificar Business Manager

1. El cliente debe tener un Business Manager en Meta **VERIFICADO**.
2. Si no esta verificado:
   - Subir documentacion (CIF, factura de servicios, etc.)
   - Esperar verificacion: **2-5 dias laborables**
3. **No avanzar al paso 6.2 sin BM verificado.**

### 6.2 Crear WABA (WhatsApp Business Account)

1. Crear la WABA **bajo el BM verificado** del cliente.
2. Configurar nombre comercial y categoria.

### 6.3 Crear System User

1. En Business Manager > Configuracion > System Users.
2. Crear System User con permisos:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
3. Generar token permanente y guardarlo de forma segura.

### 6.4 Registrar Numero de WhatsApp

1. Agregar el numero de telefono a la WABA.
2. Metodo de verificacion: **VOICE CALL** (no SMS).
3. Completar la verificacion con el codigo recibido.

### 6.5 Crear Templates de Mensaje

**REGLA CRITICA: Solo templates de tipo UTILITY.**

Templates permitidos:

| Nombre | Tipo | Uso |
|--------|------|-----|
| `seguimiento` | UTILITY | Follow-up tras llamada |
| `confirmacion` | UTILITY | Confirmar cita/accion |
| `recordatorio` | UTILITY | Recordar cita proxima |
| `noshow` | UTILITY | Contactar tras no-show |

> **PROHIBIDO:** Crear templates de tipo MARKETING. La cuenta sera **baneada** por Meta.

### 6.6 Configurar Anti-Spam

| Parametro | Valor |
|-----------|-------|
| Filtro | `type=messages` solamente |
| Cooldown | 30 segundos por telefono |
| Deduplicacion | Por `msgId` |

### 6.7 Ramp-Up Inicial

- **Primera semana:** maximo **50 mensajes/dia**.
- Incrementar gradualmente segun el quality rating.
- **Monitorizar quality rating semanalmente:**
  - GREEN: OK, se puede escalar
  - YELLOW: reducir volumen, revisar templates
  - RED: pausar envios inmediatamente, investigar causa

---

## 7. Fase 5 — Automatizaciones Post-Llamada

### 7.1 Duplicar Workflow Base en n8n

1. Acceder a n8n > Workflows.
2. Duplicar el workflow template `post-call-base`.
3. Renombrar: `post-call-{client_id}`.

### 7.2 Configurar el Workflow

1. Abrir el workflow duplicado.
2. Actualizar los siguientes nodos:
   - **client_id:** establecer al identificador del cliente
   - **Conexion Airtable:** apuntar a la base/tabla correcta del cliente
3. Activar el webhook del workflow.
4. Verificar que la URL del webhook coincide con la configurada en VAW (paso 5.4).

### 7.3 Configurar Smart Callback

1. En n8n, localizar el nodo cron del workflow.
2. Configurar: **cada 15 minutos**.
3. Logica:
   - El cron consulta Airtable buscando callbacks pendientes (campo `callback_due <= NOW()`).
   - Para cada callback pendiente, dispara una llamada via la API de VAPI.
4. Verificar que las credenciales de VAPI estan correctas en el nodo HTTP Request.

### 7.4 Activar el Workflow

1. Toggle de activacion en n8n: **ON**.
2. Verificar en los logs que el cron se ejecuta cada 15 min sin errores.

---

## 8. Fase 6 — Pruebas y Validacion

### 8.1 Prueba de Llamada End-to-End

1. Subir un CSV de prueba con 2-3 numeros internos.
2. Lanzar una mini-campana en VAW.
3. Verificar:
   - La llamada se establece correctamente.
   - El CallerID es correcto.
   - El agente sigue el script.
   - El webhook recibe los eventos.
   - n8n procesa el evento y actualiza Airtable.

### 8.2 Prueba de WhatsApp

1. Enviar un template `seguimiento` a un numero de prueba.
2. Verificar:
   - El mensaje llega correctamente.
   - El template se renderiza bien.
   - El anti-spam no bloquea (1 mensaje = sin cooldown).

### 8.3 Prueba de Smart Callback

1. Crear un registro en Airtable con `callback_due` = ahora.
2. Esperar al proximo ciclo del cron (max 15 min).
3. Verificar que la llamada se dispara automaticamente.

### 8.4 Prueba de Concurrencia

1. Lanzar 3 llamadas simultaneas.
2. Verificar que las 3 se establecen (limite de la extension).
3. Intentar una 4a llamada: debe quedar en cola, no fallar.

---

## 9. Fase 7 — Go-Live

### 9.1 Preparacion

1. Confirmar que todas las pruebas del paso 8 pasaron.
2. Confirmar con el cliente que el script/prompt esta aprobado.
3. Confirmar que el CSV de produccion esta limpio (ver reglas 5.3).
4. Verificar que el quality rating de WhatsApp esta en GREEN.

### 9.2 Lanzamiento

1. Subir CSV de produccion a VAW.
2. Configurar horario de campana (ej: L-V 9:00-20:00).
3. Activar campana.
4. Monitorizar las primeras 10 llamadas en tiempo real.

### 9.3 Monitorizacion Post-Lanzamiento (primeras 48h)

- Revisar logs de n8n cada 4 horas.
- Verificar que los webhooks llegan sin errores.
- Monitorizar quality rating de WhatsApp diariamente.
- Revisar grabaciones de las primeras 5 llamadas con el cliente.

---

## 10. Pre-Launch Checklist

### Telefonia

- [ ] Extension creada en Zadarma
- [ ] CallerID configurado con numero Zadarma
- [ ] Numero comprado y activo
- [ ] Login format verificado: `{SIP_ID}-{extension}`
- [ ] Llamada de prueba exitosa desde el softphone

### Agente de Voz

- [ ] Cuenta VAPI asignada en Airtable (`Cuentas_VAPI`)
- [ ] SIP trunk `byo-sip-trunk` creado con gateway `pbx.zadarma.com:5060`
- [ ] `outboundEnabled: true` confirmado
- [ ] `outboundLeadingPlusEnabled: true` confirmado
- [ ] `outboundAuthenticationPlan` con credenciales correctas
- [ ] `byo-phone-number` creado y vinculado al credential
- [ ] Asistente clonado desde template
- [ ] Tools clonadas y `toolIds` remapeados
- [ ] Prompt del sistema personalizado y aprobado
- [ ] Llamada de prueba exitosa desde VAPI

### Campanas

- [ ] Pod conectado en VAW con Org ID + Private Key
- [ ] Campana configurada: 12 intentos, 4 diarios, 60 min spacing, 3 concurrentes
- [ ] CSV validado: CERO celdas vacias
- [ ] Fallback `first_name` = `"el equipo"` aplicado donde necesario
- [ ] Webhook configurado: `callao.app/webhook/vaw-{client_id}-events`
- [ ] Webhook responde HTTP 200

### WhatsApp

- [ ] Business Manager VERIFICADO por Meta
- [ ] WABA creada bajo BM verificado
- [ ] System User con permisos `whatsapp_business_messaging` + `whatsapp_business_management`
- [ ] Numero registrado y verificado por **VOICE CALL**
- [ ] Templates creados: `seguimiento`, `confirmacion`, `recordatorio`, `noshow`
- [ ] Todos los templates son tipo **UTILITY** (CERO marketing)
- [ ] Anti-spam configurado: filtro `type=messages`, cooldown 30s, dedupe `msgId`
- [ ] Limite primera semana: max 50 msg/dia
- [ ] Quality rating monitorizado: GREEN

### Automatizaciones

- [ ] Workflow n8n duplicado y renombrado: `post-call-{client_id}`
- [ ] `client_id` configurado en el workflow
- [ ] Conexion Airtable apuntando a base/tabla correcta
- [ ] Webhook activado y URL coincide con VAW
- [ ] Smart callback cron configurado: cada 15 minutos
- [ ] Cron consulta Airtable por `callback_due <= NOW()`
- [ ] Cron dispara llamada via VAPI API correctamente
- [ ] Workflow activado (toggle ON)

### Pruebas End-to-End

- [ ] Llamada completa: VAW > VAPI > Zadarma > telefono destino
- [ ] Webhook recibido y procesado por n8n
- [ ] Airtable actualizado correctamente
- [ ] WhatsApp template enviado y recibido
- [ ] Smart callback disparado automaticamente
- [ ] 3 llamadas simultaneas exitosas (test concurrencia)
- [ ] CallerID correcto en todas las llamadas

### Documentacion Interna

- [ ] Credenciales guardadas en gestor de contrasenas
- [ ] `client_id` registrado en `CALLA_OPS`
- [ ] Contacto del cliente anotado para soporte

---

## 11. Troubleshooting

### Llamada no se establece

1. Verificar credenciales SIP (login format: `{SIP_ID}-{extension}`).
2. Verificar que el gateway es `pbx.zadarma.com:5060`.
3. Verificar `outboundEnabled: true` en el trunk.
4. Comprobar saldo en Zadarma.

### CallerID incorrecto o "Unknown"

1. Verificar que el CallerID esta configurado **en la extension**, no solo en la cuenta.
2. El numero debe estar **comprado en Zadarma** (no se aceptan externos).

### 4a llamada simultanea falla

- Comportamiento esperado. Cada extension = 3 canales max.
- Solucion: crear extension adicional o esperar a que se libere un canal.

### WhatsApp quality rating YELLOW/RED

1. **YELLOW:** reducir volumen de envio un 50%. Revisar templates por contenido sospechoso.
2. **RED:** pausar TODOS los envios. Revisar y corregir templates. Contactar soporte Meta si es necesario.
3. Nunca enviar templates de marketing. Es la causa mas comun de ban.

### Webhook no llega a n8n

1. Verificar URL: `callao.app/webhook/vaw-{client_id}-events`.
2. Verificar que el workflow esta **activado** en n8n.
3. Revisar logs de n8n para errores de ejecucion.
4. Probar el webhook con `curl -X POST {url}` manualmente.

### Smart callback no dispara llamadas

1. Verificar que el cron esta activo (cada 15 min).
2. Verificar que hay registros en Airtable con `callback_due <= NOW()`.
3. Verificar credenciales VAPI en el nodo HTTP Request de n8n.
4. Revisar logs del nodo para errores de autenticacion.

---

## 12. Costes Desglosados

| Concepto | Coste | Frecuencia |
|----------|-------|------------|
| Numero Zadarma | ~EUR 3 | Mensual |
| Minutos Zadarma (estimado) | ~EUR 7 | Mensual |
| Cuenta VAPI | ~$60 | Mensual |
| **Total estimado** | **~EUR 15-25** | **Mensual** |

**Notas sobre costes:**
- Zadarma factura por segundo, no por bloques de 60s. Esto reduce el coste real frente a alternativas como Telnyx.
- No hay recargo CPS (verificado: 7 SIP INVITEs simultaneos sin coste adicional).
- Las extensiones son gratuitas, incluidas en el plan.
- El coste de minutos depende del volumen de llamadas del cliente.

---

## 13. Reglas de Seguridad y Confidencialidad

### Informacion Interna — NUNCA Compartir con Clientes

Los siguientes nombres, marcas y plataformas son **estrictamente internos** y no deben mencionarse en ningun material dirigido al cliente:

- **VAPI** (plataforma de agente de voz)
- **VAW / VoiceAIWrapper** (plataforma de campanas)
- **n8n** (automatizaciones)
- **Zadarma** (telefonia SIP)
- **Airtable** (base de datos operativa)

### Que Decir al Cliente

- Referirse a la plataforma como **"CALLA"** unicamente.
- Las llamadas las realiza **"el asistente de CALLA"**.
- Los mensajes de WhatsApp se envian desde **"la plataforma CALLA"**.
- Los seguimientos se gestionan **"automaticamente por CALLA"**.

### Credenciales

- Todas las credenciales (SIP, VAPI, Meta, n8n) deben almacenarse en el gestor de contrasenas del equipo.
- Nunca enviar credenciales por email, Slack, o cualquier canal no cifrado.
- Rotar tokens de Meta System User cada 90 dias.

---

> **Fin del documento SOP. Version 1.0 — 2026-03-26**
> **Documento INTERNO — NO DISTRIBUIR a clientes.**
