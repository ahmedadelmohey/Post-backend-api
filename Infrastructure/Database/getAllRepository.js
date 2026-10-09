class GetAllRepository {
  constructor(posts) {
    this.posts = posts;
  }
  async getAll() {
    const posts = await this.posts
      .find({})
      .project({ title: 1, content: 1 })
      .toArray();
    return posts;
  }
}
module.exports = GetAllRepository;
