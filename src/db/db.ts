"use server";
import { MongoClient, Db } from "mongodb";

let db: Db | null = null;
let connectionTimestamp: number | null = null;
const CONNECTION_LIFETIME = 5 * 60 * 1000;

export const DB = async (): Promise<Db> => {
  const currentTimestamp = Date.now();

  if (
    db &&
    connectionTimestamp &&
    currentTimestamp - connectionTimestamp < CONNECTION_LIFETIME
  ) {
    return db;
  }

  try {
    const client = new MongoClient(
      String(
        "mongodb://gen_user:35B%3DR9GTC%5Cq.Xv@82.97.255.185:27017/core_logs?authSource=admin&directConnection=true"
      )
    );
    const connect = await client.connect();
    db = connect.db("core_logs");
    connectionTimestamp = Date.now();

    return db;
  } catch (e) {
    throw new Error("DB not initialized. Retry.");
  }
};
