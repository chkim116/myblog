import React, { useCallback, useEffect, useState } from "react";
import "./PostCategory.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryList,
  filterCategory,
  showCategory,
} from "../../Modules/category";
import Axios from "axios";
import { PostCategoryList } from "./PostCategoryList";
import { PostCategoryTitle } from "./PostCategoryTitle";

export const PostCategory = ({ history }) => {
  // redux
  const show = useSelector((state) => state.category.show);
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  const onCategory = useCallback(() => {
    !show ? dispatch(showCategory(true)) : dispatch(showCategory(false));
  }, [show, dispatch]);

  // category create event
  const [create, setCreate] = useState(false);
  const [createCategory, setCreateCategory] = useState("");

  const createList = useSelector((state) => state.category.data);

  const onCreateCategory = useCallback(() => {
    !create ? setCreate(true) : setCreate(false);
  }, [create]);

  const onCreate = useCallback(
    (e) => {
      setCreateCategory(e.target.value);
    },
    [createCategory]
  );

  const onCreateSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const postCategory = async () => {
        await Axios.post("/category/create", { category: createCategory });
      };
      postCategory();
      setCreate(false);
      window.location.reload();
    },
    [createCategory]
  );

  useEffect(() => {
    const getCategory = async () => {
      await Axios.get("/category").then((res) =>
        dispatch(createCategoryList(res.data))
      );
    };
    getCategory();
  }, []);

  // post length
  const post = useSelector((state) => state.search.post);

  // filter post

  const onClick = useCallback(
    (e) => {
      const { category } = e.target.dataset;
      const filter = post.filter((f) =>
        category ? f.category === category : f
      );
      dispatch(filterCategory(category, filter.splice(0, 6)));
      history.push(
        category ? `/post?page=1&filter=${category}` : "/post?page=1"
      );
    },
    [history]
  );

  // del post

  const onDel = useCallback((e) => {
    const { id } = e.target.dataset;
    const delCategory = async () => {
      await Axios.get(`/category/del/${id}`);
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      delCategory();
      window.location.reload();
    }
  }, []);

  //  edit Post
  const [categoryEdit, setCategoryEdit] = useState({ text: "", id: "" });
  const [editShow, setEditShow] = useState(false);

  const onEdit = useCallback(
    (e) => {
      !editShow ? setEditShow(true) : setEditShow(false);
    },
    [editShow]
  );

  const onEditChange = useCallback(
    (e) => {
      const { value } = e.target;
      const { id } = e.target.dataset;
      setCategoryEdit({ ...categoryEdit, text: value, id });
    },
    [categoryEdit]
  );

  const onEditSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const postCategoryEdit = async () => {
        await Axios.post("/category/edit", { categoryEdit });
      };
      postCategoryEdit();
      window.location.reload();
    },
    [categoryEdit]
  );

  return (
    <div className='category'>
      <PostCategoryTitle
        admin={admin}
        create={create}
        onCreateCategory={onCreateCategory}
        onCreate={onCreate}
        onCreateSubmit={onCreateSubmit}
        onCategory={onCategory}
      />
      {!show && (
        <div className='category__wrap'>
          <div className='category__all active' onClick={onClick}>
            전체글({post.length})
          </div>
          <PostCategoryList
            editShow={editShow}
            onEditSubmit={onEditSubmit}
            onEditChange={onEditChange}
            post={post}
            onEdit={onEdit}
            onDel={onDel}
            onClick={onClick}
            admin={admin}
            createList={createList}
          />
        </div>
      )}
    </div>
  );
};
