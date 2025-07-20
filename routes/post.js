// const express = require('express');
// const router = express.Router();
// const Post = require('../models/Post');


// // Create post
// router.post('/', async (req, res) => {
//   const { title, content, author } = req.body;
//   const post = new Post({ title, content, author });
//   await post.save();
//   res.json(post);
// });

// // Get all posts
// router.get('/', async (req, res) => {
//   const posts = await Post.find().populate('author', 'username');
//   res.json(posts);
// });

// // Get one post
// router.get('/:id', async (req, res) => {
//   const post = await Post.findById(req.params.id).populate('author', 'username');
//   res.json(post);
// });

// // Update post
// router.put('/:id', async (req, res) => {
//   const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updatedPost);
// });

// // Delete post
// router.delete('/:id', async (req, res) => {
//   await Post.findByIdAndDelete(req.params.id);
//   res.json({ msg: 'Deleted' });
// });

// module.exports = router; // ✅ THIS MUST EXIST

const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');
const upload = require('../middleware/upload'); 
const requireAuth = require('../middleware/requireAuth');

// Multer config: store images in "uploads" folder
const fs = require('fs');
const uploadPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage:storage });

// Create post with optional image
router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ?  `/uploads/${req.file.filename}` : null;

    const post = new Post({
      title,
      content,
      image: imageUrl,
      author: req.user?.id || '000000000000000000000000' // Replace with actual user ID logic
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;
