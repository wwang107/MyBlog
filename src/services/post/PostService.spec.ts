import { randomUUID } from "crypto";
import { PostRepository } from "../../database";
import { EntityNotFound } from "../../errors/errors";
import { PostService } from "./PostService";

describe("PostService", () => {
  const mockDB = { findPost: jest.fn() };
  const service = new PostService(mockDB as unknown as PostRepository);

  beforeEach(() => {
    mockDB.findPost.mockReset();
  });

  it("findPost return the post when database response with a post", async () => {
    const mockPost = {
      id: randomUUID(),
      authorId: randomUUID(),
      title: "1",
      content: "",
      published: true,
      categoryName: "",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockDB.findPost.mockResolvedValue(mockPost);
    const post = await service.findPost(mockPost.id);

    expect(post).toStrictEqual(mockPost);
  });

  it("findPost throw EntityNotFound exception when database response with null", async () => {
    mockDB.findPost.mockResolvedValue(null);
    const postId = randomUUID();

    await expect(service.findPost(postId)).rejects.toThrow(EntityNotFound);
  });
});
