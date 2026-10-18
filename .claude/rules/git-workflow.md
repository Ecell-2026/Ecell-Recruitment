# Git workflow

Two people push to one repo. These rules keep their work from colliding.
Both developers are new to git: when you run or suggest a git command, say in one line what it does.

## Rules

- `main` is the version Vercel deploys. Never commit or push directly to `main`.
- Each piece of work gets its own branch, named `<person>/<what>`, e.g. `harshavi/home-page`, `rishi/submit-api`.
- Work reaches `main` only through a pull request on GitHub. The other person takes a quick look before merging.
- Never force-push (`git push --force`) and never rewrite history on a shared branch.
- Never commit `.env.local` or any file with keys or passwords. Check `git status` before committing.
- Commit small and often, with a message saying what changed, e.g. `Add domain cards to home page`.

## Daily flow

```bash
git checkout main            # switch to the main version
git pull                     # download the latest changes from GitHub
git checkout -b harshavi/home-page   # make a new branch for today's work
# ...make changes...
git status                   # see what changed (check no secrets are listed)
git add .                    # stage the changes
git commit -m "Add domain cards to home page"   # save a snapshot
git push -u origin harshavi/home-page           # upload the branch to GitHub
```

Then open a pull request on GitHub from that branch into `main`.

## If main moved while you were working

```bash
git pull origin main         # bring the latest main into your branch
```

If git reports a **merge conflict**, stop. Show the conflicting files, explain what each side changed, and ask before choosing.
Conflicts in shared files (`src/lib/schema.ts`, `src/config/*`, `CLAUDE.md`, `.claude/rules/*`) need both people to agree.
