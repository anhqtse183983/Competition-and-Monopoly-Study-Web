const express = require("express");
const path = require("path");
const lessonRoutes = require("./routes/lessonRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// routes
app.use("/lessons", lessonRoutes);

// homepage
app.get("/", (req, res) => {
    res.redirect("/lessons");
});

// start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
