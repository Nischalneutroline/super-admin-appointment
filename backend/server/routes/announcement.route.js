import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  updateAnnouncement,
} from "../services/announcement.service.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createAnnouncement);
router.put("/:id", protectRoute, updateAnnouncement);
router.delete("/:id", protectRoute, deleteAnnouncement);

export default router;
