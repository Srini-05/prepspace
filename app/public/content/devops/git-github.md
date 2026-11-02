# Git & GitHub Interview Preparation

Questions on version control, collaboration, and recovery. Practice history-changing operations only in a disposable repository or your own unpublished branch.

## Level 1: Repository Fundamentals

<details>
<summary>1. How do Git and GitHub differ?</summary>

**Answer:** Git is a distributed version-control system. GitHub hosts Git repositories and adds pull requests, issues, access controls, automation, and other collaboration features. Publishing source to a GitHub repository does not automatically build or host an application; deployment needs its own configured workflow and hosting target.

</details>

<details>
<summary>2. What are the working tree, index, and commit history?</summary>

**Answer:** The working tree contains checked-out files. The index, or staging area, describes the next commit's snapshot. A commit records a tree, parents, and metadata. You can stage only part of a file, so review both unstaged and staged differences before committing. A commit is a snapshot, not merely a stored patch.

```sh
git status --short
git diff
git diff --cached
```

</details>

<details>
<summary>3. What is a branch, and what is detached HEAD?</summary>

**Answer:** A branch is a movable reference to a commit. HEAD normally points to the current branch; in detached HEAD state it points directly to a commit. Commits made there can become difficult to find after switching away unless referenced. Create a branch when you want to retain and develop that work.

</details>

<details>
<summary>4. How do fetch, pull, and push differ?</summary>

**Answer:** Fetch downloads objects and updates remote-tracking references without merging them into the current branch. Pull fetches and then integrates according to its options and configuration. Push asks the remote to update references. A push can be rejected when it would discard remote history or violate repository policy; inspect differences before deciding how to integrate.

</details>

## Level 2: Collaboration and History

<details>
<summary>5. How do merge and rebase compare?</summary>

**Answer:** Merge combines histories and may create a merge commit, preserving original commit identities. Rebase replays commits onto a new base, producing new identities. Rebasing an unpublished feature branch can simplify history; rewriting shared history disrupts collaborators. Choose the team's policy and do not force-push shared branches as a routine conflict fix.

</details>

<details>
<summary>6. What is a safe conflict-resolution process?</summary>

**Answer:** Inspect the conflicting changes and their intended behavior, edit a coherent combined result, stage resolved files, and continue the merge or rebase. Run relevant tests and review the final diff. Removing conflict markers is only a textual resolution; it does not prove the combined behavior is correct. Use the operation's abort mechanism if you need to return to its starting point.

</details>

<details>
<summary>7. What makes a pull request reviewable?</summary>

**Answer:** Keep one clear behavioral purpose, explain why the change is needed, show validation evidence, and call out migration or security risks. Avoid unrelated formatting churn. Branch protection or repository rules can require checks and reviews before merging. A green check is evidence for its tested scope, not proof of overall correctness.

</details>

<details>
<summary>8. When would you use squash merge or cherry-pick?</summary>

**Answer:** Squash merging creates one target-branch commit from a pull request's combined changes, simplifying history but discarding its internal commit structure on that branch. Cherry-pick replays selected commits, often for a backport. Both can create different commit identities, so watch for duplicate changes and conflicts during later integration.

</details>

## Level 3: Recovery and Secure Automation

<details>
<summary>9. How do revert, reset, and restore differ?</summary>

**Answer:** Revert creates a new commit that reverses an earlier change and is generally appropriate for published history. Reset moves a reference and can also change the index or working tree depending on its mode. Restore updates file content in the working tree or index. Destructive variants can erase uncommitted changes; inspect state and preserve needed work first.

</details>

<details>
<summary>10. How do reflog and bisect help debugging?</summary>

**Answer:** Reflog records local reference movements and can help locate recently displaced commits, subject to retention and garbage collection. It is not a remote backup. Bisect uses known good and bad revisions to narrow a regression, ideally with a reliable automated test. A flaky test makes a bisect result unreliable.

</details>

<details>
<summary>11. What happens when a secret is committed?</summary>

**Answer:** Revoke or rotate it immediately and investigate exposure. Removing it in a later commit or adding it to `.gitignore` does not remove existing history, clones, logs, or artifacts. Coordinate any necessary history cleanup and repository protections, but never treat rewriting history as a substitute for credential revocation.

</details>

<details>
<summary>12. How are GitHub Actions and GitHub Pages related?</summary>

**Answer:** Actions runs workflows stored under `.github/workflows/`. A Pages workflow can build a frontend, upload its output, and deploy that artifact. For a Vite application, deploy the built `dist` content with the correct base path, not the source repository root. Restrict workflow permissions, protect production environments, and never run untrusted pull-request code with deployment secrets.

</details>

## Practice Lab

1. In a disposable repository, create two branches that edit the same behavior and resolve their conflict with tests.
2. Review staged and unstaged changes independently before making a small commit.
3. Revert a published test commit without rewriting the branch history.
4. Sketch a pull-request validation workflow and a separately authorized deployment workflow.

**Completion check:** Explain which operations create new commits, identify the staged snapshot, and distinguish source hosting from app deployment.

## Quick Revision

- Git tracks snapshots; GitHub adds hosted collaboration.
- Fetch observes remote state; pull also integrates it.
- Rebase changes commit identities.
- Prefer revert for reversing shared history.
- Rotate leaked credentials even after history cleanup.

## References

- [Pro Git](https://git-scm.com/book/en/v2)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)