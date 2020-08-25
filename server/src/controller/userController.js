import Post from "../models/post";

export const getUser = (ctx) => {
  ctx.body = "성공";
};

export const postUser = async (ctx) => {
  ctx.body = await {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
  console.log(ctx);
  console.log("post~!!!");
};

export const getText = (ctx) => {
  const { id } = ctx.params;
  ctx.body = `${id}의 api text`;
};
