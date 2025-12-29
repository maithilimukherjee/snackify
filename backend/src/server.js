import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();
console.log("server.js loaded");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("we are live on port", PORT);
});
