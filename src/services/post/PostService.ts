import { PostRepository } from "../../database";
import { EntityNotFound } from "../../errors/errors";

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
      throw new EntityNotFound(`Can not find post id ${id}`);
    }

    return post;
  }
}
