import Joi from "joi";

// SuperAdmin Registration Validation Schema
export const registerSchema = Joi.object({
  fullName: Joi.string().required().messages({
    "string.empty": "Full name is required.",
    "any.required": "Full name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "string.empty": "Confirm password is required.",
  }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Phone number must be exactly 10 digits.",
      "string.pattern.base": "Phone number must contain only digits.",
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
    }),
});

// SuperAdmin Login Validation Schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
});

export const companyValidationSchema = Joi.object({
  companyName: Joi.string().trim().required().max(100).messages({
    "string.empty": "Company name is required",
    "string.max": "Company name cannot exceed 100 characters",
  }),
  EINorPAN: Joi.string()
    .required()
    .pattern(/^[A-Z0-9]{10,15}$/)
    .messages({
      "string.empty": "EIN or PAN number is required",
      "string.pattern.base":
        "EIN/PAN should be 10-15 alphanumeric characters in uppercase",
    }),
  panEinAttachment: Joi.string().uri().messages({
    "string.uri": "Please provide a valid URL for the PAN/EIN attachment",
  }),
  status: Joi.string()
    .valid("Active", "Inactive", "Pending")
    .default("Pending"),
  startDate: Joi.date().required().messages({
    "date.base": "Start date is required",
  }),
  endDate: Joi.date().min(Joi.ref("startDate")).messages({
    "date.min": "End date must be after or equal to start date",
  }),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  phoneNumber: Joi.string()
    .required()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.empty": "Company phone number is required",
      "string.pattern.base": "Please enter a valid phone number (7-15 digits)",
    }),
  website: Joi.string().uri().messages({
    "string.uri": "Please enter a valid website URL",
  }),
  fax: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.pattern.base": "Please enter a valid fax number (7-15 digits)",
    }),
  lineOfBusiness: Joi.string().required().max(100).messages({
    "string.empty": "Line of business is required",
    "string.max": "Line of business cannot exceed 100 characters",
  }),
  naicsCode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .messages({
      "string.pattern.base": "NAICS code must be a 6-digit number",
    }),
  country: Joi.string().required().max(50).messages({
    "string.empty": "Country is required",
    "string.max": "Country name cannot exceed 50 characters",
  }),
  address: Joi.object({
    streetAddress1: Joi.string().required().max(100).messages({
      "string.empty": "Street Address 1 is required",
      "string.max": "Street Address 1 cannot exceed 100 characters",
    }),
    streetAddress2: Joi.string().max(100).messages({
      "string.max": "Street Address 2 cannot exceed 100 characters",
    }),
    city: Joi.string().required().max(50).messages({
      "string.empty": "City is required",
      "string.max": "City name cannot exceed 50 characters",
    }),
    state: Joi.string().required().max(50).messages({
      "string.empty": "State is required",
      "string.max": "State name cannot exceed 50 characters",
    }),
    postalCode: Joi.string()
      .required()
      .pattern(/^[A-Z0-9\-]{5,10}$/)
      .messages({
        "string.empty": "Postal code is required",
        "string.pattern.base": "Please enter a valid postal code",
      }),
  }).required(),
  pointOfContact: Joi.object({
    name: Joi.string().required().max(50).messages({
      "string.empty": "Point of contact name is required",
      "string.max": "Name cannot exceed 50 characters",
    }),
    designation: Joi.string().max(50).messages({
      "string.max": "Designation cannot exceed 50 characters",
    }),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } })
      .messages({
        "string.empty": "Point of contact email is required",
        "string.email": "Please enter a valid email address",
      }),
    contactMobile: Joi.string()
      .pattern(/^\+?[0-9]{7,15}$/)
      .messages({
        "string.pattern.base":
          "Please enter a valid mobile number (7-15 digits)",
      }),
    phoneWork: Joi.string()
      .pattern(/^\+?[0-9]{7,15}$/)
      .messages({
        "string.pattern.base":
          "Please enter a valid work phone number (7-15 digits)",
      }),
  }).required(),
});

export const announcementValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  message: Joi.string().required().messages({
    "string.empty": "Message is required.",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date is required and must be a valid date.",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Content is required.",
  }),
});

export default {
  registerSchema,
  loginSchema,
};
