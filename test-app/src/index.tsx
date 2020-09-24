import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Global H5Web styles (comment while testing @h5web/lib)
// import "@h5web/app/app.css"

import "./index.css";

import App from "./App";
import Heatmap from "./Heatmap";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/heatmap">
          <Heatmap />
        </Route>
        <Route>
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
