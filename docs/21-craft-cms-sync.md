# Craft CMS project file sync

Our [custom craft install script](https://github.com/DeuxHuitHuit/craft-headless-install) will put
everything in place to make syncing craft's project files from our source of truth (our dev server)
to the corresponding (pre)-production environnements. This is a two step process.

## 1. Getting new project files

The custom installer will create the `download-project.sh` file needed to make this step easy. In a
new, up-to-date branch in the cms repo, run `./download-project.sh <code>`, where `<code>` is the
name of the project on the dev server (i.e. the sub-domain). Once done, review the diff and create a
commit with the result. Push your branch and create a pull request for review.

If there are errors, make sure that meet all requirements in the
[Getting Started guide](01-getting-started.md)

## 2. Pushing projects files

Simply merge the PR into the `main` branch and the `deploy.yaml` github action should take care of
the rest.

### Setting up the github action

This needs to be done only once per project, but is required in order for the github action to run
properly.

In the github web UI, go to "Settings", then "Secrets". Create the required secrets using the UI:

1. `SSH_HOST`: The FQDN or IP address of the server, which as been configured to accept connections
   with ssh keys.
2. `SSH_PORT`: The ssh port to use.
3. `SSH_USERNAME`: The ssh username to use, which allows this ssh key:

```ssh-rsa
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCwaReJv0g3/MCidpoV53l8M/u3BnxTow9i+UxAI5IKS2I5e2V58cBM78wcL9DG3t8cY0fu85twXjTz317QE4NbJz4ak28bJ8WeGy1hQRJHW+MGupDF/E0Y7zl53Z13l+Dje1ZtemK23JoxWYEb7u5Y722B1tbXIuPxy7hdpRt8ZJC2uFj3Y+EaoGzXu3FO1Vd9WERGa+dhSpWxpRFSZHfqmLXsLxD/VEWUzl95oofsnLmhMuQP8POM7rwIVVcRWRdnVQq0aM3OqGLcwg055kcHFpHIhP6TEEvTz7WQahDZIMlBz2RDdwZ/IqktyQE3ipFf5AfNWRat/egFBIrla/KhR2HfXrCic8UPZ12Ca8g2s7Jrp7DI4eb6wEO44n1Nrz78gmI5l55Xu0+I4bZ4jipceozwfmeaWrAb4pbOPJDYhXUblpbnPIxJORM5HWz/xFy4CLpgocPlmcadSWAp5aOnJR8wrlkEfw21JdeJs1ThDdhC69oY6X3NGRJgWce6LpM= ubuntu@tor-1
```

4. `SSH_KNOWN_HOSTS`: The content of the `~/.ssh/known_hosts` file to use. By default, the
   DeuxHuitHuitinc organisation should have a default `SSH_KNOWN_HOSTS` secret which allows all of
   our servers. ([This repo](https://github.com/DeuxHuitHuitInc/known_hosts) contains a script to
   automate that) If pushing to an another server, make sure to overwrite it at the project level.

### Customizing the deploy script

The `deploy.yaml` github action depends on the `deploy.sh` file. This _must_ be adjusted with the
proper values depending on the environnement. Shell variables are declared at the top of the script
to make that easier.

```sh
# the root path of the project
CRAFT_HOME="${HOME}"
# the path to the proper php executable
PHP_EXEC="/usr/bin/php"
```
