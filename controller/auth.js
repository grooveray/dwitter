import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";

const saltRounds = 10;
const secretKey = "012486abc";

const createToken = async (user) => {
  const { id, username } = user;
  const token = await jwt.sign({ id, username }, secretKey, {
    expiresIn: "2d",
  });
  if (!token) {
    return res.status(401).json({ msg: "cannot create token" });
  }
  return token;
};

export async function signup(req, res, next) {
  const { username, name, email, password, url } = req.body;
  if (!(username && name && email && password)) {
    return res.status(401).json({ msg: "invalid inputs" });
  }
  const isDuplicated = await authRepository.findByUsername(username);
  if (isDuplicated)
    return res.status(401).json({ msg: `USERNAME ${username} is exists` });

  const isMatchedId = async (intId) => {
    const id = intId.toString();
    const found = await authRepository.findById(id);
    return !!found;
  };
  const auths = await authRepository.getAll();
  const nextId = await (isMatchedId(auths.length + 1)
    ? (parseInt(auths[auths.length - 1].id) + 1).toString()
    : (auths.length + 1).toString());
  const hashed = await bcrypt.hash(password, saltRounds);
  const auth = {
    username,
    name,
    email,
    password: hashed,
    url,
    id: nextId,
  };
  await auths.push(auth);
  const token = await createToken(nextId);
  res.status(201).json({ username, token });
}
export async function login(req, res, next) {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(401).json({ msg: "invalid inputs" });
  }
  const user = await authRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ msg: `USERNAME ${username} not found` });
  }
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched)
    return res.status(401).json({ msg: "inputs was wrong" });
  const token = await createToken(user);
  res.status(200).json({ username, token });
}
