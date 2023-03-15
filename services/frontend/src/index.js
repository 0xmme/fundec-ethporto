import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import App from "App";

// Moralis
import { MoralisProvider } from "react-moralis";

// Redux
import { Provider } from "react-redux";
import store from "state/store";

// Soft UI Context Provider
import { SoftUIControllerProvider } from "context/SoftUIControllerCtx";

let user = localStorage.getItem("user");
user = JSON.parse(user);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <MoralisProvider initializeOnMount={false}>
      <SoftUIControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </SoftUIControllerProvider>
    </MoralisProvider>
  </BrowserRouter>
);
