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
