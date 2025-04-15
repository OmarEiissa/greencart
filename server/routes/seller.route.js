import express from "express";
import {
  sellerLogin,
  isSellerAuth,
  sellerLogout,
} from "../controllers/seller.controller.js";
import authSeller from "../middlewares/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.post("/logout", sellerLogout);

export default sellerRouter;
