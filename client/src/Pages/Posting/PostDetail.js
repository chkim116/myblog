import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import PostDetailForm from "../../components/Posting/PostDetailForm";
import { useGetPost } from "../../middleware";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../../Modules/search";

const PostDetail = ({ history, location }) => {
  const { id } = useParams();

  // get Post Detail
  const getPost = useGetPost(`/api/${id}`);
  const { loading } = getPost;
  const post = useSelector((state) => state.category.post);

  const [allLoading, setAllLoading] = useState(false);
  const dispatch = useDispatch();

  const getAllPost = () => {
    const AllPost = async () => {
      try {
        const posting = await Axios.get("/api/all").then((res) => res.data);
        dispatch(searchResults(posting));
        setAllLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    AllPost();
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
  const [fakeComment, setFakeComment] = useState();
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

  // pagination

  const allPost = useSelector((state) => state.search.post);

  const [count, setCount] = useState([0, 5]);

  const onViewMore = () => {
    setCount([
      Math.ceil(allPost.length / 5) * 5 - 5 > count[0]
        ? count[0] + 5
        : count[0],
      Math.ceil(allPost.length / 5) * 5 > count[1] ? count[1] + 5 : count[1],
    ]);
  };

  const onViewClose = () => {
    setCount([
      count[0] > 0 ? count[0] - 5 : count[0],
      count[1] > 5 ? count[1] - 5 : count[1],
    ]);
  };

  if (!loading || !allLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>My Blog | {post.title}</title>
      </Helmet>
      {del && <Loading />}
      <PostDetailForm
        fakeComment={fakeComment}
        onViewMore={onViewMore}
        onViewClose={onViewClose}
        count={count}
        post={post}
        location={location}
        onClick={onClick}
        onChangeComment={onChangeComment}
        onComment={onComment}
        onDelComment={onDelComment}
      />
    </>
  );
};

export default PostDetail;
