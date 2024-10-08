import express from "express";
import authRoutes from "./auth.route.js";
import conversationRoutes from "./conversation.route.js";
import messagesRoutes from "./message.route.js";
import userRoutes from "./user.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", conversationRoutes);
router.use("/message", messagesRoutes);
router.use("/user", userRoutes);

export default router;
