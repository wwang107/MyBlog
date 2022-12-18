import { Post } from "@prisma/client";

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
   */
  findPost(id: string): Promise<Post | null>
}

export interface Page<Data, Cursor> {
  next?: Cursor
  results: Data[]
  limit: number
  size: number
}
