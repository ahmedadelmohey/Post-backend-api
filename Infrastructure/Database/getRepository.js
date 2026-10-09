const { ObjectId } = require("mongodb");
class GetRepository {
  constructor(posts) {
    this.posts = posts;
  }
  async get(id) {
    const post = await this.posts.findOne({
      _id: new ObjectId(id),
    });

    return {
      _id: post.id,
      title: post.title,
      content: post.content,
    };
  }
}
module.exports = GetRepository;
