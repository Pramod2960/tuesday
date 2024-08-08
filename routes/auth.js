import express from "express";
import { handleSignupPage, handleLoginPage } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", handleLoginPage);

router.post("/signup", handleSignupPage);

export default router;
