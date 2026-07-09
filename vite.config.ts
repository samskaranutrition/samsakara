import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import viteReact from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";

/** Some SSR paths in dev still point at last build output under dist/client. */
function serveDistAssetsInDev(): Plugin {
  return {
    name: "serve-dist-assets-in-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (!url.startsWith("/assets/")) return next();
        const file = path.join(process.cwd(), "dist/client", url);
        if (!fs.existsSync(file)) return next();
        const types: Record<string, string> = {
          ".css": "text/css",
          ".js": "application/javascript",
          ".map": "application/json",
        };
        res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream");
        fs.createReadStream(file).pipe(res);
      });
    },
  };
}

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    serveDistAssetsInDev(),
    cloudflare({
      viteEnvironment: {
        name: "ssr"
      }
    }),
  ],
});