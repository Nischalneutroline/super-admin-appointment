import express from "express";
import createResponse from "../utils/responseBuilder.js";
import { announcementValidationSchema } from "../utils/validationUtils.js";
import Announcement from "../models/Announcement.js";
import mongoose from "mongoose";

export const createAnnouncement = async (req, res) => {
  const { error } = announcementValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json(
      createResponse({
        isSuccess: false,
        statusCode: 400,
        message: "Validation error.",
        error: error.details.map((err) => err.message),
      })
    );
  }
  try {
    const { title, description, message, date } = req.body;
    const announcement = new Announcement({
      title,
      description,
      message,
      date,
    });

    await announcement.save();
    return res.status(201).json(
      createResponse({
        isSuccess: true,
        statusCode: 201,
        message: "Announcement created successfully.",
        data: announcement,
      })
    );
  } catch (error) {
    console.error("Error creating announcement:", error);
    return res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to create announcement.",
        error: error.message,
      })
    );
  }
};

export const updateAnnouncement = async (req, res) => {
  const { error } = announcementValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json(
      createResponse({
        isSuccess: false,
        statusCode: 400,
        message: "Validation error.",
        error: error.details.map((err) => err.message),
      })
    );
  }

  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "Invalid announcement ID format.",
        })
      );
    }

    // Find and update the announcement
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json(
        createResponse({
          isSuccess: false,
          statusCode: 404,
          message: "Announcement not found.",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "Announcement updated successfully.",
        data: updatedAnnouncement,
      })
    );
  } catch (error) {
    console.error("Error updating announcement:", error);
    return res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to update announcement.",
        error: error.message,
      })
    );
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json(
        createResponse({
          isSuccess: false,
          statusCode: 400,
          message: "Invalid announcement ID format.",
        })
      );
    }
    // Find and delete the announcement
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      return res.status(404).json(
        createResponse({
          isSuccess: false,
          statusCode: 404,
          message: "Announcement not found.",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        isSuccess: true,
        statusCode: 200,
        message: "Announcement deleted successfully.",
        data: deletedAnnouncement,
      })
    );
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return res.status(500).json(
      createResponse({
        isSuccess: false,
        statusCode: 500,
        message: "Failed to delete announcement.",
        error: error.message,
      })
    );
  }
};
