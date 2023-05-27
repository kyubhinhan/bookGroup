import tokenUtil from "./util/tokenUtil";
import { Request, Response, NextFunction } from "express";

const authJWT = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    const result = tokenUtil.verify(token);
    if (result.valid) {
      (req as any).id = result.id;
      (req as any).role = result.role;
      next();
    } else {
      res.status(401).send({
        ok: false,
        message: result.message,
      });
    }
  }
};

export default authJWT;
