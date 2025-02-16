import mongoose from "mongoose";
import app_config from "./appConfig.js";

const InitializeDbConnection = async () => {
  try {
    // Set up event listeners
    mongoose.connection.once("connected", () => {
      console.log("Connected to MongoDB.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error while connecting to MongoDB:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB.");
    });

    // Connect to MongoDB
    await mongoose.connect(app_config.db_url);

    console.log("MongoDB connection initialized.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to application termination.");
  process.exit(0);
});

export default InitializeDbConnection;
