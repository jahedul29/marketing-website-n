# Examples and Docs in the code base

"Tie code and documentation". This is one the most effective and proven way of maintaining proper
documentation. It is so effective that it gave rise to the saying "Write self-deprecating comments".
When we need to make a change to a component, only the component file should change. The
documentation hence needs to be in that file.

## Docs in code

At the start of your code file, start with an opening comment followed by `@docs` on the first line,
then write your text in markdown. This would be `<!--@docs` for .svelte files and `/**@docs` for .ts
files. In svelte file, you can also make your markdown code blocks executable by adding a
`@exec Filename.ext` directive. The code block following this directive will be copied in a

## Generate the docs

Simply run `npm run docs` to generate the files in the `src/examples` directory. Then, run
`npm run dev` and go to <http://localhost:3000/docs>. The compiled documentation is stored in the
`src/routes/(docs)` directory.

## Publish the docs

Make sur to set the `BUILD_DOCS` variable to `1` and the vercel build script will build the docs and
publish them along site your project.
