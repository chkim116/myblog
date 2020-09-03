import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/post/PostDetailForm";
import { useUserId, useGetPost } from "../../middleware";

const PostDetail = ({ history }) => {
  const { id } = useParams();
  // get Id
  const usersId = useUserId("/auth");
  const {
    userId: { id: userId },
  } = usersId;

  // get Post Detail
  const getPost = useGetPost(`/api/${id}`);
  const { post, loading } = getPost;

  //  del post

  const [del, setDel] = useState(false);

  const onClick = () => {
    const deletePost = async () => {
      await Axios.get(`/api/del/${id}`).then((res) => setDel(res.data));
    };
    deletePost();
  };

  useEffect(() => {
    if (del) {
      history.push("/post");
    }
    return () => {
      setDel(false);
    };
  });

  return (
    <>
      <PostDetailForm
        postObj={post}
        loading={loading}
        onClick={onClick}
        userId={userId}
      />
    </>
  );
};

export default PostDetail;
