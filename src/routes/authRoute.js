import express from "express";
import authCtrl from "../controllers/authCtrl.js";


export const authRouter = express.Router();


authRouter.post("/register", authCtrl.register);
authRouter.post("/login", authCtrl.login);
authRouter.get("/refresh-token", authCtrl.generateNewAccessToken);
authRouter.get("/logout", authCtrl.logout);
