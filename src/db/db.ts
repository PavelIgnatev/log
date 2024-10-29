"use server";

import { MongoClient, Db } from "mongodb";

let db: Db;

export const DB = async () => {
  if (!db) {
    while (!db) {
      try {
        console.log(process.env.DATABASE_URI)
        const client = new MongoClient(String(process.env.DATABASE_URI));
        const connect = await client.connect();
        db = connect.db("winston");
        break;
      } catch (e) {
        throw new Error("DB not initialized. Retry.");
      }
    }
  }

  return db;
};
