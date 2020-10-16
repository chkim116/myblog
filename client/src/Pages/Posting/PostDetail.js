import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/Posting/PostDetailForm";
import { useGetPost } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

const PostDetail = ({ history }) => {
  const { id } = useParams();

  // get Post Detail
  const getPost = useGetPost(`/api/${id}`);
  const { post, loading } = getPost;

  //  del post

  const [del, setDel] = useState(false);

  const onClick = () => {
    setDel(true);
    const deletePost = async () => {
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

  if (!loading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Blog | {post.title}</title>
      </Helmet>
      {del && <Loading />}
      <PostDetailForm postObj={post} onClick={onClick} />
    </>
  );
};

export default PostDetail;
