# Getting started

## Environment setup

There are several steps to setup your projects before starting development. The first would be to
make sure you are running the proper node version.

### nvm

If you are using `nvm` on Unix to manage your node version, the projects features the `.nvmrc` file
which you allow you to simply type `nvm use` to get the proper version. On Windows, you must first
install the version with this command `nvm install $(cat .nvmrc)` and then use it with this command
`nvm use $(cat .nvmrc)`. If you have a manual setup, you will need to install the version specified
in `.nvmrc`.

### bash

Most shell command examples assume that there is `bash` installed somewhere in your system and that
your shell is able to launch it. If commands are not working in your shell, try in `bash`. If you're
on Windows, we recommend running the following command so that all the npm scripts run without
issue:

```sh
npm config set script-shell "C:\\Program Files\\git\\bin\\bash.exe"
```

You can always revert it by running:

```sh
npm config delete script-shell
```

We also need your `bash` shell to have the following binaries in your `$PATH`, which should be
available by default on Unix:

1. `node`, `npm` and `npx`
2. `git`
3. `cat`
4. `sed`
5. `awk`
6. `curl`
7. `tail`
8. `ssh`
9. `rsync` (Follow [this guide](ttps://prasaz.medium.com/add-rsync-to-windows-git-bash-f42736bae1b3)
   to get a version working on Windows and make sure to get the latest version from the
   [msys2 repo](https://repo.msys2.org/msys/x86_64/))

We also recommend to add `./node_modules/.bin` yo your `$PATH`.

## Project setup

-   Clone the project and `cd` into the created directory.

```sh
git clone <project-url> <project-name>
cd <project-name>
```

-   Make sure urls in `.urls.json` are valid and _without_ any trailing slash.
-   Run `npm setup` to install all dependencies, setup url filters and generate Sveltekit types.

If you ever run into problems with url filters, you can disable them temporarily with the `--unset`
option. Url filters are use to replace placeholder strings with values from the `.url.json` file, to
remove the risk of merge conflicts in client projects.

```sh
# Unset the filter
npm run url-filters:unset
# Do what's needed to clean up the mess
...
# Then, re-enable the filters
npm run url-filters
```

## Setup starter kit remote

In order to be able to update the starter kit from your client project, you can add the starter
kit's repo as a remote in your project. This needs to be done once per local repo.

```sh
# Add the remote
git remote add starterkit https://github.com/DeuxHuitHuitInc/Sveltekit-Craft-starter
# Disable pushes
git remote set-url starterkit --push "this remote is readonly"
```

Then update, the starter kit with a merge commit, with a meaningful message. We will always merge
commits from the `dev` branch.

```sh
# Fetch from remote
git fetch starterkit dev
# Merge remote branch into current branch
git merge starterkit/dev
```

### Partial starter kit update

Updating the whole project can be time consuming, so if you ever need to bring a patch from the
starter kit your project, you can use cherry-pick to port a single commit from the starter kit to
your project. Please use a commit that is present in the dev branch, so wait for PRs to be merged
before proceeding.

First, find the commit reference via github's interface (or with `git log`), copy it into your
clipboard (you'll see why) and then:

```sh
# Cut a new branch from dev (paste the commit ref)
git checkout -b username/pick-<commit-ref>
# Fetch from remote
git fetch starterkit dev
# Pick it (paste the commit ref)
git cherry-pick <commit-ref>
# Amend the commit (no -m)
git commit --amend
# In your editor, add a line with the referenced commit, if not already present
# again, use paste to add the commit-ref
git push origin username/pick-<commit-ref> -u
```

## Local development

To spin up a local development server, run:

```
npm run dev
```

Then go to `http://localhost:3000` to see your project.

## Available NPM Scripts

In `package.json`, Sveltekit offers several scripts that you can run with `npm`. Here are the most
useful:

-   `npm run dev` will start a local development server. That's what you will use most of the time.
    You can add `-- --host` at the end of the script to expose the server to your network (you can
    use this to view your dev server on mobile or tablet, for example).
-   `npm run build` will produce a local build of your project.
-   `npm run preview` will allow you to view your local build (from the `build` script) from a local
    server.
-   `npm run codegen` will query your CMS Graphql schema and generate types from your data models in
    a `craft.d.ts` file. You should run this everytime you make a change to your schema. It will
    also generate a `tailwind.d.ts` file from your Tailwind config file (see
    [Tailwind Types](30-tailwind-types.md)).
-   `npm run sync` will update the Typescript definition of your project, useful for sveltekit
    types.

You can also run `npm run` to get a complete list of all available commands.

## Development experience

For the best development experience, we recommend using VSCode with the all the recommended
extensions installed. The complete list can be found in `.vscode/extensions.json`, but VSCode should
ask you if you want to install them automatically.

This will enable code formatting, error detection, autocompletion and several other thing that will
make you more productive in your project.

## Updating packages

You will be responsible for maintaining your project's specific packages (if any) up to date.

For the packages that already come with the starterkit, we recommend updating them via the
starterkit (see section above on how to pull updates from the starterkit). Doing so will ensure that
the core code structure will be updated correctly in your project.

We recommend that you check Svelte and Sveltekit's changelogs regularly to stay up to date on new
features and breaking changes, as they are the main tools we use.

-   Svelte: <https://github.com/sveltejs/svelte/blob/master/CHANGELOG.md>
-   Sveltekit: <https://github.com/sveltejs/kit/blob/master/packages/kit/CHANGELOG.md>
-   Vercel adapter:
    <https://github.com/sveltejs/kit/blob/master/packages/adapter-vercel/CHANGELOG.md>
