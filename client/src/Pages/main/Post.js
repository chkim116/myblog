import React, { useState, useEffect } from "react";
import Axios from "axios";
import FooterForm from "../../components/FooterForm";
import PostForm from "../../components/main/PostForm";

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Axios.get("/api").then((res) => setPost(res.data));
    };
    loadData().then(() => setLoading(false));
  }, []);

  return (
    <>
      <PostForm postObj={{ post }} loading={loading} />
      <FooterForm />
    </>
  );
};

export default Post;
