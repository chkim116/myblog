import React, { useState, useEffect } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { useGetCategory } from "../../customHooks";
import { Loading } from "../Etc/Loading";
import { useSelector } from "react-redux";
import { SeoMeta } from "../../SeoMeta";

const PostWriting = ({ history }) => {
  const selectList = useSelector((state) => state.category.data);

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

  const onTags = (e) => {
    setTags(e.target.value);
  };

  const onTagsSubmit = (e) => {
    e.preventDefault();
    setShowTags([...showTags.concat(tags)]);
    setTags("");
  };

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
  }, [loading, history]);

  const data = {
    title: "포스트 작성 | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: "postwriting",
  };

  return (
    <>
      <SeoMeta data={data} />

      {loading && <Loading />}
      <PostingForm
        selectList={selectList}
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
