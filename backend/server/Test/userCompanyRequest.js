import express from "express";
import CompanyRequest from "../models/CompanyRequests.js";
import Joi from "joi";

export const sendCompanyRegistrationRequest = async (req, res) => {
  console.log(req.body);

  const { startDate } = req.body;

  // Validate the startDate as an ISO string before converting it
  const schema = Joi.object({
    companyName: Joi.string().required().trim(),
    EINorPAN: Joi.string()
      .required()
      .regex(/^[A-Z0-9]+$/)
      .message("EIN/PAN should be alphanumeric and uppercase"),
    panEinAttachment: Joi.string().optional(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .regex(/^\+?[0-9]*$/)
      .message("Please enter a valid phone number")
      .required(),
    website: Joi.string().uri().optional(),
    fax: Joi.string()
      .regex(/^\+?[0-9]*$/)
      .message("Please enter a valid fax number")
      .optional(),
    lineOfBusiness: Joi.string().required(),
    naicsCode: Joi.string().optional(),
    country: Joi.string().required(),
    address: Joi.object({
      streetAddress1: Joi.string().required(),
      streetAddress2: Joi.string().optional(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      postalCode: Joi.string().required(),
    }).required(),
    pointOfContact: Joi.object({
      name: Joi.string().required(),
      designation: Joi.string().optional(),
      email: Joi.string().email().required(),
      contactMobile: Joi.string()
        .regex(/^\+?[0-9]*$/)
        .message("Invalid phone number")
        .optional(),
      phoneWork: Joi.string().optional(),
    }).required(),
    startDate: Joi.date().required().messages({
      "date.base": "Date is required and must be a valid date.",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  // Convert startDate to a Date object
  const newStartDate = new Date(startDate);

  const {
    companyName,
    EINorPAN,

    email,
    phoneNumber,
    website,
    fax,
    lineOfBusiness,
    naicsCode,
    country,
    address,
    pointOfContact,
  } = req.body;

  const panEinAttachment =
    (req.file ? req.file.cloudinaryUrl : null,
    {
      folder: "Appointment System/Company-Requests/EINorPAN",
      width: 200,
      height: 200,
      crop: "thumb",
    });

  try {
    const newRequest = new CompanyRequest({
      companyName,
      EINorPAN,
      panEinAttachment,
      email,
      phoneNumber,
      website,
      fax,
      lineOfBusiness,
      naicsCode,
      country,
      address,
      pointOfContact,
      startDate: newStartDate,
    });

    await newRequest.save();

    return res.status(201).json({
      status: "success",
      message: "Company registration request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error. Please try again later.",
    });
  }
};
