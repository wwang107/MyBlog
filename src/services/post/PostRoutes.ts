import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createPostBody, deletePostQueryString, getPostQueryParams, getPostsQueryString } from "./schema/postSchemas";
import { PostService } from "./PostService";
import httpStatus from "http-status";

export const createPostRoutes: FastifyPluginAsync = async (app) => {
  const service = new PostService(app.db);

  app
    .addSchema(getPostsQueryString)
    .addSchema(getPostQueryParams)
    .addSchema(createPostBody)
    .addSchema(deletePostQueryString);

  app.get(
    "/posts",
    {
      schema: {
        querystring: {
          $ref: "/posts/request/get-posts/querystring"
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
          $ref: "/posts/request/get-post/queryparams"
        }
      }
    },
    (req: FastifyRequest<{ Params: { id: string } }>) => {
      const { id } = req.params;
      return service.findPost(id);
    }
  );

  app.post(
    "/posts",
    {
      schema: {
        body: {
          $ref: "/posts/request/create-post/body"
        }
      }
    },
    async (
      req: FastifyRequest<{ Body: { author_id: string, title: string, content: string, tags?: string[] } }>,
      reply
    ) => {
      const { author_id: authorId, title, content, tags = [] } = req.body;
      const post = await service.createPost(authorId, title, content, tags);

      return reply.code(httpStatus.CREATED).send(post);
    }
  );

  app.delete(
    "/posts/:post_id",
    {
      schema: {
        querystring: {
          $ref: "/posts/request/delete-post/querystring"
        }
      }
    },
    async (req: FastifyRequest<{ Querystring: { post_id: string } }>, reply) => {
      const { post_id: postId } = req.query;
      await service.deletePost(postId);

      return reply.code(httpStatus.OK).send();
    }
  );
};
