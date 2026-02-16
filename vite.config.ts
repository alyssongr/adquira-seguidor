import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const previewHost = process.env.HOST || "0.0.0.0";
  const previewPort = Number(process.env.PORT) || 4173;

  return {
    server: {
      host: true,
      port: 8080,
    },

    preview: {
      host: previewHost,
      port: previewPort,
      allowedHosts: [
        "adquiraseguidor.com",
        "www.adquiraseguidor.com"
      ],
    },

    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
