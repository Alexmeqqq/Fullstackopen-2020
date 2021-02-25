const blogsRouter = require("express").Router();
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Config = require("../utils/config");
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, Config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    ...request.body,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  await blog.remove();
  response.status(204).end();
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((x) => {
      if (x) {
        response.json(x);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", async (req, res) => {
  const body = await req.body;
  const x = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const ans = await Blog.findByIdAndUpdate(req.params.id, x, { new: true });
  res.json(ans);
});

module.exports = blogsRouter;
