import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const NODE_ENV = process.env.NODE_ENV;
const DEMO_PREFIX = process.env.DEMO_PREFIX;

function getBase() {
  if (NODE_ENV === "demo") {
    return DEMO_PREFIX || "";
  }
  return "";
}

if (NODE_ENV === "demo") {
  process.env.VITE_MODE = "demo";
  process.env.VITE_DEMO_PREFIX = getBase();
  process.env.VITE_FAKE_DATA_URL = `${getBase()}/preview/data.json`;
}

process.env.VITE_APP_BASE_URL = getBase();

export default defineConfig({
  base: getBase(),
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 3000, // Changez le port si nécessaire
  },
  preview: {
    port: 5000, // Changez le port de prévisualisation si nécessaire
  },
});
