import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import AppWrapper from "./App.tsx";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "@mantine/core/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      defaultColorScheme="dark"
      theme={{
        colors: {
          dark: [
            "#f8fafc",
            "#f1f5f9",
            "#e2e8f0",
            "#cbd5e1",
            "#94a3b8",
            "#64748b",
            "#475569",
            "#334155",
            "#1e293b",
            "#0f172a",
          ],
        },
        primaryColor: "blue",
        defaultRadius: "md",
      }}
    >
      <HashRouter>
        <AppWrapper />
      </HashRouter>
    </MantineProvider>
  </StrictMode>,
);
