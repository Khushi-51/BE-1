
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Initialize posts.json if it doesn't exist
const postsPath = path.join(__dirname, 'posts.json');
if (!fs.existsSync(postsPath)) {
  fs.writeFileSync(postsPath, JSON.stringify([]), 'utf8');
}

// Routes
app.get('/', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  res.render('home', { posts });
});

app.get('/post', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const post = posts.find(p => p.id === parseInt(req.query.id));
  if (!post) return res.status(404).send('Post not found');
  res.render('post', { post });
});

app.get('/create', (req, res) => {
  res.render('addPost');
});

app.post('/add-post', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString()
  };
  posts.push(newPost);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  res.redirect('/');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
