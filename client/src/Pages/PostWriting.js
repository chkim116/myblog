import React, { useState } from "react";
import PostingForm from "../components/PostingForm";
import Axios from "axios";

const PostWriting = () => {
  const initialState = {
    title: "",
    description: "",
  };

  const [post, setPost] = useState(initialState);
  const { title, description } = post;

  const onSubmit = (e) => {
    e.preventDefault();
    setPost({ ...post });

    const axiosData = async () => {
      try {
        await Axios.post("/api/post", {
          ...post,
        }).then((response) => response);
      } catch (err) {
        console.log(err);
      }
    };
    axiosData();
  };

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
