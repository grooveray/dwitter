import mongoose from "mongoose";
import { getVirtualId } from "../database/database.js";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

getVirtualId(userSchema);

const User = mongoose.model("Users", userSchema);

export async function findByUsername(username) {
  return User.find({ username });
}
export async function findById(id) {
  return User.findById(id);
}
export async function createUser(username, name, email, password, url) {
  const user = {
    username,
    name,
    email,
    password,
    url,
  };
  return new User(user).save().then((data) => data.id);
}
