---
paths:
  - "src/app/admin/**"
  - "src/app/api/admin/**"
  - "src/components/admin/**"
  - "src/lib/auth.ts"
---

# Admin dashboard — Rishi (final phase)

Built after the student form is live. Shared with E-Cell members through one link and one password.

## Pages

| Route | Contents |
|-------|----------|
| `/admin/login` | Password box |
| `/admin` | Total applications + count per domain, by 1st preference |
| `/admin/[domain]` | Students whose 1st preference is that domain |
| `/admin/applicant/[id]` | One student's full details + "Open resume" button |

## Password lock

- `ADMIN_PASSWORD` is an environment variable (Vercel + `.env.local`). Never in the code.
- `/admin/login` checks the password **on the server**, then sets an httpOnly, signed session cookie (signed with `SESSION_SECRET`, valid e.g. 7 days).
- Every admin page and admin API route checks that cookie **on the server**. No valid cookie → redirect to `/admin/login`.
- Admin data is fetched server-side with the service role key. It is never exposed in page code that a non-admin can load.
- Change the password after recruitment ends (it will sit in the E-Cell group chat).

## UI

- Phone-first like the rest of the site; most members will check it on their phones.
- Domain count cards reuse each domain's accent color from `src/config/domains.ts`.
- Applicant list: name, branch, 2nd/3rd preference, submitted time. Searchable by name or email.
- Detail view shows every field, including domain-specific answers, and opens the resume through a fresh signed URL.
