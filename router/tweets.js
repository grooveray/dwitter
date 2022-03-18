import express from "express";
import { body, validationResult } from "express-validator";
import * as tweetController from "../controller/tweet.js";

const route = express.Router();

const validator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("please enter 3~4chractors"),
  body("name").notEmpty().withMessage("name is required").trim(),
  body("text").notEmpty().withMessage("text is required"),
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

route.get("/", tweetController.getTweets);
route.get("/:id", tweetController.getTweetById);
route.post("/", validator, tweetController.createTweet);
route.put("/:id", tweetController.updateTweet);
route.delete("/:id", tweetController.removeTweet);

export default route;
