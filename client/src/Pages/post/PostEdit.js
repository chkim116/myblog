import React, { useState, useEffect } from "react";
import PostEditForm from "../../components/post/PostEditForm";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../middleware";

const PostEdit = ({ history }) => {
  const { id } = useParams();

  //   get post
  const getPost = useGetPost(`/api/${id}`);
  const { post } = getPost;

  const [updatePost, setUpdatePost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        await Axios.get(`/api/${id}`).then((res) => setUpdatePost(res.data));
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  // update Post
  const [update, setUpdate] = useState(false);
  const { title, description, updated } = updatePost;
  const onSubmit = (e) => {
    e.preventDefault();
    setUpdatePost({ ...updatePost });
    const axiosData = async () => {
      try {
        await Axios.post(`/api/edit/${id}`, {
          title,
          description,
          updated,
        }).then((res) => setUpdatePost({ ...updatePost, updated: "(수정됨)" }));
      } catch (err) {
        console.log(err);
      }
      setUpdate(true);
    };
    axiosData();
    console.log(updatePost);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdatePost({
      ...updatePost,
      [name]: value,
      updated: "(수정됨)",
    });
  };

  const onValue = (content, delta, source, editor) => {
    const text = editor.getHTML();
    setUpdatePost({
      ...updatePost,
      description: text,
      updated: "(수정됨)",
    });
  };

  // if update go post page
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
      onValue={onValue}
    ></PostEditForm>
  );
};

export default PostEdit;
