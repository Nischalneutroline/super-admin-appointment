import Company from "../models/Company.js";
import { paginateData } from "../utils/paginationUtils.js";
import createResponse from "../utils/responseBuilder.js";
import { companyValidationSchema } from "../utils/validationUtils.js";
import CompanyRequest from "../models/CompanyRequests.js";

export const createCompany = async (req, res) => {
  try {
    console.log("ENTERED THE CREATE COMPANY FUNC");

    // Validate request body
    const { error } = companyValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      console.log("Validation Error:", error);
      return res.status(400).json(
        createResponse({
          success: false,
          statusCode: 400,
          message: "Invalid company data provided",
          errors: error.details.map((err) => err.message),
        })
      );
    }

    const {
      companyName,
      email,
      phoneNumber,
      EINorPAN,
      status,
      startDate,
      endDate,
      lineOfBusiness,
      country,
      website,
      fax,
      naicsCode,
      pointOfContact,
      address,
    } = req.body;

    const panEinAttachment = req.file ? req.file.cloudinaryUrl : null;

    // Check for existing company
    const existingCompany = await Company.findOne({
      $or: [{ email }, { companyName }, { EINorPAN }],
    });

    if (existingCompany) {
      console.log("Duplicate company found:", existingCompany);
      return res.status(409).json(
        createResponse({
          success: false,
          statusCode: 409,
          message: "A company with this name, email, or EIN/PAN already exists",
        })
      );
    }

    // Create new company
    const company = new Company({
      companyName,
      email,
      phoneNumber,
      EINorPAN,
      status,
      startDate,
      endDate,
      lineOfBusiness,
      country,
      website,
      fax,
      naicsCode,
      panEinAttachment,
      pointOfContact,
      address,
    });

    // Save new company to database
    await company.save();

    return res.status(201).json(
      createResponse({
        success: true,
        statusCode: 201,
        message: "Company created successfully",
        data: company,
      })
    );
  } catch (error) {
    console.error("Error in createCompany:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while creating company",
        error: error.message,
      })
    );
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("The companyId is:", id);

    // Validate request body
    const { error } = companyValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json(
        createResponse({
          success: false,
          statusCode: 400,
          message: "Invalid company data provided",
          errors: error.details.map((err) => err.message),
        })
      );
    }

    if (req.file && req.file.cloudinaryUrl) {
      req.body.panEinAttachment = req.file.cloudinaryUrl;
    }

    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json(
        createResponse({
          success: false,
          statusCode: 404,
          message: "Company not found",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        success: true,
        statusCode: 200,
        message: "Company updated successfully",
        data: company,
      })
    );
  } catch (error) {
    console.error("Error in updateCompany:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while updating company",
        error: error.message,
      })
    );
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json(
        createResponse({
          success: false,
          statusCode: 404,
          message: "Company not found",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        success: true,
        statusCode: 200,
        message: "Company deleted successfully",
      })
    );
  } catch (error) {
    console.error("Error in deleteCompany:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while deleting company",
        error: error.message,
      })
    );
  }
};

export const getCompanies = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const { data: companies, pagination } = await paginateData(
      Company,
      page,
      limit
    );

    return res.status(200).json(
      createResponse({
        success: true,
        statusCode: 200,
        message: "Companies retrieved successfully",
        data: { companies, pagination },
      })
    );
  } catch (error) {
    console.error("Error in getCompanies:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while retrieving companies",
        error: error.message,
      })
    );
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json(
        createResponse({
          success: false,
          statusCode: 404,
          message: "Company not found",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        success: true,
        statusCode: 200,
        message: "Company retrieved successfully",
        data: company,
      })
    );
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while retrieving company",
        error: error.message,
      })
    );
  }
};

export const getPendingCompanyRequests = async (req, res) => {
  try {
    const companyRequests = await CompanyRequest.find({ status: "pending" });
    if (companyRequests.length === 0) {
      return res.status(200).json(
        createResponse({
          success: true,
          statusCode: 200,
          message: "No pending company requests found",
        })
      );
    }

    return res.status(200).json(
      createResponse({
        success: true,
        statusCode: 200,
        message: "Pending company requests retrieved successfully",
        data: companyRequests,
      })
    );
  } catch (error) {
    console.error("Error in getPendingCompanyRequests:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message:
          "Internal server error while retrieving pending company requests",
        error: error.message,
      })
    );
  }
};

export const handleCompanyRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    // Validate the action
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json(
        createResponse({
          success: false,
          statusCode: 400,
          message: "Invalid action. Only 'approve' or 'reject' are allowed.",
        })
      );
    }

    // Find the request in the database
    const companyRequest = await CompanyRequest.findById(id);
    if (!companyRequest) {
      return res.status(404).json(
        createResponse({
          success: false,
          statusCode: 404,
          message: "Company request not found.",
        })
      );
    }

    // Ensure the request is still pending
    if (companyRequest.status !== "pending") {
      return res.status(400).json(
        createResponse({
          success: false,
          statusCode: 400,
          message: `Request has already been ${companyRequest.status}.`,
        })
      );
    }

    if (action === "approve") {
      const existingCompany = await Company.findOne({
        $or: [
          { companyName: companyRequest.companyName },
          { EINorPAN: companyRequest.EINorPAN },
          { email: companyRequest.email },
        ],
      });

      if (existingCompany) {
        console.log("Duplicate company found:", existingCompany);
        return res.status(400).json(
          createResponse({
            success: false,
            statusCode: 400,
            message:
              "A company with the same name, EIN/PAN, or email already exists.",
          })
        );
      }

      const newCompany = new Company({
        companyName: companyRequest.companyName,
        EINorPAN: companyRequest.EINorPAN,
        panEinAttachment: companyRequest.panEinAttachment,
        status: "Active", // Setting status to Active
        startDate: companyRequest.startDate,
        endDate: companyRequest.endDate,
        email: companyRequest.email,
        phoneNumber: companyRequest.phoneNumber,
        website: companyRequest.website,
        fax: companyRequest.fax,
        lineOfBusiness: companyRequest.lineOfBusiness,
        naicsCode: companyRequest.naicsCode,
        country: companyRequest.country,
        address: companyRequest.address,
        pointOfContact: companyRequest.pointOfContact,
      });

      await newCompany.save();

      companyRequest.status = "approved";
      await companyRequest.save();

      return res.status(200).json(
        createResponse({
          success: true,
          statusCode: 200,
          message: "Company request approved and company created successfully.",
          data: newCompany,
        })
      );
    } else {
      companyRequest.status = "rejected";
      await companyRequest.save();

      return res.status(200).json(
        createResponse({
          success: true,
          statusCode: 200,
          message: "Company request rejected successfully.",
        })
      );
    }
  } catch (error) {
    console.error("Error in handleCompanyRequest:", error);
    return res.status(500).json(
      createResponse({
        success: false,
        statusCode: 500,
        message: "Internal server error while handling company request.",
        error: error.message,
      })
    );
  }
};
