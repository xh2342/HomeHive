import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
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

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
