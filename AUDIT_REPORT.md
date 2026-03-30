# CALLA Web Project - Comprehensive Audit Report

**Generated:** 2026-03-26
**Project:** echo-chisel-lab (CALLA landing page)
**Stack:** React 18 + TypeScript + Vite 5 + Tailwind CSS + Framer Motion

---

## 1. Component Map

The Index page (`src/pages/Index.tsx`) renders components in this exact order, all wrapped in `<LiveMetricsProvider>`:

| # | Component | File | Section ID | Notes |
|---|-----------|------|------------|-------|
| 1 | Navbar | `src/components/Navbar.tsx` | (fixed) | Fixed nav, receives `onContact` |
| 2 | Hero | `src/components/Hero.tsx` | (none) | No `id` attribute on section |
| 3 | SocialProof | `src/components/SocialProof.tsx` | (none) | Clickable, scrolls to `#testimonials` |
| 4 | LogoMarquee | `src/components/LogoMarquee.tsx` | (none) | No section ID |
| 5 | Features | `src/components/Features.tsx` | `#features` | Agent cards (ARIA, NOVA, LUMI, BYTE) |
| 6 | DemoCall | `src/components/DemoCall.tsx` | `#demo` | Live VAPI web call |
| 7 | ROICalculator | `src/components/ROICalculator.tsx` | `#calculadora` | Receives `onContact` |
| 8 | CallPlayer | `src/components/CallPlayer.tsx` | (none) | No section ID |
| 9 | CampaignResults | `src/components/CampaignResults.tsx` | `#resultados` | Dashboard mockup |
| 10 | Squad | `src/components/Squad.tsx` | `#squad` | Agent workflow |
| 11 | About | `src/components/About.tsx` | `#about` | About section |
| 12 | Stats | `src/components/Stats.tsx` | `#stats` | Animated counters |
| 13 | Testimonial | `src/components/Testimonial.tsx` | `#testimonials` | Testimonials + case studies |
| 14 | FAQ | `src/components/FAQ.tsx` | `#faq` | Accordion |
| 15 | CTA | `src/components/CTA.tsx` | (none) | Receives `onContact` |
| 16 | Footer | `src/components/Footer.tsx` | (none) | Site footer |
| 17 | ContactFormDialog | `src/components/ContactFormDialog.tsx` | (modal) | Dialog, receives `open` state |
| 18 | FOMONotifications | `src/components/FOMONotifications.tsx` | (fixed) | Bottom-left toast notifications |
| 19 | LiveViewers | `src/components/LiveViewers.tsx` | (fixed) | Bottom bar with viewer count |

**Note:** The `Blog` component is imported as `Blog.tsx` but is NOT rendered in `Index.tsx`, even though the Navbar links to `#blog`. This is a **broken link**.

---

## 2. Testimonials Analysis

### Count
- **21 testimonials** total in the `testimonials` array
- First 6 displayed by default ("rompe-objeciones" block), remaining 15 shown on expand
- **9 case studies** always visible below testimonials

### Testimonial Details

| # | Name | Role/Company | Avatar File | Expected Gender | Avatar Gender Match |
|---|------|-------------|-------------|-----------------|-------------------|
| 1 | Dr. Sergio Lopez | Director, Clinica Dental Lopez | `sergio-lopez.webp` | Male | OK |
| 2 | Elena Garcia | Directora, Inmobiliaria Mediterraneo | `elena-garcia.webp` | Female | OK |
| 3 | Marta Jimenez | Socia Directora, Fernandez & Asociados | `marta-jimenez.webp` | Female | OK |
| 4 | Jorge Navarro | Propietario, Restaurante La Brasa | `jorge-navarro.webp` | Male | OK |
| 5 | Roberto Mendez | Propietario, Taller Mendez e Hijos | `roberto-mendez.webp` | Male | OK |
| 6 | Carlos Vega | Director Comercial, SolarTech | `carlos-vega.webp` | Male | OK |
| 7 | Patricia Ruiz | Gerente, Centro Medico Salud Plus | `patricia-ruiz.webp` | Female | OK |
| 8 | Tim Michael Bissonnette | CEO, Direct Public Funding | `tim-bissonnette.webp` | Male | OK |
| 9 | Miguel Santos | Director de Operaciones, Edommo | `miguel-santos.webp` | Male | OK |
| 10 | Dr. Laurence Fendrich | Fundador, Dental 101 | `laurence-fendrich.webp` | Male | OK |
| 11 | Carmen Ortega | Directora, Centro Estetica Carmen | `carmen-ortega.webp` | Female | OK |
| 12 | Francisco Torres | Director General, Metalicas Torres | `francisco-torres.webp` | Male | OK |
| 13 | David Martinez | Director Comercial, Instalaciones Martinez | `david-martinez.webp` | Male | OK |
| 14 | Carin Cowell | Marketing Manager, Reputation Loop | `carin-cowell.webp` | Female | OK |
| 15 | Ana Morales | Socia, Gestoria Morales | `ana-morales.webp` | Female | OK |
| 16 | Tim Virga | Director, Capify | `tim-virga.webp` | Male | OK |
| 17 | Alejandro Diaz | Psicologo clinico, Centro Equilibrio | `alejandro-diaz.webp` | Male | OK |
| 18 | Antonio Ruiz | Jefe de Operaciones, Climatizaciones Ruiz | `antonio-ruiz.webp` | Male | OK |
| 19 | Michael Torres | Propietario, Advanced Plumbing | `michael-torres.webp` | Male | OK |
| 20 | Sofia Herrero | Directora, Academia Herrero | `sofia-herrero.webp` | Female | OK |
| 21 | Director Regional | Franquiciado, Tutor Doctor | `director-td.webp` | N/A (anonymous) | OK (generic) |

