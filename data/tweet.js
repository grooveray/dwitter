import * as authRepository from "../data/auth.js";
import { getTweets, getUsers } from "../database/database.js";
import MongoDB from "mongodb";

let tweets = [
  {
    id: "1",
    text: "min hong is good",
    userId: "1",
  },
  {
    id: "2",
    text: "riddong is great",
    userId: "2",
  },
];

export async function getAll() {
  return getTweets().find().sort({ createdAt: -1 }).toArray();
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const { username, name, email, password, url } =
  //       await authRepository.findById(tweet.userId);
  //     return { ...tweet, username, name, email, password, url };
  //   })
  // );
  // tweets = await tweets.map(async (tweet) => {
  //   const { username, name, email, password, url } =
  //     await authRepository.findById(tweet.userId);
  //   return { ...tweet, username, name, email, password, url };
  // });
  // console.log(tweets);
  // return tweets;
}
export async function getByUsername(username) {
  return getTweets()
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapUser);
  // const found = getAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username === username)
  // );
  // if (!username) return null;
  // return found; // return []
}
export async function getById(id) {
  return getTweets()
    .findOne({ _id: new MongoDB.ObjectId(id) })
    .then(mapOptionalUser);
  // const found = getAll().then((tweets) =>
  //   tweets.find((tweet) => tweet.id === id)
  // );
  // if (!found) return null;
  // return found; // return {}
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
  // const isMatchedId = async (intId) => {
  //   const id = intId.toString();
  //   const found = await tweets.find((tweet) => tweet.id === id);
  //   return !!found;
  // };
  // const nextId = await (isMatchedId(tweets.length + 1)
  //   ? (parseInt(tweets[tweets.length - 1].id) + 1).toString()
  //   : (tweets.length + 1).toString());
  // const tweet = {
  //   id: nextId,
  //   text,
  //   userId,
  //   createdAt: new Date(),
  // };
  // tweets.push(tweet);
  // return tweet; // return {}
}
export async function update(id, text) {
  return getTweets()
    .findOneAndUpdate(
      { _id: new MongoDB.ObjectId(id) },
      { $set: { text } },
      { returnDocument: "after" }
    )
    .then((data) => mapOptionalUser(data.value));
  // const found = getAll().then((tweets) =>
  //   tweets.find((tweet) => tweet.id === id)
  // );
  // if (!found) return null;
  // tweets = await tweets.map((tweet) =>
  //   tweet.id === id ? { ...tweet, text } : tweet
  // );
  // return tweets; //return []
}
export async function remove(id) {
  return getTweets()
    .deleteOne({ _id: new MongoDB.ObjectId(id) })
    .then(console.log);
  // tweets = getAll().then((tweets) =>
  //   tweets.filter((tweet) => !(tweet.id === id))
  // );
}

function mapUser(tweets) {
  return tweets.map(mapOptionalUser);
}
function mapOptionalUser(tweet) {
  return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}
