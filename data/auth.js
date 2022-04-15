import { getUsers } from "../database/database.js";
import MongoDB from "mongodb";

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
  return user ? { ...user, id: user._id.toString() } : user;
}
