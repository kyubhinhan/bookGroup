import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", require("./user"));

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
