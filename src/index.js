// Import CSS libraries to reset browser default styles.
import "normalize.css";
import "sanitize.css";

// Import the React libraries and the <App> component.
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Model } from "./model.js";

// Render the <App> component into the root html element.
ReactDOM.render(<App model={Model} />, document.getElementById("root"));
