import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./Styles/reset.scss";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
// reducer

ReactDOM.render(
  <BrowserRouter>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
