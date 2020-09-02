import React from "react";
import FooterForm from "../../components/FooterForm";
import PostForm from "../../components/main/PostForm";
import { useGetPost } from "../../middleware";

const Post = () => {
  const posting = useGetPost("/api");
  const { post, loading } = posting;

  return (
    <>
      <PostForm postObj={{ post }} loading={loading} />
      <FooterForm />
    </>
  );
};

export default Post;
