// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express application
const app = express();

// Use cors
app.use(cors());

// Use body parser
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create routes
app.get('/posts/:id/comments', (req, res) => {
  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Send comments
  res.send(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  // Get random id
  const commentId = randomBytes(4).toString('hex');

  // Get comment content
  const { content } = req.body;

  // Get comments for post id
  const comments = commentsByPostId[req.params.id] || [];

  // Add new comment
  comments.push({ id: commentId, content });

  // Add comments for post id
  commentsByPostId[req.params.id] = comments;

  // Send new comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Comments service listening on port 4001');
});

