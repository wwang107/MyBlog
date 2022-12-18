import { PostRepository } from "../../database";
import { PostNotFoundError } from "./errors";

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
}
