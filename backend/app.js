const express = require("express");
const cors    = require("cors");
const dotenv  = require("dotenv");
const path    = require("path");

dotenv.config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth",     require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users",    require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/reviews",  require("./routes/reviewRoutes"));

app.get("/", (req, res) => res.json({ success: true, message: "API AgriConnect OK" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));