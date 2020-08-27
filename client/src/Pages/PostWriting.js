import React, { useState, useEffect } from "react";
import PostingForm from "../components/PostingForm";
import Axios from "axios";

const PostWriting = ({ history }) => {
  const initialState = {
    title: "",
    description: "",
  };

  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { title, description } = post;

  const onSubmit = (e) => {
    e.preventDefault();
    setPost({ ...post });
    const axiosData = async () => {
      await Axios.post("/api/post", {
        title,
        description,
      }).catch((err) => {
        console.log(err);
      });
    };
    axiosData();
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      history.push("/post");
    }
  });

  function onChange(e) {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  }

  return (
    <PostingForm
      onSubmit={onSubmit}
      onChange={onChange}
      title={title}
      description={description}
    ></PostingForm>
  );
};

export default PostWriting;
