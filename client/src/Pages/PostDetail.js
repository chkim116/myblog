import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostDetailForm from "../components/PostDetailForm";

const PostDetail = () => {
  const [post, setPost] = useState({ title: "", description: "" });

  useEffect(() => {
    const posting = Axios.get("/postwriting");
    setPost(posting);
    console.log(post);
  }, []);
  return (
    <>
      <PostDetailForm />
    </>
  );
};

export default PostDetail;
