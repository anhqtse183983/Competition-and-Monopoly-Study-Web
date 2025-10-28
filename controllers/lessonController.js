const fs = require("fs");
const path = require("path");
const lessonsFile = path.join(__dirname, "../data/lessons.json");

exports.getAllLessons = (req, res) => {
    const lessons = JSON.parse(fs.readFileSync(lessonsFile, "utf-8"));
    res.render("index", { lessons });
};

exports.getLessonById = (req, res) => {
    const lessons = JSON.parse(fs.readFileSync(lessonsFile, "utf-8"));
    const lesson = lessons.find(l => l.id === parseInt(req.params.id));
    if (!lesson) return res.status(404).send("Lesson not found");
    res.render("lessonDetail", { lesson });
};
