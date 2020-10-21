import React, { useCallback, useEffect, useState } from "react";
import "./PostCategory.scss";
import { BiDownArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryList,
  filterCategory,
  showCategory,
} from "../../Modules/category";
import Axios from "axios";
import { PostCategoryList } from "./PostCategoryList";

export const PostCategory = ({ history }) => {
  // redux
  const show = useSelector((state) => state.category.show);
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  const onCategory = useCallback(() => {
    !show ? dispatch(showCategory(true)) : dispatch(showCategory(false));
  }, [show]);

  // category create event
  const [create, setCreate] = useState(false);
  const [createCategory, setCreateCategory] = useState("");

  const createList = useSelector((state) => state.category.data);
  const onCreateCategory = () => {
    !create ? setCreate(true) : setCreate(false);
  };

  const onCreate = (e) => {
    setCreateCategory(e.target.value);
  };

  const onCreateSubmit = (e) => {
    e.preventDefault();
    const postCategory = async () => {
      await Axios.post("/category/create", { category: createCategory });
    };
    setCreate(false);
    postCategory();
    window.location.reload();
  };

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
  const onClick = (e) => {
    const { category } = e.target.dataset;
    const filter = post.filter((f) => (category ? f.category === category : f));
    dispatch(filterCategory(category, filter.splice(0, 6)));
    history.push(category ? `/post?page=1&filter=${category}` : "/post?page=1");
  };

  // del post

  const onDel = (e) => {
    const { id } = e.target.dataset;
    const delCategory = async () => {
      await Axios.get(`/category/del/${id}`);
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      delCategory();
      window.location.reload();
    }
  };

  //  edit Post
  const [categoryEdit, setCategoryEdit] = useState({ text: "", id: "" });
  const [editShow, setEditShow] = useState(false);

  const onEdit = (e) => {
    !editShow ? setEditShow(true) : setEditShow(false);
  };

  const onEditChange = (e) => {
    const { value } = e.target;
    console.log(e.target);
    const { id } = e.target.dataset;
    setCategoryEdit({ ...categoryEdit, text: value, id });
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    const postCategoryEdit = async () => {
      await Axios.post("/category/edit", { categoryEdit }).then(
        (res) => res.data
      );
    };
    postCategoryEdit();
    window.location.reload();
  };

  return (
    <div className='category'>
      {admin && (
        <button
          className='category-plus'
          onClick={onCreateCategory}
          type='button'>
          {create ? "x" : "+"}
        </button>
      )}
      {create && (
        <div>
          <form
            className='category__create'
            onChange={onCreate}
            onSubmit={onCreateSubmit}>
            <input
              className='category__create-list'
              type='text'
              name='createCategory'
            />
            <button className='category__create-btn' type='submit'>
              생성
            </button>
          </form>
        </div>
      )}
      <div className='category-btn' onClick={onCategory}>
        카테고리 <BiDownArrow />
      </div>
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
