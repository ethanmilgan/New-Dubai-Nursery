import { MongoClient } from "mongodb";

const globalForMongo = globalThis;

export async function getMongoDb() {
  if (!process.env.MONGODB_URI) {
    return null;
  }

  if (!globalForMongo.__eyegMongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    globalForMongo.__eyegMongoClientPromise = client.connect();
  }

  const client = await globalForMongo.__eyegMongoClientPromise;
  return client.db(process.env.MONGODB_DB || "early_years_education_group");
}
