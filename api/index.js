import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connectioned to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

// allow json as an input of the server
app.use(express.json());

app.use("/api/user/test", userRouter);

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
