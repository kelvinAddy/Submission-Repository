import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`;
};

const post = async (blog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

const get = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { post, get, setToken };
