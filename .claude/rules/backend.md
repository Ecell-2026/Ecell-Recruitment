---
paths:
  - "src/app/api/**"
  - "src/lib/**"
  - "supabase/**"
---

# Backend — Rishi

## Security (most important backend task)

- Row Level Security **on** for `applications`. No public read, no public write.
- All reads and writes go through Next.js server code using the Supabase **service role key**.
- The service role key lives only in server environment variables. Never import it into a client component and never prefix it with `NEXT_PUBLIC_`.
- `src/lib/supabase-server.ts` is server-only; it must never be imported by a file marked `"use client"`.
- Resumes are viewed only through short-lived signed URLs (around 10 minutes), generated server-side for logged-in admins.

## Storage

- Private bucket `resumes`.
- Bucket-level limits: 2 MB max, MIME types `application/pdf`, `image/png`, `image/jpeg`.
- File name: `{application_id}.{ext}`. Never use the student's name in the path.

## Submit flow (`POST /api/submit`)

1. Validate the whole form with the shared Zod schema from `src/lib/schema.ts`.
2. Check the file type and size again on the server.
3. Check whether the email already exists. If so, return an "already applied" response.
4. Upload the resume to the bucket.
5. Insert the row. If the insert fails, delete the uploaded file.
6. Return success. The frontend then redirects to `/apply/success`.

Keep the 2 MB cap; it also keeps uploads well under Vercel's request size limit for server functions.
Agree on the exact request and response shape with Harshavi before building, and write it down here.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=     # server only
ADMIN_PASSWORD=                # server only
SESSION_SECRET=                # server only, for signing the admin cookie
```

Set them in `.env.local` for local work and in Vercel's project settings for the live site. Never commit them.

## Supabase free tier

The project pauses after a week with no activity. Check it's awake before launch and while the form is open.
