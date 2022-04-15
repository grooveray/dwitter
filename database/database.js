import mongoose from "mongoose";
import config from "../config.js";

let db;

export async function connectDB() {
  return mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export function getVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toObject", { virtuals: true });
}
export function getTweets() {
  return db.collection("tweets");
}
