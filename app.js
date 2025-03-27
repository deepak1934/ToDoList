const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("./connection/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// ✅ Serve Frontend (Fix 404 Error)
const frontendPath = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(1000, () => {
  console.log("Server started on port 1000");
});
