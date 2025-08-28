const express = require("express");
const { datasets } = require("./dataset");
const path = require("path");

const app = express();
const port = 4000;

// serve *all* files in this folder (HTML, JS, CSS)
app.use(express.static(__dirname));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "GraphFormat.html"));
});

// API route
app.get("/api/datasets", (req, res) => {
  res.json(datasets);
});

app.listen(port, () => {
  console.log(`✅ API running at http://localhost:${port}`);
});