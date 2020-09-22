import React from "react";
import { App, ColorWidget, SilxProvider } from "h5web";

function MyApp() {
  console.log(ColorWidget);
  return (
    <div className="App">
      <SilxProvider domain="bsa_002_000-integrate-sub">
        <App />
      </SilxProvider>
    </div>
  );
}

export default MyApp;
