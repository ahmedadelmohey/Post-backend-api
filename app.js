const express = require("express");
const connetToMongo = require("./Infrastructure/Database/mongoconnection.js");
const PostRepository = require("./Infrastructure/Database/postRepository.js");
const GetRepository = require("./Infrastructure/Database/getRepository.js");
const GetAllRepository = require("./Infrastructure/Database/getAllRepository.js");
const CreatePost = require("./Application/createPost.js");
const GetPost = require("./Application/getPost.js");
const GetAllPosts = require("./Application/getAll.js");
const CreatePostRoutes = require("./API/PostRoutes/postRoutes.js");
const PostController = require("./API/Controllers/postController.js");
const {
  connectProducer,
  publishPostCreated,
} = require("./Infrastructure/Kafka/postProducer.js");
let app = express();
const PORT = 3000;
app.use(express.json());

async function start() {
  const posts = await connetToMongo();
  const postRespository = new PostRepository(posts);
  const getRepository = new GetRepository(posts);
  const getAllRepository = new GetAllRepository(posts);
  const createPost = new CreatePost(postRespository, publishPostCreated);
  const getPost = new GetPost(getRepository);
  const getAllPosts = new GetAllPosts(getAllRepository);

  const postController = new PostController(createPost, getPost, getAllPosts);

  app.use("/posts", CreatePostRoutes(postController));

  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      message: err.message || "internal Server error",
    });
  });
  await connectProducer();
  app.listen(PORT, () => {
    console.log("server is running");
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
