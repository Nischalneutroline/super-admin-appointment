import express from "express";
import {
  forgotPassword,
  loginSuperAdmin,
  loginWithPhoneNumber,
  registerSuperAdmin,
  resetPassword,
  refreshAccessToken,
} from "../services/auth.service.js";
import { verifyOTPAndLogin } from "../middlewares/verifyOtpAndLogin.js";

const router = express.Router();

router.post("/register", registerSuperAdmin);
router.post("/login", loginSuperAdmin);
router.post("/login-with-phone", loginWithPhoneNumber);
router.post("/verify-otp", verifyOTPAndLogin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/refreshAccessToken", refreshAccessToken);

export default router;
