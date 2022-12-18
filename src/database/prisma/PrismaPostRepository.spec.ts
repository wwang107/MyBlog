import { Post } from "@prisma/client";
import { randomUUID } from "crypto";
import { prismaMock } from "./mock/singleton";
import { PrismaPostRepository } from "./PrismaPostRepository";

describe("PrismaFacade", () => {

  const facade = new PrismaPostRepository(prismaMock);

  it("should try connect with the database when init()", async () => {
    await facade.init();
    expect(prismaMock.$connect).toHaveBeenCalled();
  });

  describe("fetchPosts", () => {
    const posts: Post[] = [
      {
        id: randomUUID(),
        authorId: randomUUID(),
        title: "1",
        content: "",
        published: true,
        categoryName: "",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: randomUUID(),
        authorId: randomUUID(),
        title: "2",
        content: "",
        published: true,
        categoryName: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    it("should return a page when the cursor not given", async () => {
      prismaMock.post.findMany.mockResolvedValue(posts);
      const limit = 1;
      const page = await facade.fetchPosts(limit);

      expect(page.results[0]).toBe(posts[0]);
      expect(page.next).toBeTruthy();
      expect(page.limit).toBe(limit);
      expect(page.size).toBe(limit);
    });

    it("should not include next cursor when next page does not exist", async () => {
      prismaMock.post.findMany.mockResolvedValue(posts);
      const limit = 2;
      const page = await facade.fetchPosts(limit);

      expect(page.results).toStrictEqual(posts);
      expect(page.next).toBeFalsy();
      expect(page.limit).toBe(limit);
      expect(page.size).toBe(limit);
    });
  });
});
