import React, { useState, useEffect } from "react";
import PostEditForm from "../../components/Posting/PostEditForm";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useGetPost } from "../../middleware";
import { Helmet } from "react-helmet-async";

const PostEdit = ({ history }) => {
  const { id } = useParams();

  //   get post
  const getPost = useGetPost(`/api/${id}`);
  const { post } = getPost;

  const [updatePost, setUpdatePost] = useState("");
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  // get previous post value
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
    // eslint-disable-next-line
  }, []);

  // update Post
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
        }).then((res) => setUpdatePost({ ...updatePost }));
      } catch (err) {
        console.log(err);
      }
      setUpdate(true);
    };
    axiosData();
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
    <>
      <Helmet>
        <title>My Blog | 포스트 수정 {post.title}</title>
      </Helmet>
      <PostEditForm
        post={post}
        loading={loading}
        onSubmit={onSubmit}
        onChange={onChange}
        onValue={onValue}></PostEditForm>
    </>
  );
};

export default PostEdit;
