let tweets = [
  {
    id: "1",
    username: "ray",
    name: "Minhong",
    text: "min hong is good",
    email: "minhong@naver.com",
    url: "https://www.minhong.com",
  },
  {
    id: "2",
    username: "riddong",
    name: "Riwoo",
    text: "riddong is great",
    email: "riwoo@naver.com",
    url: "https://www.riwoo.com",
  },
];

export async function getAll() {
  return tweets; // return []
}
export async function getByUsername(username) {
  const found = await tweets.filter((tweet) => tweet.username === username);
  if (!username) return null;
  return found; // return []
}
export async function getById(id) {
  const found = await tweets.find((tweet) => tweet.id === id);
  if (!found) return null;
  return found; // return {}
}
export async function create(username, name, text, email, url) {
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
    username,
    name,
    text,
    email,
    url,
  };
  tweets.push(tweet);
  return tweet; // return {}
}
export async function update(id, text) {
  const found = await tweets.find((tweet) => tweet.id === id);
  if (!found) return null;
  tweets = await tweets.map((tweet) =>
    tweet.id === id ? { ...tweet, text } : tweet
  );
  return tweets; //return []
}
export async function remove(id) {
  tweets = await tweets.filter((tweet) => !(tweet.id === id));
  return;
}
