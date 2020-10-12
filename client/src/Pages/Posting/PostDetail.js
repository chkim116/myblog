import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/Posting/PostDetailForm";
import { useUserId, useGetPost } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

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
      setDel(true);
      try {
        await Axios.get(`/api/del/${id}`).then((res) => setDel(res.data));
        history.push("/post");
      } catch (err) {
        console.log(err);
      }
      setDel(false);
    };
    deletePost();
  };

  return (
    <>
      <Helmet>
        <title>My Blog | {post.title}</title>
      </Helmet>
      {del && <Loading />}
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
