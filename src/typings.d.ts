import { PostRepository } from "./database";

declare module "fastify" {
  interface FastifyInstance {
    /**
     * Database facade
     *
     * This field is injected using decorator
     */
    db: PostRepository;
  }
}
