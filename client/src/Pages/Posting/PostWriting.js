import React, { useState, useEffect, useCallback } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { Helmet } from "react-helmet-async";
import { useGetCategory } from "../../middleware";

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

  const onSelect = (e) => {
    setSelectCategory(e.target.value);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onValue = (content, delta, source, editor) => {
    console.log(content, delta, source, editor);
    const text = editor.getHTML();
    console.log(editor.getHTML());
    setPost({
      ...post,
      description: text,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setPost({ ...post });
    axiosData();
  };

  // tag event

  const onTags = useCallback(
    (e) => {
      setTags(e.target.value);
    },
    [tags]
  );

  const onTagsSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setShowTags([...showTags.concat(tags)]);
      setTags("");
    },
    [showTags, tags]
  );

  // tag del

  const onTagDel = (e) => {
    const tagId = e.target.dataset.tag;
    const filterTags = showTags.filter((tags) => tags !== tagId);
    setShowTags(filterTags);
  };

  useEffect(() => {
    if (loading) {
      history.push("/post");
    }
  }, [loading]);

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트 작성</title>
      </Helmet>
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
