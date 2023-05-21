import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();
const prisma = new PrismaClient();

// 새로운 user 생성
router.post("/", async (req, res) => {
  const { nickName } = req.body;

  const user = await prisma.user.create({
    data: {
      nickName: nickName,
    },
  });

  res.json(user);
});

// user nickName 수정
router.put("/", async (req, res) => {
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
router.delete("/", async (req, res) => {
  const { id } = req.query;

  const deleteUser = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(deleteUser);
});

// nickName 중복체크
// 중복되면 true, 중복되지 않으면 false return
router.get("/duplicateCheck", async (req, res) => {
  const nickName = String(req.query.nickName);
  const user = await prisma.user.findUnique({
    where: {
      nickName: nickName,
    },
  });
  res.json(user ? true : false);
});

module.exports = router;
