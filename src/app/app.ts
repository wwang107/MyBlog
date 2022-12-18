import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import fp from "fastify-plugin";
import { PrismaPostRepository, PrismaClient } from "../database/prisma";

const build = (options: FastifyServerOptions = {}): FastifyInstance => {
  const app = fastify(options);

  app
    .register(
      fp(async () => {
        const facade = new PrismaPostRepository(PrismaClient);
        await facade.init();
        app.decorate("db", facade);
      }),
    )
    .register(import("../services/post"));

  return app;
};

export default build;
