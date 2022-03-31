import * as authRepository from "../data/auth.js";

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
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, email, password, url } =
        await authRepository.findById(tweet.userId);
      return { ...tweet, username, name, email, password, url };
    })
  );
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
  const isMatchedId = async (intId) => {
    const id = intId.toString();
    const found = await tweets.find((tweet) => tweet.id === id);
    return !!found;
  };
  const nextId = await (isMatchedId(tweets.length + 1)
    ? (parseInt(tweets[tweets.length - 1].id) + 1).toString()
    : (tweets.length + 1).toString());
  const tweet = {
    id: nextId,
    text,
    userId,
    createdAt: Date.now(),
  };
  tweets.push(tweet);
  return tweet; // return {}
}
export async function update(id, text) {
  const found = getAll().then((tweets) =>
    tweets.find((tweet) => tweet.id === id)
  );
  if (!found) return null;
  tweets = await tweets.map((tweet) =>
    tweet.id === id ? { ...tweet, text } : tweet
  );
  return tweets; //return []
}
export async function remove(id) {
  tweets = getAll().then((tweets) =>
    tweets.filter((tweet) => !(tweet.id === id))
  );
  return;
}
