const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const assert = require('node:assert');
const app = require('../App/app');
const helper = require('../App/Utils/blog_test.helper');
const Blog = require('../App/Models/blog.model');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs have a unique identifier id and not _id', async () => {
  const response = await api.get('/api/blogs');
  const results = response.body;
  assert(results.every((blog) => Object.hasOwn(blog, 'id')));
});

test('a blog can be added', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const newBlog = { ...blogsAtStart[0], author: 'Kelvin Addy', likes: 23 };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

  const titles = blogsAtEnd.map(({ title }) => title);
  assert(titles.includes(newBlog.title));
});

test('likes is defaulted to zero if it does not exist in request', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const addedBlog = blogsAtEnd.at(-1);
  assert.strictEqual(addedBlog.likes, 0);
});

test('400 request is received if url and content are missing in blog', async () => {
  const newBlog = {};

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('blog deletion succeeds with status 204', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  const ids = blogsAtEnd.map(({ id }) => id);
  assert(!ids.includes(blogToDelete.id));
});

test('updating blog succeeds with valid data', async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.likes = 400;

  const results = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length);
  assert.deepStrictEqual(results.body, blogToUpdate);
});

after(async () => {
  await mongoose.connection.close();
});
