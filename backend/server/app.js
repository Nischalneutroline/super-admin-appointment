import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import companyRoute from "./routes/company.route.js";
import announcementRoute from "./routes/announcement.route.js";
import globalErrorHandler, {
  createErrorResponse,
} from "./middlewares/globalErrorHandler.js";
import companyRequestRoute from "./Test/companyRequestRoute.js"



const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/company", companyRoute);
app.use("/api/announcement", announcementRoute);
app.use("/api/company-requests", companyRequestRoute);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Appointment system running...",
    timestamp: new Date(),
  });
});

const notFoundHandler = (req, res, next) => {
  res
    .status(404)
    .json(createErrorResponse(404, "Not Found", "", "ROUTE NOT AVAILABLE"));
};

app.use(notFoundHandler);

app.use(globalErrorHandler);

export default app;
