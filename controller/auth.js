import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as authRepository from "../data/auth.js";
import config from "../config.js";

const saltRounds = config.bcrypt.saltRounds;
const secretKey = config.jwt.secretKey;
const expiresIn = config.jwt.expiresIn;

const createToken = (userId) => {
  const token = jwt.sign({ id: userId }, secretKey, {
    expiresIn,
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

  const hashed = await bcrypt.hash(password, saltRounds);

  const userId = await authRepository.createUser(
    username,
    name,
    email,
    hashed,
    url
  );
  const token = createToken(userId);
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
  const token = createToken(user.id);
  res.status(200).json({ username, token });
}
export async function me(req, res, next) {
  const { token, userId } = req;
  const found = await authRepository.findById(userId);
  if (!found) return res.status(403).json({ msg: "Authentication Error" });
  res.status(200).json({ token, username: found.username });
}
