import { MongoClient, Db } from "mongodb";
import { env } from "../core/env";

let client: MongoClient | undefined;
let db: Db | undefined;

export const connectToMongo = async (): Promise<Db> => {
  if (db) return db;
  client = new MongoClient(env.mongoUri);
  await client.connect();
  
  db = client.db();
  return db;
};

export const getDb = (): Db => {
  if (!db) throw new Error("Mongo not initialized. Call connectToMongo() first.");
  return db;
};

export const disconnectFromMongo = async (): Promise<void> => {
  await client?.close();
  client = undefined;
  db = undefined;
};
