import { Post, PrismaClient, Author, Comment } from "@prisma/client";
import { Page, PostRepository } from "../PostRepository.type";

export class PrismaPostRepository implements PostRepository {

  private prisma!: PrismaClient;

  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  public async init(): Promise<PostRepository> {
    try {
      await this.prisma.$connect();
      return this;
    } catch (error) {
      throw new Error("db error");
    }
  }

  async deletePost(postId: string): Promise<Post> {
    return this.prisma.post.delete({ where: { id: postId } });
  }

  async findPost(id: string): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id }
    });

    return post;
  }

  public async fetchPosts(limit: number, cursor?: string | undefined): Promise<Page<Post, string>> {
    const posts = cursor
      ? await this.prisma.post.findMany({
        take: limit + 1,
        cursor: {
          id: this.decodeCursor(cursor)
        },
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" }
        ]
      })
      : await this.prisma.post.findMany({
        take: limit + 1,
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" }
        ]
      });

    return posts.length == limit + 1
      ? {
        results: posts.slice(0, posts.length - 1),
        next: this.encodeCursor(posts[posts.length - 1].id),
        limit,
        size: posts.length - 1
      }
      : {
        results: posts,
        limit,
        size: posts.length
      };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createPost(authorId: string, title: string, content: string, tags: string[]): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        authorId,
        title,
        content,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      }
    });

    return post;
  }

  async findAuthor(userId: string): Promise<Author | null> {
    return await this.prisma.author.findUnique({ where: { id: userId } });
  }

  createComment(postId: string, comment: string): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        postId,
        comment
      }
    });
  }

  private encodeCursor(decodedCursor: string): string {
    return Buffer.from(decodedCursor, "utf-8").toString("base64");
  }

  private decodeCursor(encodedCursor: string): string {
    return Buffer.from(encodedCursor, "base64").toString("utf-8");
  }
}
