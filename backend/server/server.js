import app from "./app.js";
import app_config from "./config/appConfig.js";
import InitializeDbConnection from "./config/dbConnection.js";

const port = app_config.port;

const StartServer = async () => {
  try {
    // Initialize the database connection first
    await InitializeDbConnection();
    console.log("Database connection established.");

    // Start the server
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });

    // Graceful shutdown
    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });

    process.on("SIGTERM", () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with failure
  }
};

StartServer();
