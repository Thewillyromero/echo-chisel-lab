# CALLA - Complete Web Content Extraction

> Extracted from all component, page, and data files in `src/`
> Date: 2026-03-26

---

## 1. NAVBAR (Navbar.tsx)

### Brand
- Logo text: `CA` + `LLA` (LLA uses text-gradient-blue)
- Logo alt text: "CALLA"

### Navigation Links (Desktop)
- "Servicios" -> #features
- "Sectores" -> dropdown with all 8 sectors from sectors.ts
- "Squad" -> #squad
- "Resultados" -> #stats
- "Blog" -> #blog
- "Precios" -> /precios

### Navigation Links (Mobile)
- Same as desktop, rendered as buttons
- Sectors expand as sub-menu

### CTA Buttons
- Desktop: "Empezar gratis"
- Mobile: "Empezar gratis"

---

## 2. HERO (Hero.tsx)

### Badge
- "Atencion telefonica inteligente" (with pulsing green dot)

### Headline
- "Tus llamadas, **resueltas por IA**"

### Subheadline
- "CALLA atiende tus llamadas, agenda citas y responde a tus clientes con una voz natural. Lanza campanas outbound para appointment setting."

### Secondary Text
- "Inbound + Outbound. Todo en una sola plataforma."

### Buttons
- Primary: "Empezar ahora" (with ArrowRight icon)
- Secondary: "Ver demo" (scrolls to #demo)

### Image
- Alt text: "CALLA Asistente Virtual"

---

## 3. SOCIAL PROOF (SocialProof.tsx)

### Rating Bar
- Rating: **4.9 / 5**
- Subtitle: "Basado en +200 opiniones"
- Badge: "Excelente" (green background #00b67a)
- Verified badge: "Verificado"
- Subtitle: "+200 empresas confian en CALLA"

### Review Cards (6 total, all 5-star Trustpilot)

1. **Maria L.** - Clinica dental
   - "CALLA ha transformado nuestra atencion al cliente. Ya no perdemos ni una llamada."

2. **Javier R.** - Inmobiliaria
   - "Impresionante. Duplicamos citas en el primer mes."

3. **Dra. Carmen S.** - Centro medico
   - "Nuestros pacientes no notan que hablan con una IA. Increible."

4. **Antonio G.** - Taller mecanico
   - "Recuperamos 15 llamadas perdidas al dia. Literalmente nos paga solo."

5. **Laura M.** - Energia solar
   - "El outbound de CALLA nos genera 40 citas cualificadas al mes."

6. **Pedro V.** - Despacho legal
   - "Mis recepcionistas ahora se dedican a lo importante. CALLA gestiona el telefono."

---

## 4. LOGO MARQUEE (LogoMarquee.tsx)

### Logo Count
- **27 original logos**: Reputation Loop, Monitronics, Cox Business, Hartmetall USA, Invictus Advisors, Rehab System, PCS Software, Advanced Plumbing, RedRoot, Houwzer, McKenzie Law, Northwest Lighting, Convey All, Capify, Cornerstone, Beyond Group Travel, US Health, Genius Den, DLC Consulting, Tesla Energy, Three Rivers Dental, Crowdfund Mafia, Avian Digital, Tutor Doctor, Intelligent Office, EasyMobile, Marketing Automation
- **39 new logos** (from PDF extraction): logo-p2-1 through logo-p2-40 (no p2-26)
- **Total: 66 logos** in the marquee
- Mobile shows first 20 only

---

## 5. FEATURES (Features.tsx)

### Section Badge
- "Empleados IA 24/7" (with Sparkles icon)

### Section Headline
- "Tu equipo de IA que **nunca duerme**"

### Section Subheadline
- "Cada agente esta disenado para un rol especifico. Delega y escala sin anadir personal."

### Agent Cards (4 total)

#### Agent 1: ARIA
- Icon: Phone
- Title: "Atiende llamadas por ti"
- Description: "Tu asistente responde llamadas entrantes para que puedas centrarte en tu negocio. Disponible 24/7, sin esperas."
- Personality: "La que siempre contesta"
- Color: brand-teal (HSL 190 60% 55%)
- Hover CTA: "Conocer mas"

#### Agent 2: NOVA
- Icon: PhoneOutgoing
- Title: "Campanas Outbound"
- Description: "Lanza campanas de llamadas salientes para appointment setting y generacion de leads cualificados."
- Personality: "La que no para de llamar"
- Color: brand-lavender (HSL 260 50% 65%)
- Hover CTA: "Conocer mas"

#### Agent 3: LUMI
- Icon: CalendarCheck
- Title: "Agenda citas automaticamente"
- Description: "Recoge pedidos y agenda citas directamente en tu calendario sin intervencion humana."
- Personality: "La organizadora perfecta"
- Color: brand-emerald (HSL 160 50% 48%)
- Hover CTA: "Conocer mas"

#### Agent 4: BYTE
- Icon: BarChart3
- Title: "Analiza cada conversacion"
- Description: "Metricas en tiempo real de cada llamada. Sabe que funciona y que mejorar."
- Personality: "El cerebro del equipo"
- Color: brand-amber (HSL 35 70% 58%)
- Hover CTA: "Conocer mas"

---

## 6. DEMO CALL (DemoCall.tsx)

### Section Badge
- "Prueba en vivo" (with Sparkles icon)

### Section Headline
- "Habla con **ARIA ahora mismo**"

### Section Subheadline
- "Escribe tu nombre y habla directamente con nuestra asistente IA desde tu navegador. Sin descargas, sin esperas."

### Feature Bullets
1. "Conversacion en tiempo real desde tu navegador" (Mic icon)
2. "Voz natural en espanol -- pregunta lo que quieras" (Volume2 icon)
3. "Sin instalar nada, solo activa tu microfono" (Phone icon)

### Live Metrics
- "{testCount} tests con ARIA este mes"
- "{viewers} personas en la web"

### Card Header
- Agent name: "ARIA"
- Status labels:
  - "Disponible" (idle)
  - "Conectando..." (connecting)
  - "En llamada" (active)
  - "Llamada finalizada" (ended)
- Subtitle: "Asistente de demostracion CALLA"

### Form (idle state)
- Label: "Tu nombre *"
- Placeholder: "Ej: Carlos Garcia"
- Label: "Telefono"
- Placeholder: "+34 600 000 000"
- Label: "Email"
- Placeholder: "tu@empresa.com"
- Submit button: "Hablar con ARIA"
- Footer: "Tu navegador pedira permiso de microfono . Sin coste . Conversacion de ~2 min"

### Connecting State
- Title: "Conectando con ARIA..."
- Subtitle: "Permite el acceso al microfono cuando tu navegador lo solicite"

### Active State
- Speaking: "ARIA esta hablando..."
- Listening: "Escuchando..."
- Name prompt: "{form.name}, habla con naturalidad"

### Ended State
- Title: "Gracias por probar CALLA!"
- Subtitle: "{form.name}, nuestro equipo te contactara pronto para una demo personalizada de tu sector."
- Button 1: "Otra demo"
- Button 2: "Agendar demo personalizada"

### Toast Messages
- Error: "Necesitamos acceso al microfono para hablar con ARIA. Permite el acceso e intentalo de nuevo."
- Error: "No se pudo conectar. Te redirigimos para agendar una demo."
- Success: "Conectado con ARIA"
- Error: "Error en la conexion. Intentalo de nuevo."
- Error: "Error al iniciar la llamada."
- Error: "Introduce tu nombre (min. 2 caracteres)."

### VAPI Config
- VAPI_PUBLIC_KEY: `47ea7042-5d4a-4bb0-9995-0762b2f51ee2`
- ASSISTANT_ID: `c54bd4a1-68ef-4913-9207-906c44d625b0`

---

## 7. ROI CALCULATOR (ROICalculator.tsx)

### Section Badge
- "Calculadora" (with Calculator icon)

### Section Headline
- "Cuanto te cuesta **gestionar el telefono**?"

### Section Subheadline
- "3 datos. 10 segundos. La respuesta te sorprendera."

### Left Panel: "Lo que gastas hoy" (with UserX icon)

#### Sector Dropdown (11 sectors with hint values)
| ID | Label | Client Value Hint (EUR) |
|---|---|---|
| dental | Clinica dental | 400 |
| salud | Centro medico | 150 |
| legal | Despacho legal | 1,500 |
| inmobiliaria | Inmobiliaria | 3,000 |
| instalaciones | Instalaciones / Energia | 10,000 |
| estetica | Clinica estetica | 800 |
| educacion | Academia | 200 |
| hosteleria | Restaurante / Hotel | 50 |
| seguros | Seguros | 1,200 |
| taller | Taller | 350 |
| otro | Otro sector | 300 |

#### Staff Cost Input
- Label: "Cuanto pagas al mes a quien contesta las llamadas?"
- Default: EUR 1,500
- Suffix: "/mes"

#### Hours Input
- Label: "Cuantas horas al dia dedicas TU al telefono?"
- Options: 0h, 1h, 2h, 3h, 4h+
- Default: 2h
- Note: "Tu tiempo como CEO vale minimo EUR50/h"

#### Result Labels
- "Tu gasto total hoy"
- Breakdown: "Personal" + "Tu tiempo ({ownHours}h/dia x EUR50/h)"

### Right Panel: "Con CALLA" (with Sparkles icon)

#### Benefits List
1. "Todas tus llamadas contestadas, 24/7"
2. "Citas agendadas automaticamente"
3. "Cero llamadas perdidas"
4. "Tu tiempo libre para lo que importa"

#### Cost Breakdown
- Plan Starter: EUR297/mes
- Consumo estimado: ~EUR206/mes
- Total CALLA: EUR503/mes

#### Savings
- "Ahorras cada mes": EUR{monthlySaving}
- "EUR{annualSaving} al ano"

#### Cherry on top
- "Y piensa en esto: si solo 1 llamada extra al mes se convierte en un cliente de EUR{clientValue}... CALLA se paga sola."

### CTA
- Button: "Reservar consulta gratuita" (with Sparkles + ArrowRight icons)
- Footer: "30 min . Sin compromiso . Te contamos como funciona para tu sector"

### Calculation Formula
- ownTimeCost = ownHours x 50 x 22
- totalToday = staffCost + ownTimeCost
- callaTotal = 503 (297 plan + 206 estimated usage)
- monthlySaving = totalToday - callaTotal
- annualSaving = monthlySaving x 12

---

## 8. CALL PLAYER (CallPlayer.tsx)

### Section Badge
- "Escucha llamadas reales" (with Headphones icon)

### Section Headline
- "No te lo contamos, **escuchalo**"

### Section Subheadline
- "Llamadas reales gestionadas por nuestros agentes IA. Sin filtros, sin edicion."

### Call Samples (3 total)

#### Call 1
- Title: "Cita en clinica dental"
- Sector: "Salud"
- Duration: "1:30"
- Agent: ARIA (brand-teal)
- Description: "ARIA recibe una llamada, identifica disponibilidad y agenda una cita de limpieza dental para el jueves."
- Status badge: "Proximamente"

#### Call 2
- Title: "Campana outbound -- inmobiliaria"
- Sector: "Inmobiliaria"
- Duration: "2:15"
- Agent: NOVA (brand-lavender)
- Description: "NOVA llama a un lead interesado en una vivienda, califica su presupuesto y agenda visita con el agente comercial."
- Status badge: "Proximamente"

#### Call 3
- Title: "Seguimiento de lead cualificado"
- Sector: "Servicios"
- Duration: "1:58"
- Agent: NOVA (brand-lavender)
- Description: "NOVA contacta a un lead que solicito informacion, confirma interes y agenda reunion con el equipo comercial."
- Status badge: "Proximamente"

### Footer Note
- "Nombres de clientes anonimizados por privacidad . Grabaciones de campanas reales en Espana"

---

## 9. CAMPAIGN RESULTS (CampaignResults.tsx)

### Section Badge
- "Resultados reales" (with BarChart3 icon)

### Section Headline
- "Datos de una **campana real**"

### Section Subheadline
- "Sin capturas retocadas ni promesas vacias. Estos son los numeros reales de una campana de 662 leads ejecutada con CALLA."

### KPI Metrics (6 total)
| Metric | Value | Icon | Color |
|---|---|---|---|
| Leads procesados | 662 | Users | brand-teal |
| Llamadas realizadas | 1.767 | PhoneOutgoing | brand-lavender |
| Llamadas contestadas | 561 | Phone | brand-emerald |
| Tasa de conexion | 84,7% | TrendingUp | brand-amber |
| Tiempo medio de respuesta | 22s | Clock | brand-rose |
| Llamadas transferidas | 3 | BarChart3 | primary |

### Dashboard Header
- Agent: BYTE
- Label: "Campaign Analytics"
- Date range: "27 Feb -- 29 Mar, 2026"

### Dashboard Card 1: "Leads Overview"
| Label | Value | Change |
|---|---|---|
| Leads con actividad | 662 | +100% |
| Lead Connect Rate | 84,7% | +100% |
| Leads llamados | 662 | +100% |
| Leads contestados | 561 | +100% |

### Dashboard Card 2: "Distribucion de llamadas"
| Label | Value | Change |
|---|---|---|
| Mejor hora | 11 AM | - |
| Mejor dia | Miercoles | - |
| Media por hora | 3,3 | llamadas |
| Pico diario | 490 | leads |

### Donut Chart
- Center: "84,7% conectados"
- Contestadas: 561 (84,7%) - brand-teal
- No contestadas: 101 (15,3%) - brand-lavender
- Sin llamar: 0 (0%) - muted

---

## 10. SQUAD (Squad.tsx)

### Section Badge
- "Automatizacion completa"

### Section Headline
- "Asi **trabajan juntos**"

### Section Subheadline
- "Cada agente sabe cuando actuar y a quien pasar el testigo. Tu no haces nada."

### Agent Roster (5 agents)
| Agent | Icon | Color | Role |
|---|---|---|---|
| ARIA | Phone | text-brand-teal | Recibe la llamada |
| NOVA | PhoneOutgoing | text-brand-lavender | Llama al lead |
| LUMI | CalendarCheck | text-brand-emerald | Agenda la cita |
| BYTE | BarChart3 | text-brand-amber | Analiza datos |
| CARE | Heart | text-brand-rose | Seguimiento |

### Workflow 1: "Flujo Inbound"
- Subtitle: "Un cliente te llama"
- Steps: ARIA -> LUMI -> BYTE -> CARE
- Descriptions:
  1. "Recibe la llamada"
  2. "Agenda la cita"
  3. "Analiza la conversacion"
  4. "Seguimiento post-cita"

### Workflow 2: "Flujo Outbound"
- Subtitle: "Tu llamas a tus leads"
- Steps: NOVA -> LUMI -> BYTE -> CARE
- Descriptions:
  1. "Llama al lead"
  2. "Agenda si hay interes"
  3. "Mide el rendimiento"
  4. "Fideliza al cliente"

---

## 11. ABOUT (About.tsx)

### Section Badge
- "Sobre nosotros"

### Headline
- "Conocenos"

### Paragraph 1
- "Contamos con un equipo de profesionales especializados en IA conversacional. Entrenamos y adaptamos tu asistente virtual para que tus clientes reciban la mejor experiencia posible."

### Paragraph 2
- "Tanto en llamadas entrantes como en campanas outbound, nuestros agentes trabajan 24/7 para que tu puedas centrarte en lo que importa."

### CTA Button
- "Conoce al equipo" (scrolls to #squad)

### Characters shown
- NOVA (left), ARIA (center, largest), BYTE (right)

---

## 12. STATS (Stats.tsx)

### Section Badge
- "Resultados probados"

### Headline
- "Innovacion en **IA conversacional**"

### Subheadline
- "Nuestros asistentes virtuales aportan calma a tu negocio gestionando llamadas y citas."

### Animated Counters (4 total)
| Value | Suffix | Label |
|---|---|---|
| 2 | M+ | Llamadas gestionadas |
| 5 | M+ | Usuarios finales |
| 4.9 | /5 | Valoracion media |
| 3 | anos | En el mercado |

### Character
- BYTE with alt text: "BYTE analiza los datos"

---

## 13. TESTIMONIALS (Testimonial.tsx)

### Section Badge
- "Resultados reales"

### Headline
- "Lo que dicen **nuestros clientes**"

### Subheadline
- "Mas de 20 industrias, cientos de campanas exitosas."

### Rating Badges
| Platform | Rating |
|---|---|
| Google Reviews | 4.9 |
| Trustpilot | 4.8 |
| Clutch.co | 5.0 |

### Verified Badge
- "Verificado" / "Opiniones reales"

### Expand/Collapse Button
- "+200 empresas confian en CALLA"
- Toggle: "Ver mas" / "Ver menos"

---

### ALL 21 TESTIMONIALS

#### BLOCK 1 (first 6 visible -- objection breakers)

**Testimonial 1** (Spanish)
- Quote: "Te soy sincero: al principio me daba miedo que mis pacientes se sintieran 'atendidos por una maquina'. Pero es que no lo notan. Me llaman diciendo 'que maja la chica que me cogio el telefono ayer'."
- Name: Dr. Sergio Lopez
- Role: Director
- Company: Clinica Dental Lopez
- Initials: SL
- Result: "Pacientes no lo notan"
- Context/Sector: Dental

**Testimonial 2** (Spanish)
- Quote: "Mi mayor miedo era perder el trato cercano con los clientes. Resulta que CALLA es mas amable y paciente que cualquier recepcionista que haya tenido. Y no tiene dias malos."
- Name: Elena Garcia
- Role: Directora
- Company: Inmobiliaria Mediterraneo
- Initials: EG
- Result: "Mejor trato que humanos"
- Context/Sector: Inmobiliaria

**Testimonial 3** (Spanish)
- Quote: "Llevaba meses mirando soluciones de IA y siempre pensaba 'esto no va a funcionar en mi sector'. Me equivocaba. En una semana ya estaba agendando citas sola, sin un solo error."
- Name: Marta Jimenez
- Role: Socia Directora
- Company: Fernandez & Asociados Abogados
- Initials: MJ
- Result: "0 errores primera semana"
- Context/Sector: Despacho legal

**Testimonial 4** (Spanish)
- Quote: "Mis clientes tienen 60-70 anos de media. Pensaba que no iban a aceptar hablar con una IA. Pero la voz es tan natural que ni lo cuestionan. Solo dicen 'que bien me atendieron'."
- Name: Jorge Navarro
- Role: Propietario
- Company: Restaurante La Brasa
- Initials: JN
- Result: "Clientes mayores encantados"
- Context/Sector: Hosteleria

**Testimonial 5** (Spanish)
- Quote: "Pensaba que era caro hasta que calcule lo que me costaba perder 8 llamadas al dia. Cada llamada perdida era un cliente potencial que se iba a la competencia. CALLA cuesta menos que una manana de recepcionista."
- Name: Roberto Mendez
- Role: Propietario
- Company: Taller Mendez e Hijos
- Initials: RM
- Result: "Mas barato que perder clientes"
- Context/Sector: Taller mecanico

**Testimonial 6** (Spanish)
- Quote: "Mi equipo se resistia: 'una IA va a hacer nuestro trabajo?'. A los dos dias me dijeron 'esto es lo mejor que has hecho'. Ahora se dedican a cerrar ventas en vez de contestar telefonos."
- Name: Carlos Vega
- Role: Director Comercial
- Company: SolarTech Espana
- Initials: CV
- Result: "Equipo convencido en 2 dias"
- Context/Sector: Energia solar

#### BLOCK 2 (expanded -- results + varied sectors)

**Testimonial 7** (Spanish)
- Quote: "CALLA ha transformado nuestra clinica. Antes perdiamos 10-15 llamadas al dia porque la recepcionista no daba abasto. Ahora no se pierde ni una y las citas se agendan solas."
- Name: Patricia Ruiz
- Role: Gerente
- Company: Centro Medico Salud Plus
- Initials: PR
- Result: "0 llamadas perdidas"
- Context/Sector: Centro medico

**Testimonial 8** (English)
- Quote: "We hired 3 separate teams to find the best fit, and Guillermo stood out above all of them. What surprised us most was how seamlessly they handled everything in English -- you'd never guess they're a Spanish team. Over $300K in new revenue generated."
- Name: Tim Michael Bissonnette
- Role: CEO
- Company: Direct Public Funding
- Initials: TB
- Result: "$300K+ generados"
- Context/Sector: Finanzas

**Testimonial 9** (Spanish)
- Quote: "Gestionamos 200 llamadas al dia entre 3 sedes. CALLA unifico todo: atiende, deriva a la sede correcta y agenda. Ahorramos 2 puestos de recepcion."
- Name: Miguel Santos
- Role: Director de Operaciones
- Company: Edommo Energia
- Initials: MS
- Result: "2 puestos ahorrados"
- Context/Sector: Energia

**Testimonial 10** (English)
- Quote: "The system they built generates over 200 leads per month and consistent appointments for high-value procedures. Communication was flawless -- they work in English as naturally as in Spanish. Truly impressive."
- Name: Dr. Laurence Fendrich
- Role: Fundador
- Company: Dental 101
- Initials: LF
- Result: "200+ leads/mes"
- Context/Sector: Salud dental

**Testimonial 11** (Spanish)
- Quote: "Nuestro centro recibe 40 llamadas al dia. Antes contestabamos 25 si teniamos suerte. Con CALLA, 40 de 40. Y las urgencias las deriva al movil del doctor de guardia."
- Name: Carmen Ortega
- Role: Directora
- Company: Centro Estetica Carmen
- Initials: CO
- Result: "40/40 llamadas atendidas"
- Context/Sector: Estetica

**Testimonial 12** (Spanish)
- Quote: "En nuestra fabrica recibimos pedidos por telefono de toda Espana. Antes se perdian en post-its. Ahora CALLA los registra todos directamente en el sistema."
- Name: Francisco Torres
- Role: Director General
- Company: Metalicas Torres S.L.
- Initials: FT
- Result: "0 pedidos perdidos"
- Context/Sector: Industrial

**Testimonial 13** (Spanish)
- Quote: "Antes dedicaba 3 horas al dia al telefono. Ahora CALLA atiende, filtra y solo me pasa las llamadas que realmente importan. Recupere mi agenda."
- Name: David Martinez
- Role: Director Comercial
- Company: Instalaciones Martinez
- Initials: DM
- Result: "3h/dia recuperadas"
- Context/Sector: Instalaciones

**Testimonial 14** (English)
- Quote: "It was a pleasure working with Guillermo and his team. They're experts in their field and helped me execute a very successful campaign from day one. The fact that they're based in Spain but operate perfectly in English is a real competitive advantage."
- Name: Carin Cowell
- Role: Marketing Manager
- Company: Reputation Loop
- Initials: CC
- Result: "Campana exitosa desde dia 1"
- Context/Sector: Lead Generation

**Testimonial 15** (Spanish)
- Quote: "Somos una gestoria con 400 clientes. En campana de renta nos saturabamos. CALLA atiende, clasifica la urgencia y agenda la cita con el asesor correcto."
- Name: Ana Morales
- Role: Socia
- Company: Gestoria Morales & Asociados
- Initials: AM
- Result: "400 clientes sin saturacion"
- Context/Sector: Gestoria

**Testimonial 16** (English)
- Quote: "To say they pay attention to detail would be an understatement. Exceptional communicators who provided detailed explanations of their methodology. Working across languages was never an issue -- if anything, their bilingual approach opened new doors for us."
- Name: Tim Virga
- Role: Director
- Company: Capify
- Initials: TV
- Result: "ROI excepcional"
- Context/Sector: Fintech

**Testimonial 17** (Spanish)
- Quote: "Lo que mas me sorprendio es que CALLA detecta cuando un paciente esta nervioso y adapta el tono. Mis pacientes de primera visita llegan mas tranquilos."
- Name: Alejandro Diaz
- Role: Psicologo clinico
- Company: Centro Psicologico Equilibrio
- Initials: AD
- Result: "Mejor experiencia paciente"
- Context/Sector: Psicologia

**Testimonial 18** (Spanish)
- Quote: "Tenemos 12 tecnicos en la calle y las llamadas de clientes para avisos de averia eran un caos. CALLA las recoge, prioriza y asigna al tecnico mas cercano."
- Name: Antonio Ruiz
- Role: Jefe de Operaciones
- Company: Climatizaciones Ruiz
- Initials: AR
- Result: "Averias priorizadas al instante"
- Context/Sector: Climatizacion

**Testimonial 19** (English)
- Quote: "In just 14 days we generated $7,200 in new customers. The automated follow-up calls were the key to closing. And honestly, working with a European team that speaks perfect English gave us a fresh perspective we didn't expect."
- Name: Michael Torres
- Role: Propietario
- Company: Advanced Plumbing
- Initials: MT
- Result: "$7.2K en 14 dias"
- Context/Sector: Servicios

**Testimonial 20** (Spanish)
- Quote: "Nuestra academia recibe consultas de padres a todas horas. CALLA les da la informacion, resuelve dudas sobre horarios y matricula directamente. Matriculaciones subieron un 40%."
- Name: Sofia Herrero
- Role: Directora
- Company: Academia Herrero
- Initials: SH
- Result: "+40% matriculaciones"
- Context/Sector: Educacion

**Testimonial 21** (English/Spanish)
- Quote: "En la primera semana cerramos $5,000 en ventas solo con los leads que nos generaron. Y lo mejor: el equipo detras tiene una estrategia de crecimiento que nos esta cambiando el negocio."
- Name: Director Regional
- Role: Franquiciado
- Company: Tutor Doctor
- Initials: DR
- Result: "$5K primera semana"
- Context/Sector: Educacion

---

### ALL 9 CASE STUDIES

Case studies section header: "Resultados probados en +20 industrias"

| # | Company | Result | Description | Metric | Detail |
|---|---|---|---|---|---|
| 1 | Clinica Dental | $5,000 | en ventas primera semana | 25 leads a $30/lead | ROI positivo desde la primera semana |
| 2 | Startup Medica | $400K | en capital captado | Inversores a <$15/lead | Estrategia de pre-framing y retargeting |
| 3 | Empresa de Fontaneria | $7,200 | en ventas en 14 dias | Leads a $6 . Citas a $26 | Posicionamiento en cuidado preventivo |
| 4 | Empresa de Suelos | $18K | en ventas el primer mes | Presupuestos a $10.53 | Leads desde $0.93 |
| 5 | Agente Inmobiliario | $17-25 | por lead cualificado | Evaluaciones agendadas | Vendedores interesados cualificados |
| 6 | Agencia de Marketing | +$25K/mes | en ingresos recurrentes | En solo 45 dias | Estrategia integral: voz + captacion |
| 7 | Programa Formativo | $48K | en ventas primera semana | Leads a <$3 | Llamadas automaticas + campana digital |
| 8 | Empresa Solar | <$10/lead | cualificados con cita | Citas a <$50 | Leads consistentes bajo coste |
| 9 | Ecommerce Cosmetica | Sold out | primer mes de campana | Leads a $7.12 | Voz IA + marketing integrado |

### Case Studies Footer
- "Datos verificados" (with pulsing green dot)
- "Campanas gestionadas por Guillermo y equipo"

---

## 14. BLOG (Blog.tsx)

### Section Badge
- "Mantente al dia"

### Headline
- "Informate de nuestros **avances**"

### Blog Cards (3 total)

#### Card 1
- Title: "Publicaciones"
- Description: "Novedades y contenido de nuestras redes sociales."
- CTA: "Proximamente"
- Color: text-brand-teal

#### Card 2
- Title: "Actualizaciones"
- Description: "Avances y nuevas funcionalidades de la plataforma."
- CTA: "Proximamente"
- Color: text-brand-lavender

#### Card 3
- Title: "Noticias"
- Description: "Hitos y logros de CALLA. No te los pierdas!"
- CTA: "Proximamente"
- Color: text-brand-rose

---

## 15. FAQ - Main Page (FAQ.tsx)

### Section Badge
- "FAQ"

### Headline
- "Preguntas **frecuentes**"

### Subheadline
- "Todo lo que necesitas saber antes de empezar con CALLA."

### All 8 FAQs

**Q1:** Que es CALLA y como funciona?
**A1:** CALLA es una plataforma de IA conversacional que atiende llamadas telefonicas, agenda citas y gestiona campanas outbound de forma autonoma. Nuestros agentes virtuales (ARIA, NOVA, LUMI, BYTE y CARE) trabajan 24/7 con voz natural, sin intervencion humana.

**Q2:** Cuanto tarda la implementacion?
**A2:** Menos de 30 minutos. Nuestro equipo configura tu agente IA personalizado, lo entrena con la informacion de tu negocio y lo deja listo para recibir o realizar llamadas desde el primer dia.

**Q3:** Puedo usar CALLA para llamadas entrantes y salientes?
**A3:** Si. CALLA gestiona tanto inbound (recepcion de llamadas, atencion al cliente, agenda de citas) como outbound (campanas de appointment setting, seguimiento de leads, encuestas de satisfaccion).

**Q4:** En que sectores funciona CALLA?
**A4:** CALLA esta optimizada para mas de 20 sectores: salud, legal, inmobiliario, educacion, hosteleria, finanzas, seguros, e-commerce y muchos mas. Cada agente se adapta al vocabulario y procesos especificos de tu industria.

**Q5:** Que pasa si un cliente necesita hablar con una persona real?
**A5:** CALLA detecta automaticamente cuando una conversacion requiere intervencion humana y transfiere la llamada a tu equipo en tiempo real, proporcionando un resumen del contexto para que el agente humano pueda continuar sin fricciones.

**Q6:** Hay periodo de permanencia o compromiso?
**A6:** No. Todos los planes son mensuales sin permanencia. Puedes cancelar, subir o bajar de plan en cualquier momento. Los cambios se aplican en el siguiente ciclo de facturacion.

**Q7:** Como se integra CALLA con mis herramientas actuales?
**A7:** CALLA se integra con los principales CRMs, calendarios (Google Calendar, Calendly), sistemas de gestion y herramientas de comunicacion mediante API y webhooks. El plan Pro y Enterprise incluyen integraciones personalizadas.

**Q8:** Que metricas puedo ver sobre las llamadas?
**A8:** BYTE, nuestro agente de analytics, ofrece metricas en tiempo real: duracion de llamadas, tasa de resolucion, citas agendadas, sentimiento del cliente, horas pico, y mucho mas. Todo accesible desde tu panel de control.

---

## 16. CTA (CTA.tsx)

### Headline
- "Empieza **hoy mismo**"

### Subheadline
- "En menos de 30 minutos, puedes tener un asistente virtual gestionando todas tus llamadas y citas."

### Buttons
- Primary: "Comenzar ahora" (with ArrowRight icon)
- Secondary: "Probar ARIA gratis" (scrolls to #demo)

---

## 17. FOOTER (Footer.tsx)

### Brand
- Logo text: `CA` + `LLA` (LLA uses text-gradient-blue)
- Tagline: "Empleados IA que atienden llamadas, agendan citas y gestionan tu comunicacion 24/7."

### Column: "Producto"
- Servicios -> #features
- Precios -> /precios
- Squad -> #squad
- Resultados -> #stats

### Column: "Recursos"
- Blog -> #blog
- Testimonios -> #testimonials
- Sobre nosotros -> #about

### Column: "Legal"
- Politica de privacidad -> BOOKING_URL
- Contacto -> BOOKING_URL

### Copyright
- "2026 CALLA. Todos los derechos reservados."
- "Hecho con IA . Desde Espana"

---

## 18. FOMO NOTIFICATIONS (FOMONotifications.tsx)

### Timing
- First notification after 8 seconds
- Desktop: every ~20-26 seconds
- Mobile: every ~30-36 seconds
- Each notification visible for 3.5 seconds
- Shows "hace {1-8} min" as timestamp
- Stops after user dismisses 3 times

### All 47 Notification Messages

#### Demo Type (17 messages, icon: microphone)
1. "Maria L. de Madrid acaba de probar ARIA"
2. "Un despacho legal de Barcelona ha probado ARIA"
3. "Dra. Garcia de Malaga acaba de hablar con ARIA"
4. "Antonio G. de Zaragoza ha hecho un test con ARIA"
5. "Laura M. de Granada ha probado ARIA ahora mismo"
6. "Centro dental en Valencia ha probado ARIA"
7. "Pedro R. de Bilbao acaba de hablar con ARIA"
8. "Un fisioterapeuta de Sevilla ha probado ARIA"
9. "Carmen S. de Alicante ha hecho un test con ARIA"
10. "Clinica estetica en Madrid ha probado ARIA"
11. "Asesoria fiscal de Pamplona ha probado ARIA"
12. "Juan M. de Murcia acaba de probar ARIA"
13. "Taller mecanico de Cordoba ha probado ARIA"
14. "Elena P. de Santander ha hablado con ARIA"
15. "Inmobiliaria de Las Palmas ha probado ARIA"
16. "Andrea V. de Gijon acaba de probar la demo"
17. "Gabinete psicologico de Vitoria ha probado ARIA"

#### Booking Type (15 messages, icon: calendar)
1. "Carlos R. de Valencia ha reservado una consulta"
2. "Una clinica dental de Sevilla ha agendado demo"
3. "Inmobiliaria en Bilbao ha reservado consulta"
4. "Centro medico de Alicante ha agendado llamada"
5. "Taller mecanico de Valladolid ha reservado demo"
6. "Marta F. de Madrid ha agendado una consulta"
7. "Despacho legal de Zaragoza ha reservado demo"
8. "Restaurante en Barcelona ha agendado consulta"
9. "Clinica estetica de Malaga ha reservado demo"
10. "Luis A. de Palma ha reservado una consulta"
11. "Academia de idiomas de Granada ha agendado demo"
12. "Instalador solar de Cadiz ha reservado consulta"
13. "Asesoria de Vigo ha agendado demo personalizada"
14. "Patricia M. de Oviedo ha reservado consulta"
15. "Centro veterinario de Toledo ha agendado demo"

#### Viewing Type (5 messages, icon: people)
1. "{n} personas estan viendo esta pagina ahora"
2. "{n} empresas estan explorando CALLA ahora mismo"
3. "{n} personas estan mirando los planes ahora"
4. "{n} personas estan viendo la demo ahora"
5. "{n} profesionales estan explorando CALLA"

#### Signup Type (10 messages, icon: party)
1. "Una academia de Murcia se acaba de registrar"
2. "Clinica dental de Madrid ha activado su cuenta"
3. "Inmobiliaria de BCN ha contratado el plan Pro"
4. "Centro medico de Sevilla se acaba de registrar"
5. "Asesoria legal de Valencia ha activado CALLA"
6. "Empresa de reformas de Bilbao ha contratado CALLA"
7. "Clinica estetica de Malaga ha activado su plan"
8. "Restaurante de A Coruna ha contratado el plan Starter"
9. "Taller de Zaragoza se ha registrado en CALLA"
10. "Consulta dental de Alicante ha activado su cuenta"

---

## 19. LIVE VIEWERS BAR (LiveViewers.tsx)

### Persistent Bottom Bar
- "{viewers} personas en la web ahora" (with pulsing green dot)
- "{testCount} tests con ARIA este mes"

---

## 20. PRICING PAGE (Pricing.tsx)

### Page Header
- Badge: "Planes y precios"
- Headline: "Elige tu **plan perfecto**"
- Subheadline: "Sin permanencia. Sin sorpresas. Escala cuando lo necesites."

### Billing Toggle
- "Mensual" / "Anual"
- Annual discount badge: "-20%"

### Plan 1: STARTER
- Icon: Zap
- Price: EUR297/mes (EUR238/mes annual)
- Badge: none
- Accent: brand-teal
- Description: "Ideal para negocios que quieren automatizar sus llamadas entrantes."
- CTA: "Reservar consulta gratuita"
- Features:
  1. 1 agente IA (Inbound)
  2. Hasta 500 llamadas/mes
  3. Agenda de citas automatica
  4. Horario personalizado
  5. Transcripcion de llamadas
  6. Soporte por email
  7. Panel de metricas basico
- Stripe monthly: `https://buy.stripe.com/28E5kD9ZR0Mwf1fa2yfEk00`
- Stripe annual: `https://buy.stripe.com/7sY7sL1tl52M7yN3EafEk02`

### Plan 2: PRO (Most Popular)
- Icon: Crown
- Price: EUR697/mes (EUR558/mes annual)
- Badge: "Mas popular"
- Accent: brand-lavender
- Description: "Para equipos que necesitan inbound + outbound y analitica avanzada."
- CTA: "Reservar consulta gratuita"
- Features:
  1. 3 agentes IA (Inbound + Outbound)
  2. Hasta 2.000 llamadas/mes
  3. Campanas outbound automatizadas
  4. CRM integrado
  5. Analitica avanzada con BYTE
  6. Soporte prioritario
  7. Personalizacion de voz y tono
  8. Webhook e integraciones API
- Stripe monthly: `https://buy.stripe.com/3cI7sL1tlfHq6uJ2A6fEk01`
- Stripe annual: `https://buy.stripe.com/28E5kD2xpcve7yN1w2fEk03`

### Plan 3: ENTERPRISE
- Icon: Building2
- Price: "Custom" / "A medida"
- Badge: none
- Accent: brand-amber
- Description: "Solucion a medida para grandes volumenes y necesidades especificas."
- CTA: "Hablar con el equipo"
- Features:
  1. Agentes IA ilimitados
  2. Llamadas ilimitadas
  3. Squad completo personalizado
  4. Onboarding dedicado
  5. SLA garantizado 99.9%
  6. Manager de cuenta dedicado
  7. Integraciones custom
  8. Multi-idioma y multi-sede
  9. Facturacion personalizada
- No Stripe links (null)

### Pricing Page FAQs (4 total)

**Q1:** Puedo cambiar de plan en cualquier momento?
**A1:** Si, puedes subir o bajar de plan cuando quieras. Los cambios se aplican en el siguiente ciclo de facturacion.

**Q2:** Que pasa si supero el limite de llamadas?
**A2:** Te avisamos antes de llegar al limite. Las llamadas extra se facturan a tarifa reducida, sin cortes de servicio.

**Q3:** Hay periodo de permanencia?
**A3:** No. Todos los planes son mensuales sin permanencia. Cancela cuando quieras.

**Q4:** Cuanto tarda el setup?
**A4:** Menos de 30 minutos. Nuestro equipo configura todo por ti y te entrega tu agente listo para funcionar.

---

## 21. SECTORS DATA (data/sectors.ts)

### All 8 Sectors

#### Sector 1: SALUD
- Slug: salud
- Name: Salud
- Icon: Heart
- Tagline: "Marketing medico que genera pacientes reales"
- Description: "Estrategias de captacion de pacientes para clinicas dentales, medicas, de fisioterapia y centros de rehabilitacion."
- Hero title: "Mas pacientes para tu"
- Hero highlight: "clinica de salud"
- Pain points:
  1. "Dificultad para llenar la agenda con pacientes de alto valor"
  2. "Competencia agresiva de grandes cadenas"
  3. "Dependencia de boca a boca sin control"
  4. "Campanas anteriores sin ROI medible"
- Solutions:
  1. "Sistema de captacion de pacientes con IA y automatizacion"
  2. "Campanas segmentadas por tratamiento y zona geografica"
  3. "Funnel de pre-calificacion para filtrar pacientes de alto valor"
  4. "Dashboard de metricas en tiempo real con coste por paciente"
- Stats: 200+ leads/mes para clinicas dentales | $6 coste por lead cualificado | 3x mas citas que metodos tradicionales
- CTA: "Quiero mas pacientes"

#### Sector 2: LEGAL
- Slug: legal
- Name: Legal
- Icon: Scale
- Tagline: "Casos cualificados para tu bufete"
- Description: "Generacion de leads para bufetes de abogados especializados en lesiones, inmigracion, derecho familiar y mas."
- Hero title: "Mas casos para tu"
- Hero highlight: "bufete de abogados"
- Pain points:
  1. "Leads de baja calidad que no se convierten en casos"
  2. "Coste por caso demasiado elevado"
  3. "Falta de diferenciacion frente a otros bufetes"
  4. "Dependencia de directorios y referidos"
- Solutions:
  1. "Campanas de intent-based targeting para captar personas con necesidad legal real"
  2. "Pre-calificacion automatica de casos antes de la consulta"
  3. "Posicionamiento de marca como autoridad en tu especialidad"
  4. "Sistema de seguimiento y nurturing automatizado"
- Stats: 45% reduccion en coste por caso | 80+ casos/mes generados | 5x ROI en los primeros 90 dias
- CTA: "Quiero mas casos"

#### Sector 3: INMOBILIARIA
- Slug: inmobiliaria
- Name: Inmobiliaria
- Icon: Building
- Tagline: "Compradores y vendedores cualificados"
- Description: "Captacion de propietarios vendedores y compradores cualificados para agencias inmobiliarias y promotoras."
- Hero title: "Mas operaciones para tu"
- Hero highlight: "inmobiliaria"
- Pain points:
  1. "Leads que solo quieren informacion pero no compran"
  2. "Dificultad para captar propietarios vendedores"
  3. "Ciclos de venta largos sin seguimiento efectivo"
  4. "Portales inmobiliarios cada vez mas caros"
- Solutions:
  1. "Campanas de captacion de propietarios con targeting por zona y tipo de propiedad"
  2. "Funnel de compradores con pre-calificacion financiera"
  3. "Automatizacion de seguimiento durante todo el ciclo de compra"
  4. "Estrategias de retargeting para mantener el interes"
- Stats: $18K en ventas el primer mes | $0.93 coste por lead | 300+ leads cualificados/mes
- CTA: "Quiero mas operaciones"

#### Sector 4: SEGUROS
- Slug: seguros
- Name: Seguros
- Icon: ShieldCheck
- Tagline: "Polizas vendidas con sistema automatizado"
- Description: "Generacion de leads para agentes de seguros de vida, salud, auto y hogar con sistemas de citas automatizados."
- Hero title: "Mas polizas para tu"
- Hero highlight: "agencia de seguros"
- Pain points:
  1. "Leads frios que nunca contestan el telefono"
  2. "Competencia de comparadores online"
  3. "Dificultad para escalar sin contratar mas agentes"
  4. "Falta de sistema predecible de generacion de citas"
- Solutions:
  1. "Sistema de appointment setting automatizado con confirmacion"
  2. "Campanas segmentadas por tipo de seguro y perfil demografico"
  3. "Chatbot de pre-calificacion que filtra antes de la cita"
  4. "Retargeting inteligente para leads que no convirtieron"
- Stats: $26 coste por cita agendada | 60% tasa de asistencia a citas | 4x mas citas que cold calling
- CTA: "Quiero mas citas"

#### Sector 5: EDUCACION
- Slug: educacion
- Name: Educacion
- Icon: GraduationCap
- Tagline: "Matriculas y alumnos con sistema probado"
- Description: "Captacion de alumnos para centros educativos, academias, tutorias y formacion online."
- Hero title: "Mas alumnos para tu"
- Hero highlight: "centro educativo"
- Pain points:
  1. "Estacionalidad en la captacion de alumnos"
  2. "Padres que comparan pero no se matriculan"
  3. "Coste por matricula demasiado alto"
  4. "Falta de presencia digital efectiva"
- Solutions:
  1. "Campanas de captacion durante todo el ano con picos en temporada alta"
  2. "Funnel de decision para padres con contenido de valor"
  3. "Sistema de seguimiento automatizado hasta la matricula"
  4. "Estrategia de testimonios y prueba social"
- Stats: $5K en ventas la primera semana | $30 coste por lead cualificado | 25% tasa de conversion a matricula
- CTA: "Quiero mas alumnos"

#### Sector 6: SERVICIOS
- Slug: servicios
- Name: Servicios
- Icon: Wrench
- Tagline: "Presupuestos y clientes sin parar"
- Description: "Generacion de leads para fontaneros, electricistas, HVAC, limpieza y servicios del hogar."
- Hero title: "Mas clientes para tu"
- Hero highlight: "empresa de servicios"
- Pain points:
  1. "Dependencia de Yelp, Google Maps y boca a boca"
  2. "Leads que piden presupuesto pero nunca contratan"
  3. "Imposibilidad de predecir el volumen de trabajo"
  4. "Competencia de precios con empresas mas baratas"
- Solutions:
  1. "Posicionamiento como servicio premium con enfoque en confianza"
  2. "Campanas geo-targeting por zona de servicio"
  3. "Sistema de presupuestos automatizado con seguimiento"
  4. "Reputacion online gestionada para generar confianza"
- Stats: $7.2K en ventas en 14 dias | $6 coste por lead | $26 coste por cita agendada
- CTA: "Quiero mas clientes"

#### Sector 7: FINANZAS
- Slug: finanzas
- Name: Finanzas
- Icon: Landmark
- Tagline: "Inversores y clientes financieros cualificados"
- Description: "Captacion de inversores acreditados, clientes de prestamos y servicios financieros con compliance integrado."
- Hero title: "Mas clientes para tu"
- Hero highlight: "empresa financiera"
- Pain points:
  1. "Regulaciones estrictas que limitan la publicidad"
  2. "Leads no cualificados que no pasan compliance"
  3. "Coste de adquisicion de cliente muy elevado"
  4. "Dificultad para generar confianza online"
- Solutions:
  1. "Campanas compliant con pre-calificacion regulatoria"
  2. "Targeting de inversores acreditados y perfiles financieros"
  3. "Estrategia de pre-framing y retargeting para generar confianza"
  4. "Funnel de educacion financiera como puerta de entrada"
- Stats: $400K en capital captado | <$15 coste por lead de inversor | $300K+ en ingresos generados
- CTA: "Quiero mas inversores"

#### Sector 8: AUTOMOCION
- Slug: automocion
- Name: Automocion
- Icon: Car
- Tagline: "Test drives y ventas para tu concesionario"
- Description: "Generacion de trafico cualificado para concesionarios, talleres y servicios de automocion."
- Hero title: "Mas ventas para tu"
- Hero highlight: "concesionario"
- Pain points:
  1. "Trafico al showroom cada vez menor"
  2. "Compradores que investigan online pero compran en otro sitio"
  3. "Campanas de marca que no generan ventas directas"
  4. "Competencia de plataformas de venta online"
- Solutions:
  1. "Campanas de generacion de test drives con cita previa"
  2. "Retargeting dinamico con el inventario actualizado"
  3. "Sistema de seguimiento post-visita automatizado"
  4. "Estrategia de trade-in para captar coches usados"
- Stats: 40+ test drives/mes generados | 22% tasa de cierre en test drives | 3x ROI vs publicidad tradicional
- CTA: "Quiero mas test drives"

---

## 22. CONTACT FORM DIALOG (ContactFormDialog.tsx)

### Dialog Title
- "Empieza con **CALLA**"

### Dialog Description
- "Dejanos tus datos y te contactamos para configurar tu asistente virtual."

### Form Fields
- Label: "Nombre *" / Placeholder: "Tu nombre"
- Label: "Email *" / Placeholder: "tu@empresa.com"
- Label: "Telefono" / Placeholder: "+34 600 000 000"
- Label: "Empresa" / Placeholder: "Tu empresa"
- Label: "Mensaje" / Placeholder: "Cuentanos que necesitas..."

### Submit Button
- "Solicitar demo" (with ArrowRight icon)

### Footer
- "Sin compromiso . Respuesta en <24h . Setup en 30 min"

### Success State
- Title: "Mensaje enviado!"
- Description: "Nos pondremos en contacto contigo en menos de 24 horas."
- Button: "Cerrar"

### Error Toasts
- "Por favor, completa al menos tu nombre y email."
- "Por favor, introduce un email valido."
- "Ha ocurrido un error. Intentalo de nuevo."

---

## 23. CONSTANTS & METADATA (lib/constants.ts + DemoCall.tsx + Pricing.tsx)

### Booking URL
- `https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT`

### VAPI Configuration
- VAPI Public Key: `47ea7042-5d4a-4bb0-9995-0762b2f51ee2`
- Assistant ID: `c54bd4a1-68ef-4913-9207-906c44d625b0`

### Stripe Payment Links
| Plan | Billing | URL |
|---|---|---|
| Starter | Monthly | `https://buy.stripe.com/28E5kD9ZR0Mwf1fa2yfEk00` |
| Starter | Annual | `https://buy.stripe.com/7sY7sL1tl52M7yN3EafEk02` |
| Pro | Monthly | `https://buy.stripe.com/3cI7sL1tlfHq6uJ2A6fEk01` |
| Pro | Annual | `https://buy.stripe.com/28E5kD2xpcve7yN1w2fEk03` |
| Enterprise | - | Contact only (no Stripe link) |

### Brand Name
- "CALLA"
- Full display: "CA" + "LLA" (with gradient on LLA)

### Language
- Primary: Spanish (all UI)
- Some testimonials in English (from US/international clients)

### Fonts
- Display (headings): Outfit
- Body: DM Sans

### AI Agent Characters Summary
| Agent | Role | Color | HSL |
|---|---|---|---|
| ARIA | Inbound calls | brand-teal | 190 60% 55% |
| NOVA | Outbound campaigns | brand-lavender | 260 50% 65% |
| LUMI | Scheduling | brand-emerald | 160 50% 48% |
| BYTE | Analytics | brand-amber | 35 70% 58% |
| CARE | Follow-up/support | brand-rose | 340 55% 60% |

### Key Team Member Referenced
- "Guillermo" (mentioned in testimonials and case studies footer as campaign manager)

---

*End of extraction. 23 sections. All user-visible text extracted from 22 source files.*
