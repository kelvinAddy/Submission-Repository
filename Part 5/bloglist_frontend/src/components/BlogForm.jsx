import blogService from '../services/blog';

const BlogForm = ({
  blogs,
  setBlogs,
  updateNotification,
  setMessage,
  setStyle,
  style,
}) => {
  const handleAddingBlog = async (formData) => {
    const blog = {
      url: formData.get('url'),
      author: formData.get('author'),
      title: formData.get('title'),
    };
    try {
      const data = await blogService.post(blog);
      setBlogs([...blogs, data]);
      updateNotification(() => {
        setMessage(`a new blog ${blog.title} by ${blog.author}`);
        setStyle({ ...style, color: 'green' });
      });
    } catch (error) {
      updateNotification(() => {
        setMessage(error?.response?.data?.error ?? 'Unknown Error occured');
        setStyle({ ...style, color: 'red' });
      });
    }
  };
  return (
    <div>
      <h2>create new</h2>
      <form action={handleAddingBlog}>
        <div>
          <label>
            title:
            <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            author:
            <input type="text" name="author" />
          </label>
        </div>
        <div>
          <label>
            url:
            <input type="text" name="url" />
          </label>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
