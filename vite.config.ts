import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  if (!process.env.VITE_PREFIX_PATH || process.env.VITE_PREFIX_PATH === "/") {
    process.env.VITE_PREFIX_PATH = "";
  }

  if (mode === "preview") {
    if (!process.env.VITE_FAKE_DATA_URL) {
      process.env.VITE_FAKE_DATA_URL = `${process.env.VITE_PREFIX_PATH}/preview/data.json`;
    }
  } else if (mode === "production") {
    if (!process.env.VITE_API_URL) {
      process.env.VITE_API_URL = "https://api.example.com";
    }
  } else if (mode === "development") {
    if (!process.env.VITE_API_URL) {
      process.env.VITE_API_URL = "http://localhost:3000";
    }
  } else {
    throw new Error(`Unsupported mode: ${mode}`);
  }

  return {
    base: process.env.VITE_PREFIX_PATH,
    plugins: [tsconfigPaths(), react()],
    server: {
      port: 4200, // Changez le port de développement si nécessaire
    },
    preview: {
      port: 5000, // Changez le port de prévisualisation si nécessaire
    },
  };
});
