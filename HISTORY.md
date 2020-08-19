# History of fixes and problems

The aim here is to import the component directly from the file it lives in.

## Using relative paths

`npm start` in `test-app` fails with `Module not found: You attempted to import ../../app-to-import/src/ColorWidget which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.`.

- I try then to use a symbolic link to put into `src`

## Using symbolic links

- I run `ln -s ../../app-to-import/src/ components` into `test-app/src`

`npm start` in `test-app` fails with

```Module parse failed: Unexpected token (4:22)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
| import styles from "./ColorWidget.module.css";
|

> function ColorWidget(): ReactElement {
> | return <div className={styles.reddish} style={{ width: 300, height: 300 }} />;
> | }
```

- I try to compile first the TS files before symlink.

## Using TS compilation **and** symbolic links

- I run `npm run build:tsc` in `app-to-import` to create the `lib` folder with `d.ts` and `js` files inside.
- I run then `ln -s ../../app-to-import/lib/ components` into `test-app/src`

`npm start` in `test-app` fails with `Module not found: Can't resolve './ColorWidget.module.css' in '/users/huder/Projects/h5web-jupyter/app-to-import/lib'`.

- **Quick fix**: I copy-paste the missing CSS file into lib (note that while `babel` can copy files `tsc` [cannot](https://github.com/microsoft/TypeScript/issues/30835)).

**🎉 `npm start` in `test-app` works and displays the `ColorWidget` 🎉**

### In ext-jupyterlab

- Again, I run `npm run build:tsc` in `app-to-import`.
- I run then `ln -s ../../app-to-import/lib/ components` into `ext-jupyterlab/src`

`jlpm build` works !

`jupyter labextension install .` fails at the webpack stage:

```
> node .../jupyter2.2/lib/python3.8/site-packages/jupyterlab/staging/yarn.js run build:dev:minimize
yarn run v1.21.1
$ jlpm run build:dev
$ jlpm run build
$ webpack
ModuleNotFoundError: Module not found: Error: Can't resolve './components/ColorWidget' in '.../jupyter2.2/share/jupyter/lab/staging/node_modules/h5web-jupyter/lib'
```

because it searches inside the internal libs of `jupyterlab` rather than resolving the symlink.

- There is `jupyter labextension link .` (https://discourse.jupyter.org/t/about-jupyter-labextension-link-v-s-install/2201) that appears to do the symlink at JupyterLab's level (as does `npm link` for `npm`) which might be worth a try.

## Using JupyterLab link (for ext-jupyterlab)

- Again, I run `npm run build:tsc` in `app-to-import` and copy the CSS module file in the resulting folder.
- I run `jupyter labextension link .` **and** `npm link .` into `app-to-import` (note that I tweaked `package.json` to have something closer of a "true" package).
- In `ext-jupyterlab`, I add `app-to-import` by running `npm link app-to-import` and run `jlpm build`.

I then run `jupyter labextension install .`: it works ! The extension is installed !

I run `jupyter lab` to try to launch my _React Widget_: clicking on `React Widget` indeed displays the `div` of `ColorWidget` but missing the color. By inspecting with Developer tools, I see that the CSS module is present but there is no `class` on the `div`: there is an issue with the compilation/transpiling of the CSS module...

- Perhaps I could use `webpack` to compile `app-to-import` CSS modules beforehand into regular CSS...

## Using JupyterLab link **and** webpack

- This time in `app-to-import`, I run `npm run build:webpack` as I added a minimal working `webpack` config for TS and CSS module files.
- I run `jupyter labextension link .` **and** `npm link .` into `app-to-import` (if needed).
- In `ext-jupyterlab`, I add `app-to-import` by running `npm link app-to-import` (if needed) and run `jlpm build`.

I then run `jupyter labextension install .`: it works ! The extension is installed again !

I run `jupyter lab` to try to launch my _React Widget_: **the click on `React Widget` displays this time the `ColorWidget` with the color set from the CSS module 🎉 !**

To conclude, I am now able to import a simple React component (written in TS) with its associated CSS module into a Jupyter extension !

Issue though: I cannot run `react-scripts start` anymore into `app-to-import`. It complains that I installed another `webpack` version that is incompatible with Create React App. I need to fix this as I wish that it is still possible to develop separately the App to import.
