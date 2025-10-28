const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files (serve from /public)
app.use('/public', express.static(path.join(__dirname, 'public')));

// load lessons json (sync ok for small site)
function loadData() {
  const p = path.join(__dirname, 'data', 'lessons.json');
  try {
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading lessons.json', err);
    return { title: 'Nội dung trống', groups: [] };
  }
}
function loadQuiz(){
  const quizPath = path.join(__dirname, 'data', 'quiz.json');
  try {
    const raw = fs.readFileSync(quizPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading quiz.json', err);
    return { title: 'Nội dung trống', groups: [] };
  }
}


app.get('/', (req, res) => {
  const data = loadData();
  res.render('index', { data });
});

app.get('/quiz', (req, res) => {
  const quizData = loadQuiz();
  res.render('quiz', { quizData });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
