const express = require("express");
const router = express.Router();

function createPostRoutes(postController) {
  router.post("/", postController.create.bind(postController));
  router.get("/:id", postController.getOne.bind(postController));
  router.get("/", postController.getAll.bind(postController));
  return router;
}
module.exports = createPostRoutes;
