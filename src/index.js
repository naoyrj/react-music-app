import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import theme from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();