### Gender Summary
- **Male names:** 13 (Sergio, Jorge, Roberto, Carlos, Tim B., Miguel, Laurence, Francisco, David, Tim V., Alejandro, Antonio, Michael)
- **Female names:** 7 (Elena, Marta, Patricia, Carmen, Carin, Ana, Sofia)
- **Anonymous:** 1 (Director Regional)
- **Gender mismatches:** None detected -- all avatar filenames match expected genders.

### Unused Avatar Files (on disk but NOT imported in Testimonial.tsx)
- `lucia-fernandez.webp` -- NOT used anywhere
- `manuel-reyes.webp` -- NOT used anywhere
- `pablo-herrera.webp` -- NOT used anywhere

### Repeated Names
- No duplicate testimonial names detected.

---

## 3. Social Proof Bar

**File:** `src/components/SocialProof.tsx`

### Reviews (6 total)

| # | Author | Role | Avatar Used | Avatar Gender Match |
|---|--------|------|-------------|-------------------|
| 1 | Maria L. | Clinica dental | `sergio-lopez.webp` | MISMATCH -- "Maria" is female, avatar is male (Sergio) |
| 2 | Javier R. | Inmobiliaria | `elena-garcia.webp` | MISMATCH -- "Javier" is male, avatar is female (Elena) |
| 3 | Dra. Carmen S. | Centro medico | `carmen-ortega.webp` | OK |
| 4 | Antonio G. | Taller mecanico | `roberto-mendez.webp` | OK (both male) |
| 5 | Laura M. | Energia solar | `marta-jimenez.webp` | OK (both female) |
| 6 | Pedro V. | Despacho legal | `jorge-navarro.webp` | OK (both male) |

### Ratings
- Header shows **4.9/5** with Trustpilot-style stars
- Each review card shows **5/5** stars (hardcoded)
- Claims "+200 opiniones" and "+200 empresas"

### Click Target
- The entire `<section>` has `onClick` that scrolls to `#testimonials` -- the section acts as one big clickable area.
- No cursor style explicitly set, but `cursor-pointer` is applied.

---

## 4. Buttons & Links Audit

### Legend
- OK = Working correctly (external link or valid section scroll)
- WARN = Works but has issues
- FAIL = Broken or problematic

### Hero.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Empezar ahora" button | `onContact()` | Opens BOOKING_URL in new tab | OK |
| "Ver demo" button | `scrollIntoView` | `#demo` | OK |

### Navbar.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Logo | `navigate("/")` + scroll top | Home | OK |
| "Servicios" | `scrollIntoView` | `#features` | OK |
| "Sectores" dropdown | `Link to="/sectores/:slug"` | Sector pages | OK |
| "Squad" | `scrollIntoView` | `#squad` | OK |
| "Resultados" | `scrollIntoView` | `#stats` | OK |
| "Blog" | `scrollIntoView` | `#blog` | FAIL -- No `#blog` section rendered in Index.tsx (Blog component is imported but not included in JSX) |
| "Precios" | `Link to="/precios"` | Pricing page | OK |
| "Iniciar sesion" | No `onClick` handler | Nothing | FAIL -- Button does nothing |
| "Empezar gratis" | `onContact()` | Opens BOOKING_URL | OK |

