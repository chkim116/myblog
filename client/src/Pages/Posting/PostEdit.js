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
  const [prevTags, setPrevTags] = useState("");
  const [tags, setTags] = useState("");
  const [showTags, setShowTags] = useState([]);

  // get previous value
  useEffect(() => {
    const getPost = async () => {
      try {
        const prevPost = await Axios.get(`/api/${id}`).then((res) => res.data);
        setUpdatePost(prevPost);
        setPrevTags(prevPost.tags[0].tags.map((list) => list));
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
      setUpdate(true);
      try {
        await Axios.post(`/api/edit/${id}`, {
          title,
          description,
          updated,
          tags: prevTags.concat(showTags),
        });
      } catch (err) {
        console.log(err);
      }
    };
    axiosData();
  };

  // tag event
  const onTags = useCallback(
    async (e) => {
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
          onValue={onValue}></PostEditForm>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PostEdit;
