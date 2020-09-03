import React from "react";
import { ReactWidget } from "@jupyterlab/apputils";
import MyReactComponent from "./MyReactComponent";

class H5webWidget extends ReactWidget {
  constructor() {
    super();
    this.addClass("jp-ReactWidget");
  }

  render(): JSX.Element {
    return <MyReactComponent />;
  }
}

export default H5webWidget;
