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
