import jwt from "jsonwebtoken";
import SuperAdmin from "../models/SuperAdmin.js";
import createResponse from "../utils/responseBuilder.js";
import app_config from "../config/appConfig.js";

const protectRoute = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1] ||
      null;

    if (!token) {
      return res.status(401).json(
        createResponse({
          isSuccess: false,
          statusCode: 401,
          message: "You are not authorized to access this resource.",
        })
      );
    }

    jwt.verify(token, app_config.jwt_secret, async (err, decoded) => {
      if (err) {
        const message =
          err.name === "TokenExpiredError"
            ? "Token has expired."
            : "Invalid token.";
        return res.status(401).json(
          createResponse({
            isSuccess: false,
            statusCode: 401,
            message,
          })
        );
      }

      const superAdmin = await SuperAdmin.findById(decoded.sub).select(
        "-password"
      );

      if (!superAdmin) {
        return res.status(401).json(
          createResponse({
            isSuccess: false,
            statusCode: 401,
            message: "SuperAdmin not found.",
          })
        );
      }

      req.authenticatedSuperAdmin = superAdmin;
      next();
    });
  } catch (error) {
    console.error(
      `[ProtectRoute] Error: ${error.message}, Path: ${req.originalUrl}`
    );
    res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to authenticate token.",
        error: error.message,
      })
    );
  }
};

export default protectRoute;
