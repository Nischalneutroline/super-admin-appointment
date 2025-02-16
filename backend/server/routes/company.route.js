import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../services/company.service.js";
import { upload, uploadToCloudinary } from "../middlewares/multer.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getCompanies);
router.get("/:id", protectRoute, getCompanyById);
router.post(
  "/",
  protectRoute,
  upload.single("panEinAttachment"),
  uploadToCloudinary("Appointment System/EINorPAN"),
  createCompany
);
router.put(
  "/:id",
  protectRoute,
  upload.single("panEinAttachment"),
  uploadToCloudinary("Appointment System/EINorPAN"),
  updateCompany
);

router.delete("/:id", protectRoute, deleteCompany);

export default router;
