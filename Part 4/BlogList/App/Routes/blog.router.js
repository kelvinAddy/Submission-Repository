const blogController = require('../Controllers/blog.controller');
const userExtractor = require('../Middlewares/middleware').userExtractor;
const router = require('express').Router();

router.get('/', blogController.getBlogs);

router.use(userExtractor);

router.post('/', blogController.postBlog);
router.delete('/:id', blogController.deleteBlog);
router.put('/:id', blogController.putBlog);

module.exports = router;
