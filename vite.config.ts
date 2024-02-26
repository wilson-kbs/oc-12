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

if (NODE_ENV === "demo" && !DEMO_PREFIX) {
  throw new Error("DEMO_PREFIX is required when NODE_ENV is demo");
}

if (NODE_ENV === "demo") {
  process.env.VITE_MODE = "demo";
  process.env.VITE_DEMO_PREFIX = DEMO_PREFIX;
}

export default defineConfig({
  base: getBase(),
  plugins: [tsconfigPaths(), react()],
});
