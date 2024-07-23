import AuthService from "../services/authService.js";

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.registerUser(req.body);

      res.status(201).json({
        success: true,
        message: "Register success",
        _id: user._id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const response = await AuthService.loginUser(req.body);

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        path: "/auth/refresh-token",
        maxAge: 7 * 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        accessToken: response.accessToken,
        user: response.user,
        message: "Login Success",
      });
    } catch (error) {
      next(error);
    }
  }

  static async generateNewAccessToken(req, res, next) {
    try {
      const { accessToken, user } = await AuthService.generateAccessToken(
        req.cookies.refreshToken
      );
      res.status(200).json({
        accessToken,
        user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async logout(req, res, next) {
    try {
      res.clearCookie("refreshToken", { path: "/auth/refresh-token" });
      return res.json({ success: true, message: "logout success" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
