import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app_config = Object.freeze({
  port: process.env.PORT || 3000,
  db_url: process.env.MONGO_URI,
  jwt_secret: process.env.JWT_SECRET_KEY,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET_KEY,
  jwt_expiration: process.env.JWT_EXPIRATION,
  node_env: process.env.NODE_ENV,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: Number(process.env.SMTP_PORT),
  smtp_secure: process.env.SMTP_SECURE === "true",
  smtp_user: process.env.SMTP_USER,
  smtp_pass: process.env.SMTP_PASS,
  twilio_sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone: process.env.TWILIO_PHONE_NUMBER,
});

export default app_config;
