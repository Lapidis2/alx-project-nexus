import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URL!;
const options = {};

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}
declare global {

  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (global._mongoClientPromise ??= client.connect())
    : client.connect();

export default clientPromise;
