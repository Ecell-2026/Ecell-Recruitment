# Submit contract: `POST /api/submit`

Written by Harshavi's side (the form) for Rishi. This is what the form sends and what it expects back.
`.claude/rules/backend.md` asks for this to be written down; fold it in there once you both agree.

Until the endpoint exists, the form uses a mock in `src/components/apply/submit-application.ts`.
When `/api/submit` is ready, Harshavi swaps that function's body for a real `fetch`.

## Request

`multipart/form-data` (a file can't go inside plain JSON). All fields are strings except `resume`.

| Field | Meaning | Maps to column |
|-------|---------|----------------|
| `name` | Full name | `name` |
| `phone` | 10 digits | `phone` |
| `email` | RBU email | `email` (store lowercase) |
| `branch` | One of the list in `src/config/site.ts` | `branch` |
| `branchOther` | Only meaningful when `branch` is `Other` | `branch_other` |
| `pref1` | Domain slug the student clicked | `pref_1` |
| `pref2` | Domain slug | `pref_2` |
| `pref3` | Domain slug | `pref_3` |
| `resume` | The file (PDF, PNG or JPEG, max 2 MB) | `resume_path` (after upload) |
| `domainAnswers` | JSON string of `{ questionId: answer }`. Empty/missing for now | `domain_answers` |

## What the server should do

1. Turn the `FormData` into an object and run `applicationSchema.safeParse(...)` from `src/lib/schema.ts`. It is the same schema the browser uses. `resume` must be a `File` (Node 20+ has the global `File`).
2. If valid, `data.email` is already trimmed and lowercased.
3. Save `branch_other` only when `branch` is `Other`; otherwise store `null`.
4. Then follow the flow in `backend.md`: duplicate check, upload, insert, cleanup if the insert fails.

## Response

JSON, always in this shape:

| Case | HTTP status | Body |
|------|-------------|------|
| Saved | 200 | `{ "ok": true }` |
| Email already used | 409 | `{ "ok": false, "error": "already_applied" }` |
| Failed validation | 400 | `{ "ok": false, "error": "invalid" }` |
| Anything else (database, storage...) | 500 | `{ "ok": false, "error": "server" }` |

The form shows a friendly message for each `error` value and redirects to `/apply/success` on `ok: true`.
If you want to add another error value, tell Harshavi so the form can show a message for it.
