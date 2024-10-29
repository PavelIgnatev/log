"use server";

import { MongoClient, Db } from "mongodb";

let db: Db;

export const DB = async () => {
  if (!db) {
    while (!db) {
      try {
        const client = new MongoClient(
          String(
            "mongodb://gen_user:%5C%7Dc%3C%24q%3C3j8O_%26g@193.108.115.154:27017/winston?authSource=admin&directConnection=true"
          )
        );
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
