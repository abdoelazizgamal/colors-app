import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import NavbarProvider from "./context/NavbarProvider";
import PalettesProvider from "./context/PalettesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarProvider>
        <PalettesProvider>
          <App />
        </PalettesProvider>
      </NavbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
