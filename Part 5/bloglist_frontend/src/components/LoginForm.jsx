import loginService from '../services/login';
import blogService from '../services/blog';

const LoginForm = ({
  setUser,
  updateNotification,
  setMessage,
  setStyle,
  style,
}) => {
  const handleLogin = async (formData) => {
    const username = formData.get('username');
    const password = formData.get('password');
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      updateNotification(() => {
        setMessage(error?.response?.data?.error ?? 'Unknown error occured');
        setStyle({ ...style, color: 'red' });
      });
    }
  };
  return (
    <div>
      <form action={handleLogin}>
        <div>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="text" name="password" />
          </label>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
