import React, { useState, useEffect } from "react";
import PostEditForm from "../../components/post/PostEditForm";
import Axios from "axios";
import { useParams } from "react-router-dom";

const PostEdit = ({ history }) => {
  const { id } = useParams();
  const initialState = {
    title: "",
    description: "",
    updated: "",
  };
  const [post, setPost] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const { title, description, updated } = post;
  //   get post
  useEffect(() => {
    const getPost = async () => {
      await Axios.get(`/api/${id}`)
        .then((res) => setPost(res.data))
        .then(() => setLoading(true));
    };
    getPost();
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPost({ ...post });
    const axiosData = async () => {
      try {
        await Axios.post(`/api/edit/${id}`, {
          title,
          description,
          updated,
        }).then((res) => setUpdate(res.data));
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
      updated: "(수정됨)",
    });
  };

  //   if update go post page
  useEffect(() => {
    if (update) {
      history.push("/post");
    }
  });

  return (
    <PostEditForm
      post={post}
      loading={loading}
      onSubmit={onSubmit}
      onChange={onChange}
    ></PostEditForm>
  );
};

export default PostEdit;
