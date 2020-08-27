import React, { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import FooterForm from "../components/FooterForm";
import Axios from "axios";

const Post = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await Axios.get("/api")
        .then((res) => res.data)
        .then((data) => setPost(data));
      setLoading(true);
    };
    loadData();
  }, []);

  if (!loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <PostForm postObj={{ post }} />
      <FooterForm />
    </>
  );
};

export default Post;
