# Updating craft cms and plugins the latest version

Craft cms release cadence is pretty fast: we get a new version once to twice a month.

This guide provides easy, step by step instructions which makes sure versions are pinned. Simply
updating via the web UI or via `composer update` can break things. Since we publish cms updates
automatically, pinning versions allow us to get the same versions in each deploy.

## 1. Updating craftcms/cms

First of, we start by updating the cms. Go to `/craft/utilities/updates` in the control panel to
check for intermediate updates. It is not always possible to update straight up to the latest
version so you may need to do it multiple times. One such version is `3.7.27.2`.

Since there is a new php version each November, make sure to use the proper php executable when
running the commands. On the dev box, php executables are available for many versions. Executables
are prefixed with `ea-` and ends with the version number. We We are now using php 8.2 so its
executable name is `ea-php82`.

Now, ssh into the dev box like this:

```sh
# Type this in your local shell
# Connections are allowed from our public ips only (at the office/via the vpn)
ssh dev@hg2.288dev.com -p1023
```

Once connected, cd into the proper directory and create a backup. Make sure to edit the php
executable name.

```sh
# We now issue commands in the ssh session.
ea-php8x ./craft db/backup
```

Once completed, update Craft by specifying the version you want. The syntax is `package:version`.

```sh
ea-php8x composer.phar require craftcms/cms:3.7.27.2 --with-all-dependencies
```

Each time we update something, it's safe to run `ea-php8x ./craft up` in order to run migrations.
The cli tool will ask you to confirm each migration but will first ask you if you want to create a
backup. _Choose wisely_.

Return in the control panel to make sure everything is ok. Proceed with installing the most recent
version possible.

```sh
ea-php8x composer.phar require craftcms/cms:4.4.5 --with-all-dependencies
ea-php8x ./craft up
```

## 2. Updating plugins

Once the cms is up to date, we need to update the plugins. In the control panel, we can see which
updates are available, but we do not see the package's name, which composer uses. In order to get
this information we can use `composer outdated --direct` to get a list of all outdated packages and
then use `grep` to filter out the information.

```sh
ea-php8x composer.phar outdated --direct | grep "redactor"
```

This will output something like

```sh
craftcms/redactor   2.8.8    2.10.6   Edit rich text content in Craft CMS using Redactor by Imperavi.
```

With this output at hand, it's easy to create the proper command:

```sh
ea-php8x composer.phar require craftcms/redactor:2.10.6 --with-all-dependencies
ea-php8x ./craft up
```

We repeat those exact same steps for each plugin.

## 3. Project sync

It's really important to [sync the project files](21-craft-cms-sync.md) after upgrades: this is how
we will push updates into production. Schema and version changes will be reflected in those files.
Create a PR with the changes and makes sure it gets properly reviewed.
