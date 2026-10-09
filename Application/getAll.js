class GetAllPosts {
  constructor(getAllRepository) {
    this.getAllRepository = getAllRepository;
  }
  async getAllPosts() {
    const posts = await this.getAllRepository.getAll();

    return posts;
  }
}
module.exports = GetAllPosts;
