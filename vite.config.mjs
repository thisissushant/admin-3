import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  base: "/",
  define: {
    global: "window",
  },
  resolve: {},
  server: {
    "/cost_center/": "http://127.0.0.1:8000",
  },
  preview: {
    open: true,
    port: 3000,
  },
});
