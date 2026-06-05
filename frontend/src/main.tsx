import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { assertPublicEnv } from "./lib/envRuntimeCheck.ts";
import "./index.css";

assertPublicEnv();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
