import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("BND HealthEndpoint");
});

app.get("/", (req, res) => {
    res.send({ "working": true });
});

app.listen("8000", () => {
    console.log("listening 8000");
});   