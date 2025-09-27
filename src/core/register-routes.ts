import type { Express } from "express";
import { housesApi } from "../pods/houses/houses.rest-api";
import { notFoundHandler, errorHandler } from "../common-app/";

export const registerRoutes = (app: Express) => {
  // Routers (pods)
  app.use("/api/houses", housesApi);

  app.get("/", (_req, res) => {
    res.json({ message: "API is running 🚀" });
  });

  // 404 
  app.use(notFoundHandler);

  // Error handler 
  app.use(errorHandler);
};