### Features.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Each feature card | `scrollIntoView` | `#demo` | OK |
| "Conocer mas" hover text | Visual only (parent card handles click) | `#demo` | OK |

### DemoCall.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Hablar con ARIA" submit | Supabase edge function + VAPI call | Starts web call | OK |
| Mute button | `toggleMute()` | Mutes mic | OK |
| End call button | `endCall()` | Stops call | OK |
| "Otra demo" button | `handleReset()` | Resets form | OK |
| "Agendar demo personalizada" | `window.open(CALENDAR_URL)` | Booking page | OK |
| Fallback timer (12s) | `window.open(CALENDAR_URL)` | Booking page | OK |

### ROICalculator.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Reservar consulta gratuita" | `window.open(CALENDAR_URL)` | Booking page | OK |

### Blog.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| All 3 blog cards | `scrollIntoView` | `#testimonials` | WARN -- Blog cards link to testimonials section instead of actual blog content. Misleading CTAs ("Ver publicaciones", "Ir al blog", "Ver noticias") all just scroll to testimonials. |

### SocialProof.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Entire section | `scrollIntoView` | `#testimonials` | OK |

### Testimonial.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Ver mas" / "Ver menos" button | `setExpanded()` | Toggles testimonials | OK |

### CTA.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Comenzar ahora" button | `onContact()` | Opens BOOKING_URL | OK |
| "Ver demo" button | `onContact()` | Opens BOOKING_URL | WARN -- Label says "Ver demo" but action opens booking URL, not demo section |

### About.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| "Conoce al equipo" button | No `onClick` handler | Nothing | FAIL -- Button does nothing |

### Footer.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Logo | `href="/"` | Home (but no `onClick` for SPA navigation) | WARN -- Full page reload, not SPA nav |
| "Servicios" | `href="#features"` | Anchor (not `scrollIntoView`) | WARN -- Will reload page if on sub-route |
| "Precios" | `Link to="/precios"` | Pricing | OK |
| "Squad" | `href="#squad"` | Anchor | WARN -- Same issue |
| "Resultados" | `href="#stats"` | Anchor | WARN -- Same issue |
| "Blog" | `href="#blog"` | `#blog` | FAIL -- Blog section not rendered |
| "Testimonios" | `href="#testimonials"` | Anchor | WARN -- Same issue |
| "Sobre nosotros" | `href="#about"` | Anchor | WARN -- Same issue |
| "Privacidad" | `scrollIntoView` | `#faq` | FAIL -- Links to FAQ instead of actual privacy policy |
| "Terminos" | `scrollIntoView` | `#faq` | FAIL -- Links to FAQ instead of actual terms page |
| "Contacto" | `href` to BOOKING_URL | External (new tab) | OK |

### CampaignResults.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Dashboard cards | `setActiveCard()` | Toggles active state | OK (UI only) |

### Pricing.tsx
| Element | Action | Target | Status |
|---------|--------|--------|--------|
| Plan CTA buttons | `window.open(BOOKING_URL)` | Booking page | OK |

---

## 5. Case Studies

**Count:** 9 case studies, always visible (not affected by expand/collapse).

| # | Company | Result | Metric |
|---|---------|--------|--------|
| 1 | Clinica Dental | $5,000 en ventas primera semana | 25 leads a $30/lead |
| 2 | Startup Medica | $400K en capital captado | Inversores a <$15/lead |
| 3 | Empresa de Fontaneria | $7,200 en ventas en 14 dias | Leads a $6, Citas a $26 |
| 4 | Empresa de Suelos | $18K en ventas el primer mes | Presupuestos a $10.53 |
| 5 | Agente Inmobiliario | $17-25 por lead cualificado | Evaluaciones agendadas |
| 6 | Agencia de Marketing | +$25K/mes en ingresos recurrentes | En solo 45 dias |
| 7 | Programa Formativo | $48K en ventas primera semana | Leads a <$3 |
| 8 | Empresa Solar | <$10/lead cualificados con cita | Citas a <$50 |
| 9 | Ecommerce Cosmetica | Sold out primer mes de campana | Leads a $7.12 |

**Note:** All case study `logo` fields are `null` -- no company logos displayed.

---

## 6. FOMO Notifications & Live Counters

### FOMONotifications.tsx

**Total messages in pool:** 48

| Type | Count | Icon |
|------|-------|------|
| `demo` | 17 | microphone |
| `booking` | 15 | calendar |
| `viewing` | 5 | people |
| `signup` | 10 | party |

**Missing type: `result`** -- There is no "result" type in the pool. Only demo, booking, viewing, and signup types exist.

