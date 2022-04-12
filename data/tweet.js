import * as authRepository from "../data/auth.js";
import MongoDB from "mongodb";
import { getTweets, getUsers } from "../database/database.js";

// let tweets = [
//   {
//     id: "1",
//     text: "min hong is good",
//     userId: "1",
//   },
//   {
//     id: "2",
//     text: "riddong is great",
//     userId: "2",
//   },
// ];

export async function getAll() {
  const tweets = await getTweets().find().toArray();
  const auths = await getUsers().find().toArray();

  return tweets.map((tweet) => {
    const auth = auths.find(
      (auth) => tweet.userId.toString() === auth._id.toString()
    );
    return { ...auth, ...tweet, id: tweet._id.toString() };
  });

  // tweets = await tweets.map(async (tweet) => {
  //   const { username, name, email, password, url } =
  //     await authRepository.findById(tweet.userId);
  //   return { ...tweet, username, name, email, password, url };
  // });
  // console.log(tweets);
  // return tweets;
}
export async function getByUsername(username) {
  const found = getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
  if (!username) return null;
  return found; // return []
}
export async function getById(id) {
  const found = getAll().then((tweets) =>
    tweets.find((tweet) => tweet.id === id)
  );
  if (!found) return null;
  return found; // return {}
}
export async function create(userId, text) {
  const user = {
    userId,
    text,
    createdAt: Date.now(),
  };
  return await getTweets()
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
  //   createdAt: Date.now(),
  // };
  // tweets.push(tweet);
  // return tweet; // return {}
}
export async function update(id, text) {
  const found = getAll().then((tweets) =>
    tweets.find((tweet) => tweet.id === id)
  );
  if (!found) return null;

  return await getTweets()
    .updateOne({ _id: new MongoDB.ObjectId(id) }, { $set: { text } })
    .then(() => getAll());
  // return tweets; //return []
}
export async function remove(id) {
  await getTweets().deleteOne({ _id: new MongoDB.ObjectId(id) });
  // tweets = getAll().then((tweets) =>
  //   tweets.filter((tweet) => !(tweet.id === id))
  // );
  return;
}
