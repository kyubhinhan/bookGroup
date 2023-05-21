import express from "express";
import userRouter from "./user";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
