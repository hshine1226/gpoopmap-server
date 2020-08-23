import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;

console.log("PORT: ", PORT);

const handleListener = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListener);
