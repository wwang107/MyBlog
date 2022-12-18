export const getPostsQueryString = {
  $id: "/services/posts/request/querystring",
  type: "object",
  required: ["limit"],
  properties: {
    limit: { type: "number" },
    cursor: { type: "string" }
  }
};

export const getPostQueryParams = {
  $id: "/services/posts/request/queryparams",
  type: "object",
  required: ["id"],
  properties: {
    id: {
      type: "string",
      format: "uuid"
    }
  }
};
