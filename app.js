import express from "express";
import {} from "express-async-errors";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./database/database.js";

const app = express();

const port = 8080;

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(403).json({ msg: "Page Not Found" });
});
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ msg: "Server is Something Wrong" });
  }
});

connectDB()
  .then((db) => {
    console.log("MongoDB Connected..");
    app.listen(port, () => {
      console.log(`Server is Listening at PORT: ${port}..`);
    });
  })
  .catch((e) => console.error(e));
