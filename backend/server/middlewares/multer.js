
import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  
  }
});


export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);  
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export const uploadToCloudinary = (folderName) => async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: folderName || "Appointment System/General", // Default folder
    });

    console.log("Uploaded to Cloudinary:", result);

    req.file.cloudinaryUrl = result.secure_url;

    fs.unlinkSync(req.file.path); // Remove local file

    next();
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return res.status(500).json({
      message: "Error uploading file to Cloudinary",
      error: error.message,
    });
  }
};

