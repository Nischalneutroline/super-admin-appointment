import nodemailer from "nodemailer";
import app_config from "../config/appConfig.js";

const sendEmail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: app_config.smtp_host,
    port: app_config.smtp_port,
    secure: app_config.smtp_secure,
    auth: {
      user: app_config.smtp_user,
      pass: app_config.smtp_pass,
    },
  });

  await transporter.sendMail({
    from: `"SuperAdmin" <${app_config.smtp_user}>`,
    to,
    subject,
    text,
  });
};

export default sendEmail;
