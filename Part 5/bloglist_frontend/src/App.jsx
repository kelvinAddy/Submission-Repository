import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import { useEffect, useState } from 'react';
import DisplayBlogs from './components/DisplayBlogs';
import blogService from './services/blog';
import { Notification } from './components/Notification';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState({
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  });

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const updateNofitication = (update) => {
    update();
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  if (user === null) {
    return (
      <>
        <h1>log in to application</h1>
        <Notification
          updateNofitication={updateNofitication}
          message={message}
          style={style}
        />
        <LoginForm
          setUser={setUser}
          updateNotification={updateNofitication}
          setMessage={setMessage}
          setStyle={setStyle}
          style={style}
        />
      </>
    );
  }

  return (
    <>
      <h1>blogs</h1>
      <Notification
        updateNofitication={updateNofitication}
        message={message}
        style={style}
      />
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        updateNotification={updateNofitication}
        setMessage={setMessage}
        setStyle={setStyle}
        style={style}
      />

      <DisplayBlogs blogs={blogs} setBlogs={setBlogs} />
    </>
  );
}

export default App;
