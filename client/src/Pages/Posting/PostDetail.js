import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/Posting/PostDetailForm";
import { useGetPost } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import { useSelector } from "react-redux";

const PostDetail = ({ history }) => {
  const { id } = useParams();

  // get Post Detail
  const getPost = useGetPost(`/api/${id}`);
  const { loading } = getPost;
  const post = useSelector((state) => state.category.post);

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

  // 코멘트 작성

  const [comment, setComment] = useState({ comment: "" });

  const onChangeComment = (e) => {
    setComment({ ...comment, comment: e.target.value });
  };

  // create comment

  const onComment = (e) => {
    e.preventDefault();
    const postComments = async () => {
      try {
        await Axios.post(`/api/comment/${id}`, {
          comment,
          createDate: new Date().toLocaleTimeString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          }),
        });
      } catch (err) {
        console.log(err);
      }
    };
    postComments();
    window.location.reload();
  };

  // comment delete

  const onDelComment = (e) => {
    const { id } = e.target.dataset;
    const delComments = async () => {
      try {
        await Axios.get(`/api/comment/del/${id}`);
      } catch (err) {
        console.log(err);
      }
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      delComments();
      window.location.reload();
    }
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
      <PostDetailForm
        post={post}
        onClick={onClick}
        onChangeComment={onChangeComment}
        onComment={onComment}
        onDelComment={onDelComment}
      />
    </>
  );
};

export default PostDetail;
