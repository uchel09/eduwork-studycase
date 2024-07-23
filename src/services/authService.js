import { ResponseError } from "../middlewares/responseError.js";
import userModel from "../models/userModel.js";
import JwtUtils from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  static async registerUser(userData) {
    const { email, password, fullname } = userData;

    // Validasi email dan role
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new ResponseError(400, `${email} already exist`);
    }

    const newUser = new userModel({
      email,
      password,
      fullname,
    });

    await newUser.save();

    return newUser;
  }

  // ======== LOGIN ==============
  static async loginUser(userReq) {
    const { email, password } = userReq;
    const user = await userModel
      .findOne({ email })
      .select("-createdAt -updatedAt -__v");

    if (!user) {
      throw new ResponseError(422, "email or password incorrect");
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new ResponseError(422, "email or password incorrect");
    }

    user.password = "";

    const accessToken = await JwtUtils.createAccessToken({
      user,
    });

    const refreshToken = await JwtUtils.createRefreshToken({ _id: user._id });

    return { accessToken, refreshToken,user };
  }

  //============= Generate access token for request ===============
  static async generateAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new ResponseError(400, "please login and try again...");
    }

    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );


    const user = await userModel
      .findById(decoded._id)
      .select("-password -createdAt -updatedAt");

    if (!user) {
      throw new ResponseError(400, "please login and try again...");
    }

    const accessToken = await JwtUtils.createAccessToken({ user });

    return { accessToken, user };
  }
}

export default AuthService;
