import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ListsProvider } from "./state/ListsContext";
import { LogProvider } from "./state/LogContext";
import "./styles/global.css";

const container = document.getElementById("root");
if (!container) throw new Error("Missing #root");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <LogProvider>
        <ListsProvider>
          <App />
        </ListsProvider>
      </LogProvider>
    </BrowserRouter>
  </StrictMode>,
);
