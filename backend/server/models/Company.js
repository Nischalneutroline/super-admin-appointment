import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true,
    },

    EINorPAN: {
      type: String,
      required: [true, "EIN or PAN number is required"],
      match: [/^[A-Z0-9]+$/, "EIN/PAN should be alphanumeric and uppercase"],
      unique: true,
    },
    panEinAttachment: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Company phone number is required"],
      match: [/^\+?[0-9]*$/, "Please enter a valid phone number"],
    },
    website: {
      type: String,
      match: [
        /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
        "Please enter a valid website URL",
      ],
    },
    fax: {
      type: String,
      match: [/^\+?[0-9]*$/, "Please enter a valid fax number"],
    },
    lineOfBusiness: {
      type: String,
      required: [true, "Line of business is required"],
    },
    naicsCode: {
      type: String,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },

    address: {
      streetAddress1: { type: String, required: true },
      streetAddress2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    pointOfContact: {
      name: { type: String, required: true },
      designation: { type: String },
      email: { type: String, required: true },
      contactMobile: {
        type: String,
        match: [/^\+?[0-9]*$/, "Invalid phone number"],
      },
      phoneWork: { type: String },
    },
  },
  { timestamps: true }
);

companySchema.path("EINorPAN").validate(function (value) {
  if (!value) {
    return false;
  }
  return true;
}, "Either EIN or PAN number is required.");

const Company = mongoose.model("Company", companySchema);

export default Company;
