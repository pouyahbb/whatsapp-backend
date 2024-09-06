import app from "./app.js";
import logger from "../configs/logger.config.js";
import mongoose from "mongoose";

// env variable
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1); // Exit on MongoDB connection error
});

// MongoDB debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// MongoDB connection
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    logger.info("MongoDB connected successfully");
  })
  .catch((err) => {
    logger.error(`MongoDB connection failed: ${err}`);
    process.exit(1); // If connection fails, exit process
  });

let server = app.listen(PORT, () => {
  logger.info(`Server running on PORT ${PORT}...`);
});

// Handle server errors and exit
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed.");
      process.exit(0); // Exit with success code
    });
  } else {
    process.exit(1); // Exit with error code if server is not initialized
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

// Handle SIGTERM gracefully
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully.");
  exitHandler();
});
