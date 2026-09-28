import Blog from './Blog';
import { useEffect } from 'react';
import blogService from '../services/blog';

const DisplayBlogs = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.get().then((data) => setBlogs(data));
  }, []);
  if (!blogs) return;
  return (
    <>
      {blogs.map((blog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </>
  );
};

export default DisplayBlogs;
