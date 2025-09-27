import express = require("express");
import { registerRoutes } from "../core/register-routes";

export const app = express();
app.use(express.json());

registerRoutes(app);
