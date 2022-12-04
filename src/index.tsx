import App from "./App.tsx";
import React from "react";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";

// run the application on the page
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App tab="home" />);
serviceWorker.unregister();
