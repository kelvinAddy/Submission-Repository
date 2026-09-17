const Blog = require('../Models/blog.model');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

exports.postBlog = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Not a valid JSON' });
  }

  if (!req.body.url || !req.body.title) {
    return res.status(400).json({ error: 'Url or title is missing' });
  }

  const blog = await Blog.create({
    ...req.body,
    likes: req.body.likes ?? 0,
  });
  res.status(201).json(blog);
};
