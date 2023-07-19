import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import KeyContext from "./context/KeyContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <KeyContext>
      <App />
    </KeyContext>
  </React.StrictMode>
);
