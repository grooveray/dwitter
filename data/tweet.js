import * as authRepository from "../data/auth.js";
import { getTweets } from "../database/database.js";
import MongoDB from "mongodb";

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray();
}
export async function getByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapUser);
}
export async function getById(id) {
  return getTweets()
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalUser);
}
export async function create(userId, text) {
  const { username, name, email, url } = await authRepository.findById(userId);
  const user = {
    text,
    username,
    name,
    email,
    url,
    createdAt: new Date(),
  };
  return getTweets()
    .insertOne(user)
    .then((data) => getById(data.insertedId.toString()));
}
export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((data) => mapOptionalUser(data.value));
}
export async function remove(id) {
  return getTweets()
    .deleteOne({ _id: new MongoDB.ObjectId(id) })
    .then(console.log);
}

function mapUser(tweets) {
  return tweets.map(mapOptionalUser);
}
function mapOptionalUser(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
