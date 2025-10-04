import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: "5002",
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.error(`[Proxy] Error: ${err.message}`);
            if (err.code === "ECONNREFUSED") {
              res.writeHead(503); // Service Unavailable
              res.end("Server is down");
            } else {
              res.writeHead(500);
              res.end("Proxy error");
            }
          });
        },
      },
      "/socket.io": {
        target: 'http://localhost:5001',
        ws: true,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on("error", (err, req, res) => {
            console.error(`[Proxy] WebSocket Error: ${err.message}`);
          });
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});



