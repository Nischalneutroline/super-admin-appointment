import express from "express";
import { sendCompanyRegistrationRequest } from "./userCompanyRequest.js";
import {
  getPendingCompanyRequests,
  handleCompanyRequest,
} from "../services/company.service.js";
import { upload, uploadToCloudinary } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/",
  upload.single("panEinAttachment"),
  uploadToCloudinary,
  sendCompanyRegistrationRequest
);
router.get("/", getPendingCompanyRequests);
router.put(
  "/:id/action",
  upload.single("panEinAttachment"),
  uploadToCloudinary,
  handleCompanyRequest
);

export default router;
