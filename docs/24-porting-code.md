# Porting code from a client project to the starter kik

We try to keep client projects
[in sync with the starter kit](01-getting-started.md#Setup-starter-kit-remote) and this activity
should be kept as painless as possible. But we might also develop features or fix bugs in a client
project that should also be committed to the starter kit, to make the change available for all
project. This activity is called "back porting" or "upstreaming patches" and can be done in many
ways. While not required to master all techniques, it is good to know a few of them since it may be
easier with one depending on the task at hand.

## Using winmerge

If you are lucky enough to have access to a windows machine, [winmerge](https://winmerge.org/) is an
awesome tool. It's fast at comparing two directories and allows you to quickly pick either whole
files or individual lines.

We've yet to find a similar tool for unixes.

## Manual merge

This should be a last resort option, but still is a valid workflow. Use copy/paste and `cp` to copy
the code into a new branch, commit, push and create a PR.

```sh
# create a new branch from dev
git checkout -b username/feature
# copy files from client project to the starter
cp ../client/src/lib/file.svelte src/lib
# repeat for all files needed
# then check the status
git status
# add new file(s)
git add src/lib/file.svelte
# now, edit the required bit in the starter kit
git diff
# once the diff is ok, commit, push and PR
git commit -am 'New feature'
git push origin username/feature -u
```

## Create a patch file from a github

While looking at a PR or commit on github, you can get a patch file by simply appending `.patch` to
the url. You must download the patch file on your disk in order to apply it. Either save it with
Chrome or use `wget` or `curl -L -o`. Then [apply the patch](#apply-the-patch) normally.

## Create a patch file with `git`

When its working, this is the fastest solution to port code. But there are caveats. First of, the
command is a mouth full. Assuming your are in a client project, with the Sveltekit-Craft-starter
project in the same parent directory:

```sh
git --no-pager diff --no-color HEAD^1 > ../Sveltekit-Craft-starter/feature.patch
```

1.  `git --no-pager`: By default, git uses a pager, which is a program (like `less`) that will
    buffer the data into a scrollable zone. We want the full output, so we need to deactivate it.
    Not that the order is important: it is one of the few arguments that is passed directly to the
    `git` program, not the command program (`diff` in our case).
2.  `diff --no-color`: By default, colors are also enabled. We want the raw output, so it need to be
    disabled.
3.  `HEAD^1`: This is a special notation to "easily" get the commit _before_ the last one (HEAD). We
    then get the diff from the last commit only.
4.  `> feature.patch`: Bash redirection: we want to save the output into a file. Give it a
    meaningful name.

Hopefully, you now have generated a valid patch file with can be [applied](#apply-the-patch).

### More options to generate patches

You can also get the diff from a precise commit (not only the last one)

```sh
git --no-pager diff --no-color 438611bd6e > feature.patch
```

If the changes were made across many commits, you can use a commit range

```sh
git --no-pager diff --no-color 438611bd6e~3..438611bd6e > feature.patch
```

You could also _include_ the 3rd last commit with an inclusive range (3 dots)

```sh
git --no-pager diff --no-color 438611bd6e~3...438611bd6e > feature.patch
```

Finally, we can specify which file we care for: this is useful when an unrelated file changed in
your commit range

```sh
git --no-pager diff --no-color 438611bd6e~3...438611bd6e > feature.patch -- src/file1 src/file2
```

We real world example of this can be found in
[this PR](https://github.com/DeuxHuitHuitInc/Sveltekit-Craft-starter/pull/220).

## Apply the patch

With a valid patch file in hand, the only thing that you need to run is

```sh
git apply feature.patch
```

If all goes well, the commit's done. If you need to edit the commit message, do it with
`git commit --amend` **before** pushing to origin.

The probability to have a conflict is high with manual patching. But do not fear conflicts as they
are normal and most of the time [easy to deal with](<18-git(hub)-flow.md#conflicts>). The same
conflict resolution command used in a rebase must be used.