**Timing:**
- First notification appears after 8 seconds
- Subsequent notifications: random 20-26 seconds apart
- Each notification visible for 3.5 seconds
- Auto-stops after 3 dismissals by user

**Viewing messages** use `{n}` placeholder replaced with `viewers` count from `LiveMetricsContext`.

### LiveViewers.tsx

- Uses `useLiveMetricsContext` -- YES, properly connected
- Displays `viewers` (people on web) and `testCount` (tests with ARIA this month)
- Fixed to bottom of viewport (`fixed bottom-0`)

### DemoCall.tsx Counter Sync

- Also uses `useLiveMetricsContext` for `testCount` and `viewers`
- Calls `incrementTest()` on successful call start
- All three consumers (LiveViewers, DemoCall, FOMONotifications) share the same context -- counters are **synced**.

### useLiveMetrics Hook

- `testCount` base: deterministic formula based on day + hour (~16/day, ~0.7/hour). Auto-increments every 18-25 seconds.
- `viewers`: pseudo-random 6-18, changes every 30 seconds (deterministic seed from timestamp).
- Values are **fake/simulated** -- not connected to any real analytics.

---

## 7. Images & Assets

### Total Assets Size: **21 MB**

| Directory | Size | File Count | Format |
|-----------|------|------------|--------|
| `src/assets/characters/` | 16 MB | 48 files | .webp |
| `src/assets/logos/` | 1.9 MB | 76 files | .webp, .png, .jpg mixed |
| `src/assets/logos-new/` | 512 KB | 39 files | .webp |
| `src/assets/avatars/` | 96 KB | 24 files | .webp |
| `src/assets/` (root) | ~86 KB | 2 files | hero-robot.webp (58K), hero-bg.webp (28K) |

### Character Images (Top 5 by size)
| File | Size |
|------|------|
| lumi-writing.webp | 60 KB |
| byte-magnifying.webp | 59 KB |
| agent-inbound.webp | 56 KB |
| agent-analytics.webp | 55 KB |
| agent-outbound.webp | 52 KB |

### Avatar Files
- 24 avatar files on disk
- 21 imported in Testimonial.tsx
- **3 unused avatars:** `lucia-fernandez.webp`, `manuel-reyes.webp`, `pablo-herrera.webp`

### Logo Files
- `logos/`: 76 files -- contains duplicate formats (same logo as .png, .jpg, AND .webp)
- `logos-new/`: 39 files -- all .webp, clean naming
- `logo-p2-26.webp` is **missing** from `logos-new/` (sequence goes 25, 27, 28...)
- LogoMarquee imports 28 original logos + 39 new logos = **67 logos** total, doubled for infinite scroll = 134 rendered `<img>` elements

### Fonts
- No `public/fonts/` directory -- fonts loaded via Google Fonts CDN (Outfit + DM Sans)

---

## 8. Navbar Analysis

### Desktop Navigation Links

| Label | Target | Type | Status |
|-------|--------|------|--------|
| CALLA logo | `/` (home + scroll top) | SPA navigate | OK |
| Servicios | `#features` | Smooth scroll | OK |
| Sectores (dropdown) | `/sectores/:slug` | SPA Link | OK (8 sectors) |
| Squad | `#squad` | Smooth scroll | OK |
| Resultados | `#stats` | Smooth scroll | OK |
| Blog | `#blog` | Smooth scroll | FAIL -- target section not rendered |
| Precios | `/precios` | SPA Link | OK |
| Iniciar sesion | (none) | Ghost button | FAIL -- no handler |
| Empezar gratis | BOOKING_URL | External (new tab) | OK |

### Mobile Navigation
- Identical links in hamburger menu
- Sectors sub-menu expands inline
- "Empezar gratis" button at bottom
- Same broken "Blog" and "Iniciar sesion" issues

### Cross-page Navigation
- `scrollToSection()` helper handles navigation from sub-pages: navigates to `/` first, then scrolls after 400ms delay. This is a reasonable approach.

---

## 9. Problems Detected

### CRITICAL

1. **Blog section not rendered** -- `Blog.tsx` is imported in `Index.tsx` but NOT included in the JSX. The Navbar, Footer, and mobile nav all link to `#blog`, which does not exist on the page. Users clicking "Blog" see nothing happen.

2. **"Iniciar sesion" button does nothing** -- The ghost button in the Navbar has no `onClick` handler and no `href`. It is purely decorative but suggests login functionality exists.

