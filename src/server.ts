import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.status(200).send("<p>home html</p>");
});

export default app;
