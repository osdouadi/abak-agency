import mongoose, { Mongoose } from "mongoose";

const DB_URL = process.env.DATABASE_URL;

interface MongooseConnection {
  con: Mongoose | null;
  promise: Promise<Mongoose> | null
}

let cachedConnection: MongooseConnection = (global as any).mongoose;

if (!cachedConnection) {
  cachedConnection = (global as any).mongoose = {
    con: null,
    promise: null,
  };
}

export const connect = async () => {
  if (cachedConnection.con) return cachedConnection.con;

  cachedConnection.promise =
    cachedConnection.promise ||
    mongoose.connect(DB_URL, {
      dbName: "abak",
      bufferCommands: false,
      connectTimeoutMS: 3000,
    });

  cachedConnection.con = await cachedConnection.promise;
};