3. **"Conoce al equipo" button does nothing** -- In `About.tsx`, the CTA button has no `onClick` or link. Dead end for users.

4. **SocialProof avatar-name gender mismatches** -- In `SocialProof.tsx`:
   - "Maria L." uses `sergio-lopez.webp` (male avatar for female name)
   - "Javier R." uses `elena-garcia.webp` (female avatar for male name)

5. **Footer "Privacidad" and "Terminos" are fake** -- Both links scroll to the FAQ section instead of actual legal pages. This could be a legal compliance issue (GDPR/LOPDGDD in Spain requires actual privacy policy).

### HIGH

6. **ContactFormDialog is dead code** -- `contactOpen` is set to `false` and `setContactOpen` is never called. The `openContact` function in `Index.tsx` was changed to `window.open(BOOKING_URL)` and no longer opens the dialog. The entire ContactFormDialog component, its state, and the Supabase `submit-contact` edge function are unused.

7. **Blog cards are misleading** -- All 3 Blog cards ("Ver publicaciones", "Ir al blog", "Ver noticias") scroll to `#testimonials` instead of actual blog content. The CTAs promise content that does not exist.

8. **CTA "Ver demo" button opens booking URL** -- Label says "Ver demo" but `onClick` calls `onContact()` which opens the external booking page, not the demo section.

9. **3 unused avatar files** consuming disk space:
   - `lucia-fernandez.webp` (1.8 KB)
   - `manuel-reyes.webp` (2.0 KB)
   - `pablo-herrera.webp` (1.3 KB)

### MEDIUM

10. **Logo directory contains duplicate formats** -- `src/assets/logos/` has the same logos in .png, .jpg, AND .webp formats (76 files for ~28 unique logos). Only .webp versions are imported. The .png and .jpg duplicates waste ~1 MB.

11. **Missing logo-p2-26.webp** -- The `logos-new/` sequence skips from 25 to 27. Either the file is missing or was intentionally excluded, but the gap is suspicious.

12. **Footer links use `href` anchors instead of SPA navigation** -- Links like "Servicios" (`href="#features"`) will cause full page reloads when clicked from sub-routes like `/precios` or `/sectores/*`. The Navbar correctly uses `scrollToSection()` but the Footer does not.

13. **All FOMO/viewer data is simulated** -- `testCount` and `viewers` are generated from deterministic formulas, not real data. While this is common for landing pages, the UI presents these as real-time metrics ("X personas en la web ahora", "X tests con ARIA este mes").

14. **CallPlayer audio is placeholder** -- All 3 call sample cards show "Proximamente" badge. The section header claims "Escucha llamadas reales" and "Sin filtros, sin edicion" but no actual audio playback exists.

15. **VAPI public key and assistant ID exposed in client code** -- `DemoCall.tsx` contains `VAPI_PUBLIC_KEY` and `ASSISTANT_ID` as hardcoded constants. While VAPI keys are designed to be public, these should ideally be in environment variables for easier rotation.

### LOW

16. **TrustpilotStar component is duplicated** -- Both `Testimonial.tsx` and `SocialProof.tsx` define their own `TrustpilotStar` and `TrustpilotStars` components with nearly identical code. Should be extracted to a shared component.

17. **No `id` on Hero section** -- The Hero section has no `id` attribute. While not linked from navigation, this could be useful for analytics or deep linking.

18. **134 logo images rendered in DOM** -- LogoMarquee renders the full logo array twice (67 x 2 = 134 `<img>` elements). All use `loading="lazy"` which helps, but the DOM is still heavy.

19. **Character images total 16 MB** -- While individually optimized (30-60 KB each), the 48 character images total 16 MB. Many are only used as background decorations at very low opacity (0.12).

20. **`CALENDAR_URL` / `BOOKING_URL` defined in 3 separate files** -- The same LeadConnector booking URL is hardcoded in `Index.tsx`, `DemoCall.tsx`, and `ROICalculator.tsx` (and `Footer.tsx` as a raw string). Should be a single shared constant.

---

## Summary

| Category | Issues |
|----------|--------|
| Critical | 5 |
| High | 4 |
| Medium | 6 |
| Low | 5 |
| **Total** | **20** |

The most impactful issues to fix first:
1. Add the Blog component back to the page JSX (or remove all `#blog` links)
2. Fix the 2 gender-mismatched avatars in SocialProof
3. Add actual Privacy Policy and Terms pages (legal compliance)
4. Wire up or remove the "Iniciar sesion" and "Conoce al equipo" dead buttons
5. Remove or repurpose the unused ContactFormDialog code path
