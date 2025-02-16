// utils/responseBuilder.js

const createResponse = ({
  isSuccess,
  statusCode,
  message,
  data = null,
  error = null,
}) => {
  return {
    isSuccess,
    statusCode,
    message,
    data,
    error,
  };
};

export default createResponse;
