# Project plan

For Harshavi and Rishi. Claude reads this only when asked.

## Build phases

1. **Setup** — Create the GitHub repo and Next.js project, create the Supabase project, add `CLAUDE.md`, `.claude/rules/`, `docs/` and `.gitignore`. Both clone the repo.
2. **Parallel work**
   - Harshavi: home page, domain cards and form UI, using a mock submit.
   - Rishi: database table, storage bucket, security rules, `POST /api/submit`.
3. **Connect** — Agree on the request/response shape, then swap the mock submit for the real endpoint.
4. **Test** — Run the checklist below on real phones.
5. **Launch** — Deploy on Vercel, fill in the real dates, share the link.
6. **Admin dashboard** (Rishi) — Password lock, counts per domain, applicant lists, detail view with resume.

## Test checklist

- [ ] Email not starting with `26` or not ending in `@rbunagpur.in` is rejected
- [ ] Same email twice → "You've already applied"
- [ ] Resume over 2 MB is rejected with a clear message
- [ ] Wrong file type (e.g. .docx) is rejected
- [ ] Same domain can't be picked twice across the preferences
- [ ] "Other" branch requires the text box
- [ ] Every page works at 360px width on a real Android phone
- [ ] Double-tapping submit creates only one application
- [ ] Admin pages redirect to the login without the password
- [ ] Resume links stop working after they expire

## Open decisions

- **Auto-shrink phone photos.** Phone camera photos are often over 2 MB, so a student photographing their resume would be rejected. Option: shrink images in the browser before upload (PDFs can't be shrunk this way). Not decided; don't build until agreed.
- **Auto-close after the deadline.** Should the form stop accepting submissions after the end date automatically?

## Known risks

- **Supabase free tier pauses after 1 week of inactivity.** Check the project is awake before launch and while the form is open.
- **Free-tier file storage limit** is reported as 1 GB, though some sources say 500 MB. Check the Supabase dashboard. 200 × 2 MB = 400 MB worst case, which fits either way.
- **Shared admin password** can be forwarded. Change it after recruitment.

## Pending inputs

- [x] E-Cell logo file (`public/ecell-logo.png`)
- [ ] Domain descriptions
- [ ] Domain-specific fields for each domain
- [ ] Real open/close dates
- [ ] Final accent colors (Harshavi)
