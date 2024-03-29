import { PostRepository } from "../../database";
import { AuthorNotFoundError, PostNotFoundError } from "../errors";

export class PostService {
  private database: PostRepository;

  constructor(db: PostRepository) {
    this.database = db;
  }

  getPosts(limit: number, cursor?: string) {
    return this.database.fetchPosts(limit, cursor);
  }

  async findPost(id: string) {
    const post = await this.database.findPost(id);

    if (!post) {
      throw new PostNotFoundError(`Can not find post id ${id}`);
    }

    return post;
  }

  async createPost(authorId: string, title: string, content: string, tags: string[]) {
    const user = await this.database.findAuthor(authorId);

    if (!user) {
      throw new AuthorNotFoundError(`Can not find user id ${authorId}`);
    }

    return this.database.createPost(authorId, title, content, tags);
  }

  async deletePost(postId: string) {
    const post = await this.database.deletePost(postId);

    if (!post) {
      throw new PostNotFoundError(`Post id ${postId} can not be deleted because it does not exist`);
    }

    return post;
  }

  async addComment(postId: string, comment: string) {
    const post = await this.findPost(postId);
    return this.database.createComment(post.id, comment);
  }
}
