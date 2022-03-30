let auths = [
  {
    username: "ray",
    name: "minhong",
    email: "suwonchkmh@naver.com",
    url: "https://www.naver.com",
    id: "1",
  },
  {
    username: "riddong",
    name: "riwoo",
    email: "riwoo@gamail.com",
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
