import mongoose from "mongoose";
import * as authRepository from "../data/auth.js";
import { getVirtualId } from "../database/database.js";

const tweetSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

getVirtualId(tweetSchema);

const Tweet = mongoose.model("Tweets", tweetSchema);

export async function getAll() {
  return Tweet.find({}).sort({ createdAt: -1 });
}
export async function getByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}
export async function getById(id) {
  return Tweet.findById(id);
}
export async function create(userId, text) {
  const { username, name, email, url } = await authRepository.findById(userId);
  const tweet = {
    text,
    username,
    name,
    email,
    url,
  };
  return new Tweet(tweet).save().then((data) => getById(data.id));
}
export async function update(id, text) {
  return Tweet.findOneAndUpdate({ id }, { text }, { returnDocument: "after" });
}
export async function remove(id) {
  return Tweet.findOneAndDelete({ id });
}
