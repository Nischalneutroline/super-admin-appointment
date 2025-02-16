import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const superAdminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number."],
    },
    role: {
      type: String,
      default: "superadmin",
      enum: ["superadmin"],
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    otp: {
      type: String,
      default: null,
    },
    otpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
superAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  console.log("Password before hashing: ", this.password);

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password after hashing: ", this.password);
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

superAdminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

export default SuperAdmin;
