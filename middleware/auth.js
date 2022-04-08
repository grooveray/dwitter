import jwt from "jsonwebtoken";
import * as authRepository from "../data/auth.js";
import config from "../config.js";

const secretKey = config.jwt.secretKey;

const AUTH_ERROR = { msg: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    res.status(403).json(AUTH_ERROR);
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const found = await authRepository.findById(decoded.id);
    if (!found) {
      return res.status(401).json(AUTH_ERROR);
    }

    req.userId = found.id;
    req.token = token;
    next();
  });
};
