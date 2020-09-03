import React from "react";
import { ReactWidget } from "@jupyterlab/apputils";
import { ColorWidget } from "h5web";

class H5webWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass("jp-ReactWidget");
  }

  render(): JSX.Element {
    return <ColorWidget />;
  }
}

export default H5webWidget;
