import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/post/PostDetailForm";
import { useUserId } from "../../middleware";

const PostDetail = ({ history }) => {
  const [post, setPosting] = useState({
    title: "",
    description: "",
    updated: "",
    creator: "",
  });

  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const [del, setDel] = useState(false);

  const { id } = useParams();

  // get Id

  console.log(useUserId());

  useEffect(() => {
    const getUserId = async () => {
      try {
        const Id = await Axios.get("/auth/id").then((res) => res.data.id);
        setUserId(Id);
      } catch (err) {
        console.log(err);
      }
    };
    getUserId();
  }, [id]);

  // get post

  useEffect(() => {
    const axiosGetData = async () => {
      try {
        const data = await Axios.get(`/api/${id}`).then((res) => res.data);
        setPosting(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(true);
    };
    axiosGetData();
  }, [id]);

  //  del post

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
