const { ObjectId } = require("mongodb");
const AppError = require("./Error/AppError");

class GetPost {
  constructor(getRepository) {
    this.getRepository = getRepository;
  }
  async getOnePost(id) {
    if (!ObjectId.isValid(id)) {
      throw new AppError("Invalid Post ID", 400);
    }
    const post = await this.getRepository.get(id);
    if (!post) {
      throw new AppError("Post Not Found", 404);
    }
    return post;
  }
}
module.exports = GetPost;
