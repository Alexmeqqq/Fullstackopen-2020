const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog.model");
const helper = require("./test.helper");
const initialBlogs = [
  {
    title: "Parasite",
    author: "Mudit",
    url: "www.mddlefinger.in",
    likes: 12,
  },
  {
    title: "harry",
    author: "JK Rowling",
    url: "www.mddlefinger.in",
    likes: 12,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});
test("id is defined", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});
test("blog is added", async () => {
  const newBlog = {
    title: "harry POtter",
    author: "JK Rowling And Mudit",
    url: "www.mddlefinger69.in",
    likes: 1200,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const res = await helper.blogsInDb();
  const ans = res.map((x) => x.title);
  expect(res).toHaveLength(initialBlogs.length + 1);
  expect(ans).toContain("harry POtter");
});
test("like is not given", async () => {
  const newBlog = {
    title: "harry POtter",
    author: "JK Rowling And Mudit",
    url: "www.mddlefinger69.in",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const res = await helper.blogsInDb();
  const ans = res.map((x) => x.likes);
  expect(ans).toContain(0);
});
test("blog without title is not added", async () => {
  const newBlogEmptyTitle = {
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  };

  await api.post("/api/blogs").send(newBlogEmptyTitle).expect(400);

  const blogsInDb = await helper.blogsInDb();
  expect(blogsInDb).toHaveLength(initialBlogs.length);
});

test("blog without url is not added", async () => {
  const newBlogEmptyUrl = {
    author: "Robert C. Martin",
    title: "Type wars",
  };

  await api.post("/api/blogs").send(newBlogEmptyUrl).expect(400);

  const blogsInDb = await helper.blogsInDb();
  expect(blogsInDb).toHaveLength(initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
