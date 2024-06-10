# git(hub) flow

We follow a 'feature-branch' development model, where any code contribution must be made in a
dedicated branch, typically called `<user>/<topic>`, and submitted to be merged via a Pull Request.
This [article by github](https://docs.github.com/en/get-started/quickstart/github-flow) explains it
a bit deeper.

## Feature branch are unique

**DO NOT** reuse branches that have been merged! This is one of the downsides of using a
[squash merge](#Pull-requests). It is always better to start fresh in a new branch, created from
`dev`. Try to be descriptive in your branch topic, just as you are in a commit message.

If you want to reuse an old branch name, you need to make sure it does not exist in your local git
repo nor the one hosted by github. When a feature _sometimes_ break, try to avoid it.

Here's how to start a new branch

```sh
# Checkout dev
git checkout dev
# Merge new commit, using a fast-forward merge
git pull --ff-only origin dev
# Cut a new branch and check it out
git checkout -b my-username/add-feature-awesomeness
```

## Keeping up with integration branches

During the whole lifespan of the project, we maintain three integration branches: `dev`, `qa` and
`main`. Each branch is tied to a
[particular environnement](https://www.notion.so/288/Atelier-Mise-en-ligne-37fee480033c4d0cae4c97a86a9833c1).

When working in a feature branch, maintaining the changes on top of the dev branch is super
important. It makes sure your latest changes are build/tested with the latest code and also make
conflict resolution a lot easier.

On a clean working directory, with the feature branch checked out, do:

```sh
# Fetch new commits from remote
git fetch origin dev
# Rebase on top of that
# Add -i to review the process
git rebase origin/dev
# Force push the rebased branch
git push origin <user/feature> -f
```

## Pull requests

Pull requests must always be submitted against the `dev` integration branch. Pull requests must
always be merged into `dev` using the 'Squash and merge' option. Make sure to review the comments
suggested by github and add relevant information. Make sure to keep the PR number in the commit's
title. If keeping the history of each separate commit is useful, the 'Rebase and merge' option can
be used.

Here's a complete example of all commands that guarantees a good result:

```sh
# first check out dev
git checkout dev
# then update your local copy from the remote
git pull --ff-only origin dev
# cut a new branch from the update dev local copy
git checkout -b <user/feature>

# do to actual the work...

# add and git commit changed files
git commit -a -m 'My change'
# push the branch to the remote
git push origin <user/feature> -u
# copy the new PR url in git's output and follow it !
```

## Never rebase integration branches (qa, dev, main)

Never do it. The consequences are horrible.

## Merges

We avoid recursive merges as must as possible, in all branches.

Always try a fast-forward merge (`pull --ff-only`). This is the proper way to update branches from
remotes. This is the only way main should be updated on your machine.

We discourage the usage of `git pull`, because with its default arguments it will do a recursive
merge if a fast-forward is not possible. This leads to wasteful merge commits and makes bisecting
harder than it needs to be. It also makes the history non-linear, which makes it harder to follow.

If you committed something and the push fails, it mostly means that someone or a bot pushed a commit
into this branch, on your remote. In this case, a fast-forward merge won't work.

Instead of doing a merge commit, do a rebase merge (`pull --rebase`). This will rebase your branch
on top of the remote's HEAD. You should be able to push normally afterwards (no need to `--force`
it).

```sh
# pull using fast forward only
git pull origin <feature-branch> --ff-only
# if it fails, issue a rebase pull
git pull origin <feature-branch> --rebase
# you should then be able to
git push origin <feature-branch>
```

In order to make it easier to pull, we recommend to create the following alias:

```sh
git config --global alias.pullff "pull --ff-only"
git config --global alias.pullr "pull --rebase"
```

Which can then be used as:

```sh
# pull using fast forward only
git pullff origin <feature-branch>
# if it fails, issue a rebase pull
git pullr origin <feature-branch>
```

It can also be a good idea to protect yourself by forcing `pull` to only use fast forward merges.
This can be done with the following command:

```sh
# globally, for all repos
git config --global pull.ff "only"
# for the current repo
git config pull.ff "only"
```

Merge commits are tolerated when integrating code from external repos. If you force fast forward on
`pull`, use `fetch` and `merge` to merge externally.

### VS Code Sync

The Sync button in VS code will do merge commits by default also. You can tell it to use rebase
instead via the "Git: Rebase when Sync" check box in your settings, or add
`"git.rebaseWhenSync": true` to your settings file.

## Integration merges

When feedback is required, `dev` is merged in `qa` manually, using fast-forward merges only. A PR
can be open to get a code review, but the merge needs to be manual. `main` is always the last branch
to get updated, since it automatically promotes code into production. `main` must only get commits
that were approved in the `qa` branch. We maintain a graphical representation of the workflow
[here](https://www.notion.so/288/Atelier-Mise-en-ligne-37fee480033c4d0cae4c97a86a9833c1).

## Conflicts

You may arrive to a point where you PR conflicts with the `dev` branch. In order to fix them, you
will need to rebase your branch.

```sh
# Rebase on top of dev
git pull --rebase origin dev
```

Rebase will stop at the first conflict. Use status to check which files are in conflict. The
conflicting file(s) will have a `UU` status.

```sh
# Check for conflicts
git status
# Fix the conflict in the file(s) then
git add <file1> <file2> ...
# Commit the files
## This will open your editor with the commit message already filled up
git commit
# Continue the rebase operation until all commits are reapplied.
## Restart the process each time there is a conflict
git rebase --continue
```

### Automated conflict resolutions

One of the most common file to conflict is the `package-lock.json` file. Thankfully,
[npm provides a tool](https://www.npmjs.com/package/npm-merge-driver) to automate the conflict
resolution! You can install it globally on your machine by running this command:

```sh
npx npm-merge-driver install --global
```

Another, more advanced tool is git's [rerere](https://git-scm.com/docs/git-rerere), which stands for
"REuse REcorded REsolution". Since it's _easy to shoot yourself in the foot_ with this one, it is
disabled by default and needs to be enabled in your git config via `rerere.enabled`.

When enabled, git will record all your conflict resolution and _will automatically reuse them when
faced with the same conflict_. The danger here is that git never forgets and will happily resolve
conflicts seen in the past, which can lead to an absolute nightmare trying to figure out why a
particular rebase goes wary.
