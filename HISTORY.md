# History of fixes and problems

The aim here is to import the component directly from the file it lives in.

## Using relative paths

`npm start` in `test-app` fails with `Module not found: You attempted to import ../../app-to-import/src/ColorWidget which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.`.

- I try then to use a symbolic link to put into `src`
