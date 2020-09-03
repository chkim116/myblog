import React, { useState, useEffect } from "react";
import PostEditForm from "../../components/post/PostEditForm";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../middleware";

const PostEdit = ({ history }) => {
  const { id } = useParams();

  //   get post
  const getPost = useGetPost(`/api/${id}`);
  const { post, loading } = getPost;

  // update Post
  const [updatePost, setUpdatePost] = useState({
    ...post,
  });
  const [update, setUpdate] = useState(false);

  const { title, description, updated } = updatePost;
  // if update go post page
  useEffect(() => {
    if (update) {
      history.push("/post");
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdatePost({ ...updatePost });
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
    const { name, value } = e.target;
    setUpdatePost({
      ...post,
      [name]: value,
      updated: "(수정됨)",
    });
  };

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
