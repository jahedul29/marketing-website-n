# Creating a new project

Those steps are only needed to start a new project. If the project is already started, you can skip
to [Getting started](01-getting-started.md).

## Local setup

-   Create a new _private_ and _empty_ Github repo for your project in
    <https://github.com/DeuxHuitHuitInc>
-   Clone the Sveltekit-Craft-starter repo locally and cd into it

```sh
git clone --depth 1 https://github.com/DeuxHuitHuitInc/Sveltekit-Craft-starter <project-folder>
# or use ssh
# git clone --depth 1 git@github.com:DeuxHuitHuitInc/Sveltekit-Craft-starter.git <project-folder>
cd <project-folder>
```

## Setup project and starterkit remote

When cloning from the starterkit, the `origin` remote is the starterkit's. Rename it to `starterkit`
and make it read-only, then add your actual repo url as the `origin` remote.

```sh
# rename the origin to starterkit
git remote rename origin starterkit
# prevent pushes to the starter kit remote
git remote set-url starterkit --push "this remote is readonly"
# Unshallow the remote then prune its branches
git fetch --unshallow starterkit
git remote prune starterkit
# Actually add the new remote
git remote add origin <repo url>
```

## Install dependencies

Install all depencencies with npm:

```sh
npm install
```

## Setup url filters

Git url filters are run at checkout and on add. At checkout they replace some constants with their
defined values in `.urls.json`. On add, they do the opposite (replace each value by its constant) so
we never have to commit many files when those values change. It also reduces the chances of merge
conflict when updating the starterkit in a client project.

-   Update `.urls.json` with the appropriate values then commit the change. Make sure that your urls
    do not have a trailing slash.

```sh
# commit the change (only the .urls.json files)
git commit .urls.json -m 'Setup .urls.json file'
```

-   Set up url git filters, in order to be able to update all references to magic constants
    `__SITE-URL__`, `__DEV-CMS-URL__` and `__PROD-CMS-URL__` across the source code.

```sh
# setup and smudge: This will "link" the current values to the constants
npm run url-filters
# run git add to run clean: This will do the actual replacement
git add .
# make sure the repos is clean
git status
```

-   In `package.json`, replace the `name`, `homepage` and `repository.url` properties with the
    project's values.
-   In `humans.txt`, you can add the name and title of every person involved in the project.
-   Commit and push your changes to the new repo

```sh
git add .
git commit -m 'Initial commit'
```

-   You can then push those commits to the remote.

```sh
git push -u origin dev
```

## Branch setup

In order to allow us to maintain different integration environnements, create a `qa` and a `main`
branch.

```sh
git checkout -b qa
git push origin qa -u
git checkout dev
git checkout -b main
git push origin main -u
```

### ClickUp branches

We have a GitHub action that leverages our [ClickUp/GitHub integration](26-clickup-integration.md).
This action needs orphan branches to work with. Orphan branches are branches that do not share any
ancestors with prior existing branches. Here's how to set them up.

```sh
# Create the orphan
git checkout --orphan clickup/dev
# Reset all staged changes
git reset --hard
git clean -f
# Pick the commit to get the vercel build script
git cherry-pick c1f83f0316
# Push the branch (no need for -u, we do not want to track them)
git push origin clickup/dev
# Create qa and prod from it
git checkout -b clickup/qa
git push origin clickup/qa
git checkout -b clickup/main
git push origin clickup/main
# Go back to dev
git checkout dev
# Url filters might yell. Re-run it and checkout
npm run url-filters
git checkout -- .
```

## Sharing the repo with the team

By default, a new repo on github is visible only to the person who created it. In order for the team
to get access, go into the repo settings page, then on the "Collaborators and team" page. Click on
the "Add Teams" button, then type "service" and click to add the Service team to the "Maintain"
role. Click "Add Teams" a second time to add "service-admin" as "Administrator".

## Other repo settings

In the Github repo's general settings, under "Pull Requests", make sure that:

-   "Automatically delete head branches" is checked
-   "Allow merge commits" is unchecked

In the "Branches" settings, add a branch protection rule for the dev branch. Make sure to check all
the following settings:

-   "Require a pull request before merging"
    -   "Require approvals"
    -   "Dismiss stale pull request approvals when new commits are pushed"
-   "Require status checks to pass before merging"
    -   "Require branches to be up to date before merging"
-   "Require conversation resolution before merging"
-   "Require linear history"

then click "Create".

Create two more empty branch protection rules for "qa" and "main" to prevent force pushes.

## Deploy

-   Go to https://vercel.com/deuxhuithuit
-   Click "New Project"
-   Select your newly created repo
-   In the "Framework Preset" field, make sure "Sveltekit" is selected
-   Override the build command to be `./scripts/vercel-build.sh`
-   In "Environment Variables", add the following to overwrite values from `.env.local` and
    `.env.production.local` files:
    -   `CMS_URL`: Your development CMS url (without a trailing slash)
    -   `API_URL`: Your development CMS url followed by `/api`
    -   `BUILD_DOCS`: Set it to `1`
-   Click "Deploy"
-   Go back in the setting, in the "Git" section, and set the "Ignored Build Step" to
    `./scripts/vercel-can-build.sh`.
-   Visit the site on your deploy url to make sure it is working!

## Deploying to production

When your project is ready for production deployment, make sure to add the following environment
variables in Vercel:

-   `CMS_URL` (production): The production CMS url (without a trailing slash)
-   `API_URL` (production): The production CMS url followed by `/api`
-   `PUBLIC_SITE_URL` (production): An override to specify your project's production url
-   `BUILD_DOCS`: (production) Set it to `0`.

You should also update `urls.json` with the production CMS url and site url, then re-run
`npm run filters`.
