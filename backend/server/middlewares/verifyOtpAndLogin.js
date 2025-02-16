import SuperAdmin from "../models/SuperAdmin.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";
import createResponse from "../utils/responseBuilder.js";

export const verifyOTPAndLogin = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  try {
    const superAdmin = await SuperAdmin.findOne({ phoneNumber });
    if (!superAdmin) {
      return res.status(404).json(
        createResponse({
          isSuccess: false,
          statusCode: 404,
          message: "SuperAdmin not found.",
        })
      );
    }

    if (superAdmin.otp !== otp || superAdmin.otpExpires < new Date()) {
      return res.status(401).json(
        createResponse({
          isSuccess: false,
          statusCode: 401,
          message: "Invalid or expired OTP.",
        })
      );
    }

    superAdmin.otp = null;
    superAdmin.otpExpires = null;
    await superAdmin.save();

    // Generate tokens
    const accessToken = generateAccessToken({
      id: superAdmin._id,
      role: superAdmin.role,
    });

    const refreshToken = generateRefreshToken({
      id: superAdmin._id,
      role: superAdmin.role,
    });

    // Save refresh token to the database (hashed)
    superAdmin.refreshToken = await bcrypt.hash(refreshToken, 10);
    await superAdmin.save();

    // Set tokens as HTTP-only cookies
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

    const superAdminObject = superAdmin.toObject();
    delete superAdminObject.password;
    delete superAdminObject.refreshToken;
    delete superAdminObject.otp;
    delete superAdminObject.otpExpires;

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
    console.error("Error in verifyOTPAndLogin:", error);

    res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "An error occurred during OTP verification.",
        error: error.message,
      })
    );
  }
};
