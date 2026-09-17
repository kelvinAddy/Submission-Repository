const blogController = require('../Controllers/blog.controller');
const router = require('express').Router();

router.get('/', blogController.getBlogs);
router.post('/', blogController.postBlog);

module.exports = router;
