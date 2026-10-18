# E-Cell RBU — 1st Year Recruitment Form

First-year RBU students pick an E-Cell domain, fill that domain's form, and upload a resume.
E-Cell members review applications on a password-protected admin dashboard. Expected volume: ~200 applications.

## Team

| Person   | Owns |
|----------|------|
| Harshavi | Student-facing site: home page, domain cards, form screens, success page, theme |
| Rishi    | Supabase, database, security, resume storage, submit logic, and the admin dashboard (lock + UI + data), built in the final phase |

Shared (change only after both agree): `src/lib/schema.ts`, `src/config/*`, `CLAUDE.md`, `.claude/rules/*`.

## How Claude should work in this repo

- Both developers are beginners. Explain what you're doing at each step in plain language.
- Ask clarifying questions before writing large chunks of code.
- Don't assume familiarity with git, the terminal or dev workflows. Give exact commands and say what each one does.
- Stay inside the current person's area (see the table above). If a change is needed in the other person's area or a shared file, say so and stop.
- Never commit secrets. Keys and passwords go in `.env.local` only.
- If a decision in these files changes, update the file in the same pull request.

## Phone-first (most important rule)

Most students will open this on a phone, often on mobile data. Every screen is designed for phones first.

- Design at 360px width first, then scale up for tablet and laptop.
- Tap targets at least 44px tall. Inputs and buttons span the full width on phones.
- Use the right keyboard: `type="tel"` + `inputMode="numeric"` for mobile number, `type="email"` for email.
- **No hover-only interactions.** Phones have no hover. Use press/tap feedback and scroll-in animations; hover effects are extras for laptops only.
- Keep it light: compressed images, at most two font families, no heavy libraries for small effects.
- The resume upload button must work with the phone's file picker and gallery.
- Test on a real Android phone in Chrome before calling a screen done.

## Tech stack

Next.js (App Router) + TypeScript · Tailwind CSS · shadcn/ui · Motion (formerly Framer Motion) ·
React Hook Form + Zod · Supabase (database + storage, free tier) · Vercel · GitHub

## Folder layout

```
src/
  app/
    page.tsx                  home
    apply/[domain]/page.tsx   form
    apply/success/page.tsx
    admin/...                 admin dashboard (Rishi, final phase)
    api/submit/route.ts       submit endpoint (Rishi)
    api/admin/...             admin endpoints (Rishi)
  components/                 UI pieces (admin ones in components/admin/)
  config/domains.ts           domains: name, description, accent color, extra fields
  config/site.ts              dates, branch list
  lib/schema.ts               shared Zod validation
  lib/supabase-server.ts      server-only Supabase client
  lib/auth.ts                 admin cookie helpers
public/ecell-logo.png         pending
```

## Where the details live

These rule files load automatically. The path-scoped ones load only when Claude works on matching files.

| File | Covers | Loads |
|------|--------|-------|
| `.claude/rules/form-and-data.md` | Domains, form fields, validation, branch list, database shape | Always |
| `.claude/rules/git-workflow.md` | Branches and pull requests | Always |
| `.claude/rules/frontend.md` | Student-facing pages, theme, form UX | When working on UI files |
| `.claude/rules/backend.md` | Supabase, security, storage, submit flow, env vars | When working in `api/`, `lib/`, `supabase/` |
| `.claude/rules/admin.md` | Admin password lock and dashboard | When working on admin files |
| `docs/plan.md` | Build phases, risks, open decisions, pending inputs | Read on request; for humans |
