import app from "./app.js";
import logger from "../configs/logger.config.js";
import mongoose from "mongoose";

// env variable
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

//  mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("MongoDB connected successfully");
  });

let server = app.listen(PORT, () => {
  logger.info(`Server running on PORT ${PORT}...`);
});

// sghoul look section 3

// handle server errors
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};
const expectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};
process.on("uncaughtException", expectedErrorHandler);
process.on("unhandledRejection", expectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed suddenly.");
    process.exit(1);
  }
});
