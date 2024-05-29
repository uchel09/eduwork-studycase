import jwt from "jsonwebtoken";

class JwtUtils {
  static async createAccessToken(payload) {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return token
  }

  static async createRefreshToken(payload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
}

export default JwtUtils;
