# Issue tracker: GitHub

Issues for this repo live as GitHub issues on `LittleBigCode/design-system`. Use the `gh` CLI
for all operations. Infer the repo from `git remote -v` — `gh` does this automatically when run
inside a clone.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body-file body.md`. Write multi-line
  bodies to a file first — heredocs inside `--body` mangle backticks and `#` references.
- **Read an issue**: `gh issue view <number> --comments`
- **List issues**: `gh issue list --state open --json number,title,body,labels --jq '[.[] | {number, title, labels: [.labels[].name]}]'`
- **Comment**: `gh issue comment <number> --body-file comment.md`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

When a skill says "publish to the issue tracker", create a GitHub issue here.
When a skill says "fetch the relevant ticket", run `gh issue view <number> --comments`.

## Sub-issues and blocking

Parent/child uses GitHub's native sub-issues endpoint. Note `-F`, not `-f` — `gh` sends `-f`
values as strings and the endpoint rejects a stringified id:

```bash
id=$(gh api repos/{owner}/{repo}/issues/<child> --jq .id)
gh api repos/{owner}/{repo}/issues/<parent>/sub_issues -F sub_issue_id=$id
```

Blocking is a `Blocked by: #12, #13` line at the top of the child's body, not a native
relationship — GitHub's dependency graph does not cover issue-to-issue blocking here. A ticket
is **unblocked** when every issue on that line is closed.

A ticket is **claimed** when it has an assignee. Claim before working, so concurrent sessions
skip it: `gh issue edit <ticket> --add-assignee @me`.

## The absorption queue

The batches absorbing `@diametral/ui` into this package are issues in **this** repo — see
`docs/absorption/batch-plan.md` for their content and ordering rule. Batch boundaries are
publish boundaries: each batch ships `1.0.0-beta.N` on the `next` dist-tag and may not publish
until its verification gate is green.

The planning that produced the queue lives on the **source** repo's tracker,
`diamorval/design-system-diametral` — the [migration map](https://github.com/diamorval/design-system-diametral/issues/151)
and the [handoff map](https://github.com/diamorval/design-system-diametral/issues/168). Read
those with `gh issue view <n> -R diamorval/design-system-diametral`. Wayfinder maps are **not**
created in this repo; this repo executes.
