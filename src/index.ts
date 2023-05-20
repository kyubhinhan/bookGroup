import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// user 관련 api
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// nickName 중복체크
// 중복되면 true, 중복되지 않으면 false return
app.get("/users/duplicateCheck", async (req, res) => {
  const nickName = String(req.query.nickName);
  const user = await prisma.user.findUnique({
    where: {
      nickName: nickName,
    },
  });
  res.json(user ? true : false);
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
