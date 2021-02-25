import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(application, document.getElementById("root"));
