import React from "react";
import { App, SilxProvider } from "@h5web/app";

function MyApp() {
  return (
    <SilxProvider domain="bsa_002_000-integrate-sub">
      <App />
    </SilxProvider>
  );
}

export default MyApp;
