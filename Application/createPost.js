const AppError = require("./Error/AppError");
class CreatePost {
  constructor(postRepository, publishPostCreate) {
    this.postRepository = postRepository;
    this.publishPostCreate = publishPostCreate;
  }
  async createOnePost(post) {
    if (
      !post.title ||
      post.title.trim() === "" ||
      typeof post.title !== "string"
    ) {
      throw new AppError("Title can't be empty", 400);
    }
    if (
      !post.content ||
      post.content.trim() === "" ||
      typeof post.content !== "string"
    ) {
      throw new AppError("Content can't be empty", 400);
    }
    const createdPost = await this.postRepository.create(post);
    await this.publishPostCreate(createdPost);
    return createdPost;
  }
}
module.exports = CreatePost;
