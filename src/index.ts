import express from "express";
import userRouter from "./user";
import loginRouter from "./login";
import authJWt from "./authJWT";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRouter);

// token이 필요한 요청 url
app.use("/user", authJWt, userRouter);

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
