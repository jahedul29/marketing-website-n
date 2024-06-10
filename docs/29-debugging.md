# Debugging the application

## Client side

We use Chrome Dev tools. Sveltekit supports source maps for dev builds which allows us to use the
interactive debugger with our svelte and typescript files.

## Server side

We can use vscode's debugger or Chrome dev tools. The starter kit comes equipped with a
`launch.json` file which will add a target in vscode's `Run and debug` panel. This file makes it
easy to create the proper command to have a node process which exports a web socket that exposes the
Chrome dev tools protocol (which both Chrome and vscode can use).

The easiest way to stop the execution of the program is with the `debugger;` statement but you can
also add breakpoints directly in vscode and the program should stop when hitting the line. To get
the same thing in Chrome, open the dev tools on any page and click on the node logo in the top left
corner.

For the adventurous, the command required is something like the following (assuming node is the
proper version):

```sh
node --inspect ./node_modules/.bin/svelte-kit dev
# it will output something like
# Debugger listening on ws://127.0.0.1:9229/ba522474-bc27-4c99-9ba7-8f148004cb0d
```
