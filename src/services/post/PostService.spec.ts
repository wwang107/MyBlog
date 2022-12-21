import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { PostRepository } from "../../database";
import { AuthorNotFoundError, PostNotFoundError } from "../errors";
import { PostService } from "./PostService";

describe("PostService", () => {
  const mockDB = {
    findPost: jest.fn(),
    findAuthor: jest.fn(),
    deletePost: jest.fn()
  };
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

  it("findPost throw PostNotFoundError exception when database post not exist", async () => {
    mockDB.findPost.mockResolvedValue(null);
    const postId = randomUUID();

    await expect(service.findPost(postId)).rejects.toThrow(PostNotFoundError);
  });

  it("createPost throw AuthorNotFoundError exception when author not exist", async () => {
    mockDB.findAuthor.mockResolvedValue(null);
    const authorId = faker.name.firstName().toLowerCase();

    await expect(
      service.createPost(
        authorId,
        "",
        "",
        []
      )
    ).rejects.toThrow(AuthorNotFoundError);
  });

  it("deletePost throw PostNotFoundError exception when post not exist", async () => {
    mockDB.deletePost.mockResolvedValue(null);
    await expect(service.deletePost(randomUUID())).rejects.toThrow(PostNotFoundError);
  });
});
