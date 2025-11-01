import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const serverlessBaseUrl = process.env.VITE_SERVERLESS_BASE_URL ?? "http://localhost:3000";

  return {
    server: {
      host: "adquira-seguidor-sitee.tvlueg.easypanel.host",
      port: 8080,
      proxy: {
        "/api/payments/create": {
          target: serverlessBaseUrl,
          changeOrigin: true,
        },
        "/api/payments/status": {
          target: serverlessBaseUrl,
          changeOrigin: true,
        },
      },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
