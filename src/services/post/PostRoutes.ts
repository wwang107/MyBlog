import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { getPostQueryParams, getPostsQueryString } from "./schema/postSchemas";
import { PostService } from "./PostService";

export const createPostRoutes: FastifyPluginAsync = async (app) => {
  const service = new PostService(app.db);

  app
    .addSchema(getPostsQueryString)
    .addSchema(getPostQueryParams);

  app.get(
    "/posts",
    {
      schema: {
        querystring: {
          $ref: "/services/posts/request/querystring"
        }
      }
    }
    ,
    (req: FastifyRequest<{ Querystring: { limit: number, cursor?: string } }>) => {
      const { limit, cursor } = req.query;
      return service.getPosts(limit, cursor);
    }
  );

  app.get(
    "/post/:id",
    {
      schema: {
        params: {
          $ref: "/services/posts/request/queryparams"
        }
      }
    },
    (req: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = req.params;
      return service.findPost(id);
    }
  );
};
