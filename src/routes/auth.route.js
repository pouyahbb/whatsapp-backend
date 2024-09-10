import express from "express";
import {
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import trimRequest from "trim-request";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);
router.route("/login").post(trimRequest.all, login);
router.route("/logout").post(trimRequest.all, logout);
router.route("/refreshtoken").post(trimRequest.all, refreshToken);
router
  .route("/testingauthmiddleware")
  .get(trimRequest.all, authMiddleware, refreshToken);

export default router;
