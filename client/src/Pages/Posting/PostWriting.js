import React, { useState, useEffect } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { useGetCategory } from "../../middleware";
import { Loading } from "../Etc/Loading";

const PostWriting = ({ history }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    updated: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const { title, description, updated } = post;
  const [tags, setTags] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [showTags, setShowTags] = useState([]);

  useGetCategory();

  const axiosData = async () => {
    try {
      await Axios.post("/api/post", {
        title,
        description,
        updated,
        tags: showTags,
        category: selectCategory,
        createDate: new Date().toLocaleTimeString("ko-KR", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  // text event

  const onSelect = useCallback(
    (e) => {
      setSelectCategory(e.target.value);
    },
    [selectCategory]
  );

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setPost({
        ...post,
        [name]: value,
      });
    },
    [post]
  );

  const onValue = (content, delta, source, editor) => {
    const text = editor.getHTML();
    setPost({
      ...post,
      description: text,
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setPost({ ...post });
      axiosData();
    },
    [post, showTags, tags]
  );

  // tag event

  const onTags = 
    (e) => {
      setTags(e.target.value);
    },
 
  ;

  const onTagsSubmit = 
    (e) => {
      e.preventDefault();
      setShowTags([...showTags.concat(tags)]);
      setTags("");
    }

  // tag del

  const onTagDel = useCallback(
    (e) => {
      const tagId = e.target.dataset.tag;
      const filterTags = showTags.filter((tags) => tags !== tagId);
      setShowTags(filterTags);
    },
    [showTags]
  );

  useEffect(() => {
    if (loading) {
      history.push("/post");
    }
  }, [loading, history]);

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트 작성</title>
      </Helmet>
      {loading && <Loading />}
      <PostingForm
        selectCategory={selectCategory}
        onSelect={onSelect}
        onTagDel={onTagDel}
        onSubmit={onSubmit}
        onChange={onChange}
        title={title}
        onTagsSubmit={onTagsSubmit}
        onValue={onValue}
        tags={tags}
        showTags={showTags}
        onTags={onTags}
        description={description}></PostingForm>
    </>
  );
};

export default PostWriting;
