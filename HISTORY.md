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
