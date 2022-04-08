import { getUsers } from "../database/database.js";
import MongoDB from "mongodb";

// let auths = [
//   {
//     username: "ray",
//     name: "minhong",
//     email: "suwonchkmh@naver.com",
//     url: "https://www.naver.com",
//     password: "$2b$10$SMNd.SfigZtE1igpQeL69ueA/CGA6ovf2tWkAzcM1IMsqfP4i1HNe",
//     id: "1",
//   },
//   {
//     username: "riddong",
//     name: "riwoo",
//     email: "riwoo@gamail.com",
//     password: "$2b$10$SMNd.SfigZtE1igpQeL69ueA/CGA6ovf2tWkAzcM1IMsqfP4i1HNe",
//     url: "https://www.google.com",
//     id: "2",
//   },
// ];

export async function getAll() {
  // return auths;
}
export async function findByUsername(username) {
  return getUsers()
    .findOne({ username }) //
    .then(mapOptionalUser);
}
export async function findById(id) {
  return getUsers()
    .findOne({ _id: new MongoDB.ObjectId(id) }) //
    .then(mapOptionalUser);
}
export async function createUser(username, name, email, password, url) {
  const user = {
    username,
    name,
    email,
    password,
    url,
  };
  return getUsers()
    .insertOne(user) //
    .then((data) => {
      return data.insertedId.toString();
    });
}

function mapOptionalUser(user) {
  return user ? { ...user, id: user._id } : user;
}
