import express from "express";
import {
  handleSignupPage,
  handleLoginPage,
  handleGetLogin,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", handleLoginPage);

router.post("/signup", handleSignupPage);

router.get("/login", handleGetLogin);

export default router;
