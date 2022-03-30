import express from "express";
import { body, validationResult } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";

const route = express.Router();

const validator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("username should be at least 2 characters"),
  body("name").notEmpty().withMessage("name is required").trim(),
  body("text")
    .notEmpty()
    .withMessage("text is required")
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("invalid email"),
  body("url"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(400).json(errors.array()[0]);
  },
];

route.get("/", isAuth, tweetController.getTweets);
route.get("/:id", isAuth, tweetController.getTweetById);
route.post("/", isAuth, validator, tweetController.createTweet);
route.put("/:id", isAuth, tweetController.updateTweet);
route.delete("/:id", isAuth, tweetController.removeTweet);

export default route;
