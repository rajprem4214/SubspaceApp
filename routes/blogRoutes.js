const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/blog-stats', blogController.getBlogStats);
router.get('/blog-search', blogController.searchBlogs);

module.exports = router;
