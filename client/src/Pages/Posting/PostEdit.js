import React, { useState, useEffect, useCallback } from "react";
import PostEditForm from "../../components/Posting/PostEditForm";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Loading } from "../Etc/Loading";

const PostEdit = ({ history }) => {
  const { id } = useParams();

  //   get post
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [updatePost, setUpdatePost] = useState("");
  const [tags, setTags] = useState("");
  const [showTags, setShowTags] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  // get previous value
  useEffect(() => {
    const getPost = async () => {
      try {
        const prevPost = await Axios.get(`/api/${id}`).then((res) => res.data);
        setUpdatePost(prevPost);
        setShowTags(prevPost.tags.map((list) => list));
        setLoading(true);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
    // eslint-disable-next-line
  }, []);

  const { title, description, updated } = updatePost;

  // text event

  const onSelect = (e) => {
    setSelectCategory(e.target.value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUpdatePost({
      ...updatePost,
      [name]: value,
      updated: "(수정됨)",
    });
  };

  const onValue = (content, delta, source, editor) => {
    const text = editor.getHTML();
    setUpdatePost({
      ...updatePost,
      description: text,
      updated: "(수정됨)",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUpdatePost({ ...updatePost });
    const axiosData = async () => {
      try {
        await Axios.post(`/api/edit/${id}`, {
          title,
          description,
          updated,
          tags: showTags,
          category: selectCategory,
        });
        setUpdate(true);
      } catch (err) {
        console.log(err);
      }
    };
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

  // if update go post page
  useEffect(() => {
    if (update) {
      history.push("/post");
    }
  });

  return (
    <>
      <Helmet>
        <title>My Blog | 포스트 수정</title>
      </Helmet>
      {loading ? (
        <PostEditForm
          post={updatePost}
          loading={loading}
          onSubmit={onSubmit}
          onChange={onChange}
          tags={tags}
          onTags={onTags}
          showTags={showTags}
          onTagsSubmit={onTagsSubmit}
          onTagDel={onTagDel}
          onSelect={onSelect}
          onValue={onValue}></PostEditForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostEdit;
