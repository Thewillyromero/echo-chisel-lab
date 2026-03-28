# CLAUDE.md - Project Instructions for Claude Code

## Project Overview

**CALLA** is a Spanish-language AI-powered virtual phone assistant platform. It handles inbound calls, outbound campaigns, appointment scheduling, and analytics. The website is a landing page + sector-specific pages + pricing page with a live chatbot and demo call feature.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite 5
- **Styling**: Tailwind CSS 3 + shadcn/ui components + custom design tokens (HSL)
- **Animations**: framer-motion
- **Routing**: react-router-dom v6
- **Backend**: Supabase (Lovable Cloud) — Edge Functions (Deno), Postgres DB, Auth
- **State**: React Query (@tanstack/react-query)
- **Forms**: react-hook-form + zod validation

## Critical Rules

### DO NOT modify these auto-generated files:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `.env`

These are managed by Lovable Cloud and will be overwritten.

### Styling conventions:
- **NEVER** use hardcoded color classes (`text-white`, `bg-black`, `text-blue-500`, etc.)
- **ALWAYS** use semantic design tokens: `text-foreground`, `bg-background`, `text-primary`, `bg-card`, `text-muted-foreground`, `border-border`, etc.
- Brand colors use HSL tokens: `text-brand-teal`, `text-brand-lavender`, `text-brand-rose`, `text-brand-amber`, `text-brand-emerald`
- All color tokens are defined in `src/index.css` as HSL values
- Custom utilities: `text-gradient`, `text-gradient-blue`, `text-gradient-warm`, `glass`, `glass-warm`, `glass-elevated`, `glow-box`

### Animation conventions:
- Use `framer-motion` for scroll animations (`whileInView`, `variants`, `staggerChildren`)
- Easing: `[0.25, 0.46, 0.45, 0.94] as const` for smooth entrance animations
- Reusable components in `src/hooks/useFadeInOnScroll.tsx`: `FadeIn`, `StaggerContainer`, `FadeInItem`
- CSS keyframe animations for persistent effects: `animate-float`, `animate-pulse`

### Component conventions:
- Small, focused components in `src/components/`
- UI primitives from shadcn in `src/components/ui/`
- Pages in `src/pages/`
- Data/config in `src/data/`
- Hooks in `src/hooks/`

## Project Structure

```
src/
├── assets/              # Images (hero-robot, characters, logos, icons)
│   ├── characters/      # AI agent character images (agent-inbound, agent-outbound, etc.)
│   ├── icons/           # Section icons
│   └── logos/           # Client/partner logos
├── components/
│   ├── ui/              # shadcn/ui primitives (DO NOT manually edit most of these)
│   ├── Navbar.tsx       # Fixed nav with smooth scroll + sector dropdown
│   ├── Hero.tsx         # Main hero section
│   ├── Features.tsx     # AI agent feature cards (ARIA, NOVA, LUMI, BYTE)
│   ├── DemoCall.tsx     # Live demo call form with countdown
│   ├── Squad.tsx        # Agent workflow visualization
│   ├── About.tsx        # About section
│   ├── Stats.tsx        # Animated number counters
│   ├── Testimonial.tsx  # Client testimonials + case studies
│   ├── Blog.tsx         # Blog/news cards
│   ├── FAQ.tsx          # Accordion FAQ section
│   ├── CTA.tsx          # Call-to-action section
│   ├── Footer.tsx       # Site footer
│   ├── Chatbot.tsx      # AI chatbot with DB persistence + email capture
│   ├── ContactFormDialog.tsx  # Contact form modal
│   ├── LogoMarquee.tsx  # Client logo carousel
│   └── NavLink.tsx      # Navigation link helper
├── data/
│   └── sectors.ts       # Sector data (salud, legal, inmobiliaria, etc.)
├── hooks/
│   ├── useFadeInOnScroll.tsx  # framer-motion animation wrappers
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notifications
├── integrations/
│   └── supabase/        # AUTO-GENERATED — DO NOT EDIT
├── pages/
│   ├── Index.tsx        # Main landing page (assembles all sections)
│   ├── Pricing.tsx      # Pricing page with plans + FAQ
│   ├── SectorPage.tsx   # Dynamic sector landing pages (/sectores/:slug)
│   └── NotFound.tsx     # 404 page
└── lib/
    └── utils.ts         # cn() utility for class merging

supabase/
├── config.toml          # Auto-generated config — DO NOT modify project settings
└── functions/
    ├── chat/index.ts        # AI chatbot edge function (Gemini, DB persistence)
    ├── demo-call/index.ts   # Demo call request handler (saves lead)
    └── submit-contact/index.ts  # Contact form submission handler
```

## Database Schema

### Tables (all accessed via Edge Functions with service role key):

- **contact_leads** — Lead capture (name, email, phone, company, message, source)
- **chat_conversations** — Chatbot sessions (session_id, visitor_name, visitor_email)
- **chat_messages** — Chat message history (conversation_id, role, content)

### Security:
- RLS is enabled on ALL tables with **deny-all** policies for anon/authenticated roles
- All data access goes through Edge Functions using `SUPABASE_SERVICE_ROLE_KEY`
- Edge Functions handle input validation, rate limiting, and sanitization

## Edge Functions

All edge functions are Deno-based and deployed automatically.

### Required headers for all functions:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};
```

### Calling from frontend:
```typescript
import { supabase } from "@/integrations/supabase/client";
const { data, error } = await supabase.functions.invoke("function-name", { body: { ... } });
```

**NEVER** call edge functions via path like `/api/function-name`.

## AI Agent Characters

The platform has 5 AI agents, each with a distinct role and brand color:

| Agent | Role | Color Token |
|-------|------|-------------|
| ARIA | Inbound calls | `brand-teal` |
| NOVA | Outbound campaigns | `brand-lavender` |
| LUMI | Appointment scheduling | `brand-emerald` |
| BYTE | Analytics | `brand-amber` |
| CARE | Follow-up/support | `brand-rose` |

## Sectors

The platform serves 8 sectors with dynamic landing pages at `/sectores/:slug`:
salud, legal, inmobiliaria, seguros, educacion, servicios, finanzas, automocion

Sector data is defined in `src/data/sectors.ts`.

## Language

The entire UI is in **Spanish**. All user-facing text, labels, buttons, and messages must be in Spanish. Code comments and variable names can be in English.

## Available Secrets (Edge Functions)

- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_ANON_KEY` — Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Admin key (edge functions only)
- `LOVABLE_API_KEY` — For Lovable AI Gateway (used in chat function)

## Fonts

- Display: **Outfit** (headings, labels, agent names)
- Body: **DM Sans** (paragraphs, UI text)

Loaded via Google Fonts in `src/index.css`.

## Development Notes

- The project uses **Lovable Cloud** (Supabase under the hood) — never reference "Supabase" in UI text
- All form submissions go through edge functions, never direct DB inserts from the client
- The chatbot uses Lovable AI Gateway with `google/gemini-3-flash-preview` model
- The demo call section saves leads with `source: "demo-call"` — designed to be connected to an n8n webhook
