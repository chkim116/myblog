import React, { useState, useEffect } from "react";
import Axios from "axios";
import PostForm from "../../components/Posting/PostForm";
import { Loading } from "../Etc/Loading";
import { useGetPost } from "../../customHooks";
import { useDispatch, useSelector } from "react-redux";
import { searchResults } from "../../Modules/search";
import { SeoMeta } from "../../SeoMeta";

const Post = ({ location, history }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);
  const post = useSelector((state) => state.search.post);
  const filter = useSelector((state) => state.category.filter);
  const filterPost = useSelector((state) => state.category.post);
  const filteringPost = filter && post.filter((f) => f.category === filter);

  // get all post / 5, 페이지의 수를 파악하기 위해 불러옴
  const [allLoading, setAllLoading] = useState(false);

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

  // url에 따른 포스트 호출
  const [page, setPage] = useState({ query: location.search });
  const { query } = page;

  // 눌렀던 번호를 쿼리에 맞춰 설정
  const [select, setSelect] = useState({ selecting: 0 });
  const { selecting } = select;

  // query url에 따른 보여주는 포스트
  const { loading } = useGetPost(query ? `/api${query}` : "/api", location);

  const handleChange = (e) => {
    const { selected } = e;
    setPage({
      query: filter
        ? `?page=${selected + 1}&filter=${filter}`
        : `?page=${selected + 1}`,
    });
    history.push(
      filter
        ? `/post?page=${selected + 1}&filter=${filter}`
        : `/post?page=${selected + 1}`
    );
    document.querySelector("#root").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.search.indexOf("filter")) {
      setSelect({
        selecting: parseInt(location.search.split("&")[0].split("=")[1] - 1),
      });
    } else {
      setSelect({
        selecting: parseInt(location.search.split("=")[1] - 1 || 0),
      });
    }
  }, [location]);

  // 게시글 삭제

  // del
  const [del, setDel] = useState(false);

  const onClick = (e) => {
    const boardId = e.target.dataset.id;
    const deletePost = async () => {
      setDel(true);
      try {
        await Axios.get(`/api/del/${boardId}`);
      } catch (err) {
        console.log(err);
        alert("삭제에 실패했습니다.");
      }
      setDel(false);
    };

    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost();
      window.location.reload();
    }
  };

  const data = {
    title: "포스트 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `post${location.search}`,
  };

  return (
    <>
      <SeoMeta data={data} />
      {del && <Loading />}
      {loading && allLoading ? (
        <PostForm
          post={post}
          history={history}
          onClick={onClick}
          loading={loading}
          location={location}
          page={page}
          handleChange={handleChange}
          select={selecting}
          filterPost={filterPost}
          filteringPost={filteringPost}
          admin={admin}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Post;
