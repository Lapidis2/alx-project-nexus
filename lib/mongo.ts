import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URL ?? "";
const options = {};

if (!uri) {
  throw new Error("Please define the MONGODB_URL environment variable inside .env.local");
}

declare global {
 
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}


const client = new MongoClient(uri, options);

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === "development"
    ? (() => {
        if (!global._mongoClientPromise) {
          global._mongoClientPromise = client.connect().then((client) => {
            console.log("Connected to MongoDB (dev)");
            return client;
          });
        }
        return global._mongoClientPromise;
      })()
    : client.connect().then((client) => {
        console.log("Connected to MongoDB (prod)");
        return client;
      });

export default clientPromise;
