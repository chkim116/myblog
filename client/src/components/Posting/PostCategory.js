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

const Category = ({ list, post, onClick }) => {
  const category = post.map((arr) => arr.category);
  const reduceCategory = category.reduce((allCategory, category) => {
    if (category in allCategory) {
      allCategory[category]++;
    } else {
      allCategory[category] = 1;
    }
    return allCategory;
  }, {});
  const tagsKeyValue = Object.entries(reduceCategory).sort(
    (a, b) => b[1] - a[1]
  );
  const sortCategory = tagsKeyValue.map(([key, value]) => [key, value]);

  return (
    <>
      <ul className='category__form'>
        {list &&
          sortCategory.map((li, index) => (
            <div
              key={index}
              data-category={li[0]}
              onClick={onClick}
              className='category__form-list'>
              {li[0]} ({li[1] || 0})
            </div>
          ))}
      </ul>
    </>
  );
};

export const PostCategory = () => {
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
    dispatch(filterCategory(category));
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
          <Category post={post} onClick={onClick} list={createList} />
        </div>
      )}
    </div>
  );
};
