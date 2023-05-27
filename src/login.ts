import tokenUtil from "./util/tokenUtil";
import express, { Router } from "express";

const router: Router = express.Router();

// login 요청
router.post("/", async (req, res) => {
  const success = true;
  const payload = {
    id: "han",
    role: "master",
  };

  // login 성공 시, accessToken과 refreshToken을 발급해서 넘겨줌
  if (success) {
    // id, pw가 맞다면..
    // access token과 refresh token을 발급합니다.
    const accessToken = tokenUtil.sign(payload);
    const refreshToken = tokenUtil.refresh(payload);

    res.status(200).send({
      data: {
        accessToken,
        refreshToken,
      },
    });
  } else {
    res.status(401).send({
      message: "incorect login",
    });
  }
});

export default router;
