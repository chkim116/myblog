import React, { useState, useEffect } from "react";
import PostingForm from "../../components/post/PostingForm";
import Axios from "axios";

const PostWriting = ({ history }, { user }) => {
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  useEffect(() => {
    if (loading) {
      history.push("/post");
    }
    return () => {
      setLoading(false);
    };
  });

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
