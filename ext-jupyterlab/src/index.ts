import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from "@jupyterlab/application";

import { MainAreaWidget } from "@jupyterlab/apputils";

import { ILauncher } from "@jupyterlab/launcher";

import H5webWidget from "./H5webWidget";

namespace CommandIDs {
  export const create = "create-h5web";
}

/**
 * Initialization data for the h5web extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "h5web",
  autoStart: true,
  optional: [ILauncher],
  activate: (app: JupyterFrontEnd, launcher: ILauncher) => {
    const { commands } = app;

    const command = CommandIDs.create;
    commands.addCommand(command, {
      caption: "Create a new React Widget",
      label: "React Widget",
      execute: () => {
        const content = new H5webWidget();
        const widget = new MainAreaWidget<H5webWidget>({ content });
        widget.title.label = "h5web";
        app.shell.add(widget, "main");
      },
    });

    if (launcher) {
      launcher.add({
        command,
      });
    }
  },
};

export default extension;
