import React, { useState, useEffect, useRef } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";

const PostWriting = ({ history }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    updated: "",
  });
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
          createDate: new Date().toLocaleTimeString("ko-KR", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
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
    console.log(editor.getHTML());
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

  const reactQuillRef = useRef();
  const quillRef = reactQuillRef;
  console.log(quillRef);

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트 작성</title>
      </Helmet>
      <PostingForm
        onSubmit={onSubmit}
        quillRef={quillRef}
        reactQuillRef={reactQuillRef}
        onChange={onChange}
        title={title}
        onValue={onValue}
        description={description}></PostingForm>
    </>
  );
};

export default PostWriting;
