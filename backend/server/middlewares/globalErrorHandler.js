import app_config from "../config/appConfig.js";

export const createErrorResponse = (
  statusCode,
  errorMessage,
  errorStack,
  errorCode = "INTERNAL SERVER ERROR"
) => ({
  StatusCode: statusCode,
  IsSuccess: false,
  ErrorMessage: [
    {
      message: errorMessage,
      errorStack: errorStack,
      errorCode,
    },
  ],
  Result: null,
});
const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err ? err.status || 500 : 500;
  const errorMessage =
    err && err.message ? err.message : "Internal Server Error";
  const errorStack =
    app_config.node_env === "development" && err ? err.stack : "Something went wrong";

  res
    .status(statusCode)
    .json(createErrorResponse(statusCode, errorMessage, errorStack));
};

export default globalErrorHandler;
