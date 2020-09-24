import React from "react";
import { App, SilxProvider } from "@h5web/app";

function MyApp() {
  return (
    <SilxProvider domain="bsa_002_000-integrate-sub">
      <div style={{ flex: "1 1 0%" }}>
        <App />
      </div>
    </SilxProvider>
  );
}

export default MyApp;
