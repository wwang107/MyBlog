import { Post, Author, Comment } from "@prisma/client";

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
   * create a post
   * 
   * @param {string} authorId the user who write the post
   * @param {string} title the title of the post
   * @param {string[]} tags a list of tags that attach to the post. Empty list if no tags are attach.
   * @param {string?} content the text content of the post
   * 
   * @returns {Promise<Post>} the created post 
   * @throws {AuthorNotFoundError} throw if author id does not exist
   */
  createPost(authorId: string, title: string, content: string, tags: string[]): Promise<Post>

  /**
   * @param {string} authorId id of the author
   * 
   * @returns {Promise<User>} user with the given id or null if user id does not exist
   */
  findAuthor(authorId: string): Promise<Author | null>

  /**
   * Delete a post
   * 
   * @param {string} postId id of the post that need to be deleted
   * 
   * @returns {Post} the deleted post
   * @throw {PostNotFoundError} throw if the post does not exist  
   */
  deletePost(postId: string): Promise<Post>

  /**
   * Create a comment for a specific post
   * 
   * @param {string} postId
   * @param {string} comment
   */
  createComment(postId: string, comment: string): Promise<Comment>
}

export interface Page<Data, Cursor> {
  next?: Cursor
  results: Data[]
  limit: number
  size: number
}
