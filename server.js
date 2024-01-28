import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./middleware/authMiddleware.js";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not Found!" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
