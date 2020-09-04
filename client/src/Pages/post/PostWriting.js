import React, { useState, useEffect } from "react";
import PostingForm from "../../components/post/PostingForm";
import Axios from "axios";

const PostWriting = () => {
  const initialState = {
    title: "",
    description: "",
    updated: "",
  };

  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { title, description, updated } = post;

  const onSubmit = (e) => {
    e.preventDefault();
    setPost({ ...post });
    const axiosData = async () => {
      await Axios.post("/api/post", {
        title,
        description,
        updated,
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

  const onValue = (content, delta, source, editor) => {
    const text = editor.getHTML();
    setPost({
      ...post,
      description: text,
    });
  };

  useEffect(() => {
    if (loading) {
      window.location.href = "/post";
    }
  });

  return (
    <PostingForm
      onSubmit={onSubmit}
      onChange={onChange}
      title={title}
      onValue={onValue}
      description={description}
    ></PostingForm>
  );
};

export default PostWriting;
