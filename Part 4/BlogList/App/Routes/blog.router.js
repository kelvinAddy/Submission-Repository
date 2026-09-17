const blogController = require('../Controllers/blog.controller');
const router = require('express').Router();

router.get('/', blogController.getBlogs);
router.post('/', blogController.postBlog);
router.delete('/:id', blogController.deleteBlog);
router.put('/:id', blogController.putBlog);

module.exports = router;
