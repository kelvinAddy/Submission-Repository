const Blog = require('../Models/blog.model');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
};

exports.postBlog = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Data is invalid' });
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

exports.deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

exports.putBlog = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Data is invalid' });
  }

  if (!req.body.url || !req.body.title) {
    return res.status(400).json({ error: 'Url or title is missing' });
  }

  const fetchedBlog = await Blog.findById(req.params.id);
  if (!fetchedBlog) {
    return res.status(404).end();
  }
  fetchedBlog.likes = req.body.likes;
  const savedBlog = await fetchedBlog.save();
  res.json(savedBlog);
};
