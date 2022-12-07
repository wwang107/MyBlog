import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";

const build = (options: FastifyServerOptions = {}): FastifyInstance => {
    const app = fastify(options)

    return app;
}

export default build;