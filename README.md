# h5web-jupyter

A repo to try integrating components from an external React App into a JupyterLab extension.

## Description

**My goal is to use components from a React App into JupyterLab.** This repo documents the tests towards this goal.

More technically speaking, I strive to export the components of the React App (created with Create React App) and import them into a JupyterLab extension.

This should work with components written in TypeScript and using CSS modules.

## Files

### The React App to import `app-to-import`

This folder contains the React App with the component I wish to export (and reuse in JupyterLab): `ColorWidget`.

- `ColorWidget` renders a simple `div` whose color is set by a CSS module `ColorWidget.module.css`.
- `App` is irrelevant to me as I only wish to export `ColorWidget`.
- The app was set up using Create React App and written in TypeScript.

### The JupyterLab extension `ext-jupyterlab`

This folder contains the JupyterLab extension that will import and allow to use the component `ColorWidget` into JupyterLab.

- It is more or less the [Jupyterlab example of the display of a react-widget](https://github.com/jupyterlab/extension-examples/tree/master/react/react-widget): it wraps `ColorWidget` into JupyterLab's `ReactWidget` and adds a button to trigger its display.
- It was set up using [Jupyterlab's cookiecutter](https://github.com/jupyterlab/extension-cookiecutter-ts).
- The version of JupyterLab and of other Python packages are in `requirements.txt` located in the root of the project.

### The test App: `test-app`

This is a React App to test the import into a "normal" React context (rather than JupyterLab).
