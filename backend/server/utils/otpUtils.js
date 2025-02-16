import twilio from "twilio";
import app_config from "../config/appConfig.js";

const accountSid = app_config.twilio_sid;
const authToken = app_config.twilio_auth_token;
const client = twilio(accountSid, authToken);

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

export const sendOTP = async (phoneNumber, otp) => {
  try {
    const formattedPhoneNumber = `+977${phoneNumber}`;
    await client.messages.create({
      body: `Your OTP for login is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhoneNumber, 
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP.");
  }
};
