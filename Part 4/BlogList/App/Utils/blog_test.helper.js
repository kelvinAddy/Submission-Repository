const blogs = require('../../Tests/blogs.data');

const getMaxElement = (accum, currentVal) => {
  return accum.likes > currentVal.likes ? accum : currentVal;
};

const dummy = (blogs) => {
  if (!blogs) return;
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((accum, currentVal) => {
    return accum + currentVal.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(getMaxElement);
};

const mostBlogs = (blogs) => {
  let authorBlogCount = [];

  blogs.forEach((blog) => {
    const authorExisits = authorBlogCount.find(
      ({ author }) => author === blog.author,
    );
    if (!authorExisits) {
      const authorObj = {
        author: blog.author,
        blogs: blogs.filter(({ author }) => author === blog.author).length,
      };
      authorBlogCount = [...authorBlogCount, authorObj];
    }
  });
  return authorBlogCount.reduce(getMaxElement);
};

const mostLikes = (blogs) => {
  let authorLikeCount = [];

  blogs.forEach((blog) => {
    const authorExisits = authorLikeCount.find(
      ({ author }) => author === blog.author,
    );
    if (!authorExisits) {
      const authorObj = {
        author: blog.author,
        likes: totalLikes(blogs.filter(({ author }) => author === blog.author)),
      };
      authorLikeCount = [...authorLikeCount, authorObj];
    }
  });
  return authorLikeCount.reduce(getMaxElement);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogs,
};
