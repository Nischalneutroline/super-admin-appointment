import axios from "axios";
import constants from "../../Constants";

const registerSuperAdminService = async (userData) => {
  try {
    const response = await axios.post(
      `${constants.BASE_BACKEND_URL}/api/auth/register`,
      userData
    );
    console.log("The respons e", response);

    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);

    return {
      isSuccess: false,
      message: "An error occurred during registration.",
      error: error.response?.data || error.message,
    };
  }
};

// Login Super Admin Service
const loginSuperAdminService = async (loginData) => {
    try {
      const response = await axios.post(
        `${constants.BASE_BACKEND_URL}/api/auth/login`,
        loginData
      );
      console.log("The response", response);
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      return {
        isSuccess: false,
        message: "An error occurred during login.",
        error: error.response?.data || error.message,
      };
    }
  };
const authServices = {
  registerSuperAdminService,
  loginSuperAdminService
};

export default authServices;
