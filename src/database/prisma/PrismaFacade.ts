import { Post, PrismaClient } from "@prisma/client";
import { Page, PostRepository } from "../PostRepository.type";

export class PrismaFacade implements PostRepository {

  private prisma!: PrismaClient;

  constructor(prismaInstance: PrismaClient) {
    this.prisma = prismaInstance;
  }

  public async init(): Promise<PostRepository> {
    try {
      await this.prisma.$connect();
      return this;
    } catch (error) {
      throw new Error('db error');
    }
  }

  public async fetchPosts(limit: number, cursor?: string | undefined): Promise<Page<Post, string>> {
    const posts = cursor
      ? await this.prisma.post.findMany({
        take: limit + 1,
        cursor: {
          id: this.decodeCursor(cursor)
        },
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' }
        ]
      })
      : await this.prisma.post.findMany({
        take: limit + 1,
        orderBy: [
          { createdAt: 'desc' },
          { id: 'desc' }
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

  private encodeCursor(decodedCursor: string): string {
    return Buffer.from(decodedCursor).toString("base64");
  }

  private decodeCursor(encodedCursor: string): string {
    return Buffer.from(encodedCursor).toString("ascii");
  }
}
