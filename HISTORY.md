# History of fixes and problems

I managed to [successfully import a React widget from a ReactApp into a JupyterLab extension](https://github.com/loichuder/h5web-jupyter/blob/symbolic-link/HISTORY.md) using `npm/jlpm link` and `webpack`. Building on this, I wish now to import components from [h5web](https://github.com/silx-kit/h5web) into the JupyterLab extension.

## Import a simple widget in the test-app

I start slowly by trying to import the simple `ColorWidget` I made in https://github.com/loichuder/h5web-jupyter/tree/symbolic-link in the React app test-app. But this time, `ColorWidget` is declared in **h5web**: https://github.com/silx-kit/h5web/tree/import-jupyter-ext.

I derived the steps of my latest attempt in https://github.com/loichuder/h5web-jupyter/tree/symbolic-link:

- I add `webpack-cli`, a `tsconfig.build.json` and a `webpack.config` in `h5web` that will be used in a `npm run build:webpack` task
- I add the `ColorWidget` (and its CSS module) that is exported in a simple `main.ts` that I declare as my lib entrypoint.
- I then run `npm run build:webpack` and `npm link .` in the `h5web` folder
- Finally, I run `npm link h5web` in the `test-app`.

:tada: I am able to import and display the `ColorWidget` when running `test-app` !

## Import a simple widget in the jupyterLab extension

Should be straightforward, right ? I just need to run `jupyter labextension link .` in the `h5web` folder first to add it to the list of packages JupyterLab uses when building extension packages.

I then run `jlpm build` in `ext-jupyterlab`: **I get 177 errors** :neutral_face:

All of them are conflicting `react` property declarations between the ones of `ext-jupyterlab` and `h5web` of the type:

```
../../h5web/node_modules/@types/react/index.d.ts:3148:13 - error TS2717: Subsequent property declarations must have the same type.  Property 'symbol' must be of type 'SVGProps<SVGSymbolElement>', but here has type 'SVGProps<SVGSymbolElement>'.

3148             symbol: React.SVGProps<SVGSymbolElement>;
                 ~~~~~~

  node_modules/@types/react/index.d.ts:3138:13
    3138             symbol: React.SVGProps<SVGSymbolElement>;
                     ~~~~~~
    'symbol' was also declared here.
```

Note that I did not get this error when importing from `app-to-import` in https://github.com/loichuder/h5web-jupyter/tree/symbolic-link. Investigating the `@types/react` packages, I see that they have different versions:

- `^16.9.35` in `h5web`
- `^16.9.46` in `app-to-import`

The latter is surely in sync with the version used by the JupyterLab package `@jupyterlab/launcher`, that is a dependency of `ext-jupyterlab` (In fact, `@jupyterlab/launcher` uses `"@types/react": "~16.9.16"` but well...).

### Matching @types/react in h5web to the version needed by @jupyterlab/launcher

- I run then `npm install --save-dev @types/react@16.9.46` in `h5web`. I get `^16.9.46` in the `package.json`
- I run `jlpm build` again in `ext-jupyterlab`: it works ! :tada:

**`jupyter labextension install .` runs smoothly as well and the `ColorWidget` is displayed when clicking on `React Widget` in JupyterLab !**

I should look into things like `peerDependencies` to avoid matching the version by hand but for now, it will do.
