import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = String(process.env.SECRETKEY);

class TokenUtil {
  // 토큰 발급
  sign(payload: Payload) {
    if (!payload.id || !payload.role) return "";
    return JWT.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "1h",
    });
  }

  // refreshToken 발급
  refresh(payload: Payload) {
    // refresh token 발급
    return JWT.sign(payload, secretKey, {
      algorithm: "HS256",
      expiresIn: "14d", // secretKey는 유효기간이 14일
    });
  }

  // 토큰 검증
  // todo : catch의 errortype 찾기.. 못찾겠음..ㅠ
  verify(token: string) {
    // access token 검증
    try {
      const decoded = JWT.verify(token, secretKey);
      return {
        valid: true,
        id: (decoded as Payload).id,
        role: (decoded as Payload).role,
      };
    } catch (err: any) {
      return {
        valid: false,
        message: err.message,
      };
    }
  }
}

interface Payload {
  id: string;
  role: string;
}

export default new TokenUtil();
export type { Payload };
