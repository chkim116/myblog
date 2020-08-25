import Post from "../models/post";

export const getUser = async (ctx) => {
  ctx.body = await "post";
};

export const postUser = async (ctx) => {
  const post = await Post.create({
    title: "타이틀",
    description: "설명",
  });
  ctx.body = post;
};

export const userRegister = (ctx) => {
  ctx.body = "회원가입스";
};

export const userLogin = (ctx) => {};
export const userLogout = (ctx) => {};
