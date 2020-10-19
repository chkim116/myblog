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

const Category = ({ createList, post, onClick }) => {
  const filter = useSelector((state) => state.category.filter);

  return (
    <>
      <ul className='category__form'>
        {createList &&
          createList.map((li, index) => (
            <div
              key={index}
              data-category={li.category}
              onClick={onClick}
              className={
                li.category === filter
                  ? "category__form-list selected"
                  : "category__form-list"
              }>
              {li.category}(
              {post.filter((p) => p.category === li.category).length})
            </div>
          ))}
      </ul>
    </>
  );
};

export const PostCategory = ({ history, location }) => {
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
      {show && (
        <div className='category__wrap'>
          <div className='category__all active' onClick={onClick}>
            전체글({post.length})
          </div>
          <Category post={post} onClick={onClick} createList={createList} />
        </div>
      )}
    </div>
  );
};
