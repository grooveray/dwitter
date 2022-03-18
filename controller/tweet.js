import * as tweetRepository from "../data/tweet.js";

function resError(req, res, msg) {
  return res.status(401).json({ msg: `${msg} was Wrong..` });
}

export async function getTweets(req, res) {
  const { username } = req.query;
  if (!username) {
    const tweets = await tweetRepository.getAll();
    return res.status(200).json(tweets);
  }
  const found = await tweetRepository.getByUsername(username);
  if (!found || found.length === 0) {
    resError(req, res, "USERNAME");
  }
  res.status(200).json(found);
}
export async function getTweetById(req, res) {
  const id = req.params.id;
  if (!id) {
    resError(req, res, "ID");
  }
  const found = await tweetRepository.getById(id);
  if (!found) {
    resError(req, res, `ID ${id}`);
  }
  res.status(200).json(found);
}
export async function createTweet(req, res) {
  const { username, name, text, email, url } = req.body;
  const tweet = await tweetRepository.create(username, name, text, email, url);
  res.status(201).json(tweet);
}
export async function updateTweet(req, res) {
  const id = req.params.id;
  if (!id) {
    resError(req, res, "ID");
  }
  const { text } = req.body;
  if (!text) {
    resError(req, res, `text`);
  }
  const tweets = await tweetRepository.update(id, text);
  res.status(201).json(tweets);
}
export async function removeTweet(req, res) {
  const id = req.params.id;
  if (!id) {
    resError(req, res, "ID");
  }
  await tweetRepository.remove(id);
  res.sendStatus(204);
}
