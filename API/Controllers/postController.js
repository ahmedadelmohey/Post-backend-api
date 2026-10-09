class PostController {
  constructor(createPost, getPost, getAllPosts) {
    this.createPost = createPost;
    this.getPost = getPost;
    this.getAllPosts = getAllPosts;
  }
  async create(req, res) {
    const result = await this.createPost.createOnePost(req.body);
    res.status(201).json(result);
  }
  async getOne(req, res) {
    const post = await this.getPost.getOnePost(req.params.id);
    res.status(200).json(post);
  }
  async getAll(req, res) {
    const posts = await this.getAllPosts.getAllPosts();
    res.status(200).json(posts);
  }
}
module.exports = PostController;
