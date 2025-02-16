import jwt from "jsonwebtoken";
import app_config from "../config/appConfig.js";
import crypto from "crypto";

/**
 * Generates an access token.
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, app_config.jwt_secret, {
    expiresIn: "15m",
  });
};

/**
 * Generates a refresh token.
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, app_config.refresh_token_secret, {
    expiresIn: "7d",
  });
};

/**
 * Generates a password reset token.
 */
export const createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // Hash the token
  const expiresAt = Date.now() + 10 * 60 * 1000;

  return {
    resetToken,
    hashedToken,
    expiresAt,
  };
};
