import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// 새로운 user 생성
app.post("/users", async (req, res) => {
  const { nickName } = req.body;

  const user = await prisma.user.create({
    data: {
      nickName: nickName,
    },
  });

  res.json(user);
});

// user nickName 수정
app.put("/users", async (req, res) => {
  const { id, nickName } = req.body;

  const updateUser = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      nickName: nickName,
    },
  });

  res.json(updateUser);
});

// 기존 user 삭제
app.delete("/users", async (req, res) => {
  const { id } = req.query;

  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(deleteUser);
});

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
