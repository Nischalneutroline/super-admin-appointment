import SuperAdmin from "../models/SuperAdmin.js";
import createResponse from "../utils/responseBuilder.js";
import { registerSchema, loginSchema } from "../utils/validationUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  createPasswordResetToken,
} from "../utils/generateTokens.js";
import app_config from "../config/appConfig.js";

import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import { generateOTP, sendOTP } from "../utils/otpUtils.js";

export const registerSuperAdmin = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(
      createResponse({
        isSuccess: false,
        statusCode: 400,
        message: "Validation error.",
        error: error.details.map((error) => error.message),
      })
    );
  }
  try {
    const { fullName, email, password, confirmPassword, phoneNumber } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "Passwords do not match.",
        })
      );
    }

    // Check if SuperAdmin already exists
    const existingSuperAdmin = await SuperAdmin.findOne({ email });
    if (existingSuperAdmin) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "SuperAdmin with this email already exists.",
        })
      );
    }

    // Create new SuperAdmin
    const superAdmin = await SuperAdmin.create({
      fullName,
      email,
      password,
      phoneNumber,
    });

    // Remove password from the response
    const superAdminObject = superAdmin.toObject();
    delete superAdminObject.password;

    res.status(201).json(
      createResponse({
        isSuccess: true,
        statusCode: 201,
        message: "SuperAdmin registered successfully.",
        data: superAdminObject,
      })
    );
  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to register SuperAdmin.",
        error: error.message,
      })
    );
  }
};

export const loginSuperAdmin = async (req, res) => {
  // Validate request body
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json(
      createResponse({
        isSuccess: false,
        statusCode: 400,
        message: "Validation error.",
        error: error.details.map((err) => err.message),
      })
    );
  }

  try {
    const { email, password } = req.body;

    // Find SuperAdmin by email
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(401).json(
        createResponse({
          isSuccess: false,
          statusCode: 401,
          message: "Invalid email or password.",
        })
      );
    }

    // Compare passwords
    const isPasswordValid = await superAdmin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json(
        createResponse({
          isSuccess: false,
          statusCode: 401,
          message: "Invalid email or password.",
        })
      );
    }

    const accessToken = generateAccessToken({
      id: superAdmin._id,
      role: superAdmin.role,
    });

    const refreshToken = generateRefreshToken({
      id: superAdmin._id,
      role: superAdmin.role,
    });

    superAdmin.refreshToken = bcrypt.hash(refreshToken, 10);
    await superAdmin.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: app_config.node_env === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: app_config.node_env === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Remove password from the response
    const superAdminObject = superAdmin.toObject();
    delete superAdminObject.password;
    delete superAdminObject.refreshToken;

    res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "Login successful.",
        data: {
          superAdmin: superAdminObject,
        },
      })
    );
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "An error occurred during login.",
        error: error.message,
      })
    );
  }
};

export const loginWithPhoneNumber = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber);

  try {
    const superAdmin = await SuperAdmin.findOne({ phoneNumber });
    if (!superAdmin) {
      return res.status(401).json(
        createResponse({
          isSuccess: false,
          statusCode: 401,
          message: "SuperAdmin not found.",
        })
      );
    }

    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    // Save OTP and its expiration time to the database
    superAdmin.otp = otp;
    superAdmin.otpExpires = otpExpires;
    await superAdmin.save();

    // Send OTP to the user's phone number
    await sendOTP(phoneNumber, otp);
    res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "OTP sent successfully.",
      })
    );
  } catch (error) {
    console.error("Error finding SuperAdmin:", error);
    return res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to find SuperAdmin.",
        error: error.message,
      })
    );
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(404).json(
        createResponse({
          isSuccess: false,
          statusCode: 404,
          message: "SuperAdmin not found.",
        })
      );
    }

    const { resetToken, hashedToken, expiresAt } = createPasswordResetToken();

    superAdmin.passwordResetToken = hashedToken;
    superAdmin.passwordResetExpires = expiresAt;
    await superAdmin.save();

    // Generate reset link
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;
    const message = `Forgot your password? Click the link below to reset your password:\n\n${resetURL}\n\nIf you didn't request this, please ignore this email.`;

    try {
      // Send the reset link to the user's email
      await sendEmail({
        to: superAdmin.email,
        subject: "Password Reset Request",
        text: message,
      });

      // Respond to the client
      res.status(200).json(
        createResponse({
          isSuccess: true,
          statusCode: 200,
          message: "Password reset link sent successfully to your email.",
        })
      );
    } catch (error) {
      // Clear the token and expiration if email sending fails
      superAdmin.passwordResetToken = undefined;
      superAdmin.passwordResetExpires = undefined;
      await superAdmin.save();

      return res.status(500).json(
        createResponse({
          isSuccess: false,
          statusCode: 500,
          message: "Failed to send password reset email.",
          error: error.message,
        })
      );
    }
  } catch (error) {
    console.error("Forgot Password Error:", error);
    next(error); // Pass to the global error handler
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const superAdmin = await SuperAdmin.findOne({ passwordResetToken: token });
    if (!superAdmin) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "Invalid token or user not found.",
        })
      );
    }

    if (Date.now() > superAdmin.passwordResetExpires) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "Password reset token has expired.",
        })
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    superAdmin.password = hashedPassword;
    superAdmin.passwordResetToken = undefined;
    superAdmin.passwordResetExpires = undefined;
    await superAdmin.save();

    res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "Password reset successful.",
      })
    );
  } catch (error) {
    console.error("Reset Password Error:", error);
    next(error);
  }
};

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json(
      createResponse({
        isSuccess: false,
        statusCode: 401,
        message: "No refresh token provided.",
      })
    );
  }

  try {
    const decoded = jwt.verify(refreshToken, app_config.refresh_token_secret);

    const newAccessToken = generateAccessToken(decoded.sub);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: app_config.node_env === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "Access token refreshed successfully.",
      })
    );
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Refresh token has expired."
        : "Invalid refresh token.";

    return res.status(401).json(
      createResponse({
        isSuccess: false,
        statusCode: 401,
        message,
      })
    );
  }
};
