import app from "./app.js";
import dotenv from "dotenv";

// dotenv-config
dotenv.config();

// env variable
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}...`);
});
