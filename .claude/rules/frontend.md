---
paths:
  - "src/app/page.tsx"
  - "src/app/layout.tsx"
  - "src/app/globals.css"
  - "src/app/apply/**"
  - "src/components/**"
  - "src/config/**"
  - "public/**"
---

# Frontend (student-facing site) — Harshavi

Phone-first rules in `CLAUDE.md` come first. Everything here must work at 360px width.

## Pages

| Route | Contents |
|-------|----------|
| `/` | E-Cell logo, headline "1st Year Recruitment Form", dates (placeholder `XX – XX` from `src/config/site.ts`), then 5 domain cards, each with a short description |
| `/apply/[domain]` | That domain's form: common fields + domain-specific fields from `src/config/domains.ts` |
| `/apply/success` | Confirmation after a successful submit |

An unknown `[domain]` in the URL shows a "not found" page, not a broken form.

## Theme

- Mostly black and white, with a different accent color per domain. Harshavi decides the final colors when she starts; they live in `src/config/domains.ts`.
- Professional but not plain: subtle motion (cards fading in on scroll, press feedback on tap). Hover effects are only extras for laptops.
- Logo goes in `public/ecell-logo.png` (pending).

## Domain cards

- One card per domain, in the domain's accent color, with name and short description.
- On phones, cards stack in a single column; the whole card is the tap target.
- Tapping a card opens `/apply/[domain]`.

## Form behavior

- The form is built from `src/config/domains.ts` + the shared Zod schema in `src/lib/schema.ts`. Don't hard-code a separate form per domain.
- 1st preference shows as locked. The 2nd preference dropdown hides the 1st; the 3rd hides both.
- "Other" branch reveals a required text box.
- Errors show inline under each field, in plain words.
- Check the resume's type and size in the browser before uploading, and show the 2 MB message right away.
- While submitting: disable the button, show progress, and prevent double submits.
- "Already applied" response: show a friendly message, not a raw error.

## Working before the backend exists

Use a **mock submit** (a fake function that waits a second and returns success) so the UI can be built and tested without Supabase.
Replace it with a real call to `POST /api/submit` once Rishi's endpoint is ready. Agree on the request/response shape first.

## Out of scope for this area

Supabase, `src/app/api/**`, `src/lib/supabase-server.ts`, and everything under `admin` belong to Rishi. Raise changes there instead of making them.
