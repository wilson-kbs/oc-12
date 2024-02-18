import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const NODE_ENV = process.env.NODE_ENV;
const DEMO_PREFIX = process.env.DEMO_PREFIX;

function getBase() {
  if (NODE_ENV === "demo") {
    return DEMO_PREFIX || "/";
  }
  return "/";
}

export default defineConfig({
  base: getBase(),
  plugins: [tsconfigPaths(), react()],
});
