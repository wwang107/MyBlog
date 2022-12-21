import { Post, User } from "@prisma/client";

export interface PostRepository {
  init(dbClientInstance: any): Promise<PostRepository>

  /**
   * Fetches posts
   * 
   * @param {number} limit maximum number of result that can be returned in one page
   * @param {string} cursor starting point of the return results
   * 
   * @returns {Promise<Page<Post, string>>} a paginated results that containing posts
   */
  fetchPosts(limit: number, cursor?: string): Promise<Page<Post, string>>

  /**
   * Find the post with the given post id
   * @param {string} id post id
   * 
   * @returns {Promise<Post | null>} the post with the given id, or null if post id does not exist
   */
  findPost(id: string): Promise<Post | null>

  /**
   * @param {string} authorId the user who write the post
   * @param {string} title the title of the post
   * @param {string[]} tags a list of tags that attach to the post. Empty list if no tags are attach.
   * @param {string?} content the text content of the post
   * 
   * @returns {Promise<Post>} the created post 
   */
  createPost(authorId: string, title: string, content: string, tags: string[]): Promise<Post>

  /**
   * @param {string} userId id of the user
   * 
   * @returns {Promise<User>} user with the given id or null if user id does not exist
   */
  findUser(userId: string): Promise<User | null>
}

export interface Page<Data, Cursor> {
  next?: Cursor
  results: Data[]
  limit: number
  size: number
}
