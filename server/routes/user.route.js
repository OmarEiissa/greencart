import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.post("/logout", logout);

export default userRouter;
