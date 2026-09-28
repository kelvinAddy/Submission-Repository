const Blog = ({ blog }) => {
  return (
    <p>
      {blog.title} {blog.author}
    </p>
  );
};

export default Blog;
