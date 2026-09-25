const Blog = require('../Models/blog.model');
const User = require('../Models/user.model');

exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, _id: 1 });
  res.json(blogs);
};

exports.postBlog = async (req, res) => {
  if (!req?.body?.url || !req?.body?.title) {
    return res.status(400).json({ error: 'Url or title is missing' });
  }

  const user = req.user;

  const blog = await Blog.create({
    ...req?.body,
    likes: req?.body?.likes ?? 0,
    user: user._id,
  });

  user.blogs = [...user.blogs, blog._id];
  await user.save();

  res.status(201).json(blog);
};

exports.deleteBlog = async (req, res) => {
  const user = req.user;

  const blogToDelete = await Blog.findById(req.params.id);

  if (blogToDelete?.user?.toString() === user._id.toString()) {
    await blogToDelete.deleteOne();
    return res.status(204).end();
  } else {
    res.status(401).json({ error: 'Unable to perform the request' });
  }
};

exports.putBlog = async (req, res) => {
  if (!req?.body?.url || !req?.body?.title) {
    return res.status(400).json({ error: 'Url or title is missing' });
  }

  const user = req.user;
  const fetchedBlog = await Blog.findById(req?.params?.id);

  if (user._id.toString() === fetchedBlog.user.toString()) {
    fetchedBlog.likes = req.body.likes;
    const savedBlog = await fetchedBlog.save();
    return res.json(savedBlog);
  }
  if (!fetchedBlog) {
    return res.status(404).end();
  }
};
