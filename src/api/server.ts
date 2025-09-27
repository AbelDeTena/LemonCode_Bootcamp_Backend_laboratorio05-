import "dotenv/config";
import { app } from "./app";
import { env } from "../core/env";
import { connectToMongo } from "../dals/mongo.connection";

(async () => {
  if (!env.apiMock) {
    await connectToMongo();
    console.log(`Connected to MongoDB: ${env.mongoUri}`);
  } else {
    console.log("Running with in-memory mocks");
  }

  app.listen(env.port, () => {
    console.log(
      `Server running at http://localhost:${env.port} (mode: ${
        env.apiMock ? "MOCK" : "MONGO"
      })`
    );
  });
})();
