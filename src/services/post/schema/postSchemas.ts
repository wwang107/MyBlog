export const getPostsQueryString = {
  $id: "/posts/request/get-posts/querystring",
  type: "object",
  required: ["limit"],
  properties: {
    limit: { type: "number" },
    cursor: { type: "string" }
  }
};

export const getPostQueryParams = {
  $id: "/posts/request/get-post/queryparams",
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      format: "uuid"
    }
  }
};

export const createPostBody = {
  $id: "/posts/request/create-post/body",
  type: "object",
  required: ["author_id", "title", "content"],
  properties: {
    author_id: { type: "string" },
    title: { type: "string" },
    content: { type: "string" },
    tags: {
      type: "array",
      items: { type: "string" }
    }
  }
};

export const deletePostQueryString = {
  $id: "/posts/request/delete-post/querystring",
  type: "string"
};
