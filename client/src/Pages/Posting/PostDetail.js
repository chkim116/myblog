import React, { useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
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
    getAllPost();
  }, [dispatch]);

  //  del post

  const [del, setDel] = useState(false);

  const onClick = useCallback(() => {
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
    if (window.confirm("정말 삭제하겠습니까?")) {
      deletePost();
      history.push("/post");
    }
  }, [id, history]);

  // 코멘트 작성

  const [comment, setComment] = useState({ comment: "" });
  const [fakeComment, setFakeComment] = useState([]);
  const onChangeComment = (e) => {
    setComment({ ...comment, comment: e.target.value });
  };

  // create comment

  const onComment = useCallback(
    (e) => {
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
          }).then((res) => setFakeComment(fakeComment.concat(res.data)));
        } catch (err) {
          console.log(err);
        }
      };
      postComments();
      setComment({ comment: "" });
    },
    [fakeComment, comment, id]
  );

  // comment delete

  const onDelComment = useCallback((e) => {
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
  }, []);

  // pagination

  const allPost = useSelector((state) => state.search.post);

  const [count, setCount] = useState([0, 5]);

  const onViewMore = useCallback(() => {
    setCount([
      Math.ceil(allPost.length / 5) * 5 - 5 > count[0]
        ? count[0] + 5
        : count[0],
      Math.ceil(allPost.length / 5) * 5 > count[1] ? count[1] + 5 : count[1],
    ]);
  }, [count]);

  const onViewClose = useCallback(() => {
    setCount([
      count[0] > 0 ? count[0] - 5 : count[0],
      count[1] > 5 ? count[1] - 5 : count[1],
    ]);
  }, [count]);

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
        commentValue={comment}
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
