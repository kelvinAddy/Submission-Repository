const Blog = require('../Models/blog.model');

exports.getBlogs = (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
};

exports.addBlog = (req, res) => {
  const blog = new Blog(req.body);

  blog.save().then((result) => {
    res.status(201).json(result);
  });
};
