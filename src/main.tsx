import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Hash routing: this gets served from a GitHub Pages sub-path, where a real
// path like /arrivals/cities would 404 on refresh because Pages has no SPA
// fallback. The hash never reaches the server.
import { HashRouter } from "react-router-dom";
import { App } from "./App";
import { ListsProvider } from "./state/ListsContext";
import { LogProvider } from "./state/LogContext";
import "./styles/global.css";

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root");

createRoot(container).render(
  <StrictMode>
    <HashRouter>
      <LogProvider>
        <ListsProvider>
          <App />
        </ListsProvider>
      </LogProvider>
    </HashRouter>
  </StrictMode>,
);
