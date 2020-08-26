import React, { useState, useEffect } from "react";
import PostingForm from "../components/PostingForm";
import { Redirect } from "react-router-dom";
import routes from "../routes";

const PostWriting = () => {
  const initialState = {
    title: "",
    description: "",
    redirect: false,
  };

  const [post, setPost] = useState(initialState);
  const { title, description, redirect } = post;

  function onSubmit(e) {
    e.preventDefault();
    setPost({ ...post, redirect: true });
    console.log(post);
  }

  function onChange(e) {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  }
  useEffect(() => {
    console.log(post);
    return () => {};
  }, [post]);

  if (redirect) {
    return <Redirect to={routes.postdetail} />;
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
