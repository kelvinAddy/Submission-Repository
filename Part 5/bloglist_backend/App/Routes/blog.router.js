const blogController = require('../Controllers/blog.controller');
const userExtractor = require('../Middlewares/middleware').userExtractor;
const router = require('express').Router();

router.use(userExtractor);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogsById);
router.post('/', blogController.postBlog);
router.delete('/:id', blogController.deleteBlog);
router.put('/:id', blogController.putBlog);

module.exports = router;
