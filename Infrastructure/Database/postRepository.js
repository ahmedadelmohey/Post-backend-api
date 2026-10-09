class PostRepository {
  constructor(posts) {
    this.posts = posts;
  }
  async create(post) {
    const result = await this.posts.insertOne(post);
    return {
      _id: result.insertedId,
      title: post.title,
      content: post.content,
    };
  }
}
module.exports = PostRepository;
