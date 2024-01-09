import express from "express";
import router from "./routes/productRoute.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(router);
app.get("/health", (req, res) => {
  res.send("BND HealthEndpoint");
});

app.get("/", (req, res) => {
  res.send({ working: true, data: process.env.AWS_ACCESS_KEY_ID });
});

app.listen("8000", () => {
  console.log("listening 8000");
});
