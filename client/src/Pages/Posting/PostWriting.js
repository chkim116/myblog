import React, { useState, useEffect } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

const PostWriting = ({ history }) => {
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
      try {
        await Axios.post("/api/post", {
          title,
          description,
          updated,
          createDate: new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
            hour12: false,
          }),
        });
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    axiosData();
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
      history.push("/post");
    }
  });

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트 작성</title>
      </Helmet>
      <PostingForm
        onSubmit={onSubmit}
        onChange={onChange}
        title={title}
        onValue={onValue}
        description={description}></PostingForm>
    </>
  );
};

export default PostWriting;
