import express from "express";
import * as authController from "../controller/auth.js";
import { body, validationResult } from "express-validator";

const route = express.Router();

const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("username should be at least 2 characters"),
  body("password")
    .notEmpty()
    .withMessage(" password is required")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("password should be 3~12 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json(errors.array()[0]);
  },
];
const validator = [
  body("name").notEmpty().withMessage("name is required").trim(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("invalid email"),
  body("url")
    .trim()
    .isURL()
    .withMessage("invalid url")
    .optional({ nullable: true, checkFalsy: true }),
  ...loginValidator,
];

route.post("/signup", validator, authController.signup);
route.post("/login", loginValidator, authController.login);
route.get("/me");

export default route;
