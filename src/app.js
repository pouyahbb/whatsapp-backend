import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanatize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

// dotenv-config
dotenv.config();
// create express app
const app = express();

// morgan middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Helmet middleware
app.use(helmet());

// parse json request body
app.use(express.json());

// parse json request url
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanatize());

// enable cookie parser
app.use(cookieParser());

// gzip compression data that come from request body(make faster)
app.use(compression());

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello from server");
});

export default app;
