let auths = [
  {
    username: "ray",
    name: "minhong",
    email: "suwonchkmh@naver.com",
    url: "https://www.naver.com",
    password: "$2b$10$SMNd.SfigZtE1igpQeL69ueA/CGA6ovf2tWkAzcM1IMsqfP4i1HNe",
    id: "1",
  },
  {
    username: "riddong",
    name: "riwoo",
    email: "riwoo@gamail.com",
    password: "$2b$10$SMNd.SfigZtE1igpQeL69ueA/CGA6ovf2tWkAzcM1IMsqfP4i1HNe",
    url: "https://www.google.com",
    id: "2",
  },
];

export async function getAll() {
  return auths;
}
export async function findByUsername(username) {
  const user = auths.find((auth) => auth.username === username);
  if (!user) return null;
  return user;
}
export async function findById(id) {
  const user = auths.find((auth) => auth.id === id);
  if (!user) return null;
  return user;
}
export async function createUser(username, name, email, password, url) {
  const allAuthLists = await getAll();

  const isMatchedId = async (intId) => {
    const id = intId.toString();
    const found = await findById(id);
    return !!found;
  };

  const nextId = isMatchedId(allAuthLists.length + 1)
    ? (parseInt(allAuthLists[allAuthLists.length - 1].id) + 1).toString()
    : (allAuthLists.length + 1).toString();
  const auth = {
    username,
    name,
    email,
    password,
    url,
    id: nextId,
  };
  auths.push(auth);
  return auth;
}
