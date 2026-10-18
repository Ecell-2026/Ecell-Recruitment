# Form fields and data shape

This is the shared contract between frontend and backend. Change it only after both agree.

## Domains

Slugs: `events`, `technical`, `design`, `media`, `publicity`

Each domain in `src/config/domains.ts` has a display name, short description (TBD), accent color (TBD, Harshavi), and extra fields (TBD).
Adding a field to a domain means editing that config entry, not building a new page.

## Common fields (all compulsory, every domain)

| Field | Rule |
|-------|------|
| Name | Required, trimmed |
| Mobile number | 10 digits, starts with 6–9 |
| RBU email | Starts with `26`, ends with `@rbunagpur.in` (e.g. `26sharmarr@rbunagpur.in`). Case-insensitive; store lowercase |
| Branch | Dropdown (list below). If "Other", show a required text box |
| 1st preference | Locked to the domain the student clicked. Shown but not editable |
| 2nd preference | Required. The other 4 domains |
| 3rd preference | Required. Excludes the 1st and 2nd |
| Resume | Required. PDF, PNG or JPEG. Max 2 MB |

## Branch list

CSE, IT, ECS, Electronics & Communication, Electronics (Biomedical), Electrical (AI & Applications), Mechanical, Robotics & AI, Civil, BBA / BCA, Other

Kept in `src/config/site.ts`.

## Domain-specific fields

TBD — added to `src/config/domains.ts` when received.

## Rules

- One application per email, enforced by a unique constraint in the database. A repeat attempt shows "You've already applied", not an error.
- All validation lives in one Zod schema in `src/lib/schema.ts` and runs in both the browser and the server.
- Resume over 2 MB: show a clear message ("File is over 2 MB — please upload a PDF or a smaller image"). Whether to auto-shrink images is an open decision (see `docs/plan.md`); don't build it unless asked.

## Database table: `applications`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | Primary key, auto-generated |
| `created_at` | timestamptz | Default `now()` |
| `name` | text | |
| `phone` | text | |
| `email` | text | Unique, lowercase |
| `branch` | text | |
| `branch_other` | text, nullable | Only when branch = Other |
| `pref_1` | text | Domain slug |
| `pref_2` | text | Domain slug |
| `pref_3` | text | Domain slug |
| `resume_path` | text | Path inside the storage bucket |
| `domain_answers` | jsonb | Domain-specific answers, so new questions need no schema change |

Database checks: `pref_1`, `pref_2` and `pref_3` must all differ and be valid domain slugs.
