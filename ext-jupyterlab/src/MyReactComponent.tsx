import React from "react";
import { SilxProvider, App } from "h5web";

function MyReactComponent() {
  return (
    <SilxProvider domain="bsa_002_000-integrate-sub">
      <App />
    </SilxProvider>
  );
}

export default MyReactComponent;
