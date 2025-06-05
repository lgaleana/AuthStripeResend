import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Empty API routes - ready for development
  // Add your API endpoints here

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      message: "Server is running and ready for development",
      timestamp: new Date().toISOString()
    });
  });

  // Example status endpoint
  app.get("/api/status", (req, res) => {
    res.json({
      frontend: {
        status: "connected",
        port: 5000,
        environment: "development"
      },
      backend: {
        status: "connected",
        port: 5000,
        environment: "development"
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
