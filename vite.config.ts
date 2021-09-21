import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (moduleId) => {
          // Put react in it's own bundle.
          // Remove this extra chunk splitting and the runtime error goes away.
          if (
            moduleId.includes("node_modules/react/") ||
            moduleId.includes("node_modules/react-dom/")
          ) {
            return "react.vendor";
          }

          // create-react-class ends up in main vendor bundle
          if (moduleId.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
