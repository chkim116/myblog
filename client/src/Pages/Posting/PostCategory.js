import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList, getPostByFilter, lastPage } from "../../Modules/post";
import Axios from "axios";
import { PostCategoryList } from "../../components/Posting/PostCategoryList";
import { PostCategoryTitle } from "../../components/Posting/PostCategoryTitle";
import { Loading } from "../Etc/Loading";

export const PostCategory = ({ history }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const admin = useSelector((state) => state.auth.admin);

    const onCategory = () => {
        setShow((prev) => !prev);
    };

    // category create event
    const [create, setCreate] = useState(false);
    const [createCategory, setCreateCategory] = useState("");
    const { categoryList } = useSelector((state) => state.post);

    const onCreateCategory = () => {
        setCreate((prev) => !prev);
    };

    const onCreate = (e) => {
        setCreateCategory(e.target.value);
    };

    const onCreateSubmit = (e) => {
        e.preventDefault();
        const postCategory = async () => {
            await Axios.post("/category/create", { category: createCategory });
            window.location.reload();
        };
        if (window.confirm("새로 만드십니까?")) {
            postCategory();
        }
    };

    useEffect(() => {
        const getCategory = async () => {
            await Axios.get("/category").then((res) =>
                dispatch(getCategoryList(res.data))
            );
        };
        getCategory();
    }, []);

    // del post
    const [del, setDel] = useState(false);

    const onDelClick = (e) => {
        setDel((prev) => !prev);
    };

    const onDel = (e) => {
        const { id } = e.target.dataset;
        const delCategory = async () => {
            await Axios.get(`/category/del/${id}`);
        };
        if (window.confirm("정말 삭제하시겠습니까?")) {
            window.location.reload();
            delCategory();
        }
    };

    //  edit Post
    const [categoryEdit, setCategoryEdit] = useState({ text: "", id: "" });
    const [editShow, setEditShow] = useState(false);

    const onEdit = (e) => {
        setEditShow((prev) => !prev);
    };

    const onEditChange = (e) => {
        const { value } = e.target;
        const { id } = e.target.dataset;
        setCategoryEdit({ ...categoryEdit, text: value, id });
    };

    const onEditSubmit = (e) => {
        e.preventDefault();
        const postCategoryEdit = async () => {
            await Axios.post("/category/edit", { categoryEdit });
        };
        if (window.confirm("정말 수정하시겠습니까?")) {
            setEditShow((prev) => !prev);
            window.location.reload();
            postCategoryEdit();
        }
    };

    // post length
    const post = useSelector((state) => state.post.postLength);

    // filter post
    const [loading, setLoading] = useState(false);

    const onClick = (e) => {
        if (editShow) {
            return;
        }
        const { category } = e.target.dataset;
        const getPost = async () => {
            setLoading(true);
            try {
                await Axios.get(
                    category ? `/api?page=1&filter=${category}` : `/api?page=1`
                ).then((res) => {
                    dispatch(getPostByFilter(category, res.data.post));
                    dispatch(lastPage(Math.ceil(res.data.postCount / 6)));
                });
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };
        getPost();
        history.push(
            category ? `/post?page=1&filter=${category}` : "/post?page=1"
        );
    };

    return (
        <div className="category">
            {loading && <Loading />}
            <PostCategoryTitle
                admin={admin}
                create={create}
                onCreateCategory={onCreateCategory}
                onCreate={onCreate}
                onCreateSubmit={onCreateSubmit}
                onCategory={onCategory}
            />
            {!show && (
                <div className="category__wrap">
                    <div className="category__all active" onClick={onClick}>
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
                        createList={categoryList}
                        del={del}
                        onDelClick={onDelClick}
                    />
                </div>
            )}
        </div>
    );
};
