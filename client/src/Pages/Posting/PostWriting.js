import React, { useState, useEffect } from "react";
import PostingForm from "../../components/Posting/PostingForm";
import Axios from "axios";
import { useGetCategory } from "../../hook/customHooks";
import { Loading } from "../Etc/Loading";
import { SeoMeta } from "../../SeoMeta";

const PostWriting = ({ history }) => {
    const [post, setPost] = useState({
        title: "",
        description: "",
        updated: "",
    });
    const { title, description, updated } = post;
    const [loading, setLoading] = useState(false);
    const [positing, setPosting] = useState(false);
    const [tags, setTags] = useState("");
    const [selectCategory, setSelectCategory] = useState("");
    const [showTags, setShowTags] = useState([]);
    const [selectList, categoryLoading] = useGetCategory();

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
        const text = editor.getHTML();
        setPost({
            ...post,
            description: text,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setPost({ ...post });
        const axiosData = async () => {
            setPosting(true);
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
                setPosting(false);
                alert("본문을 다 입력해주세요");
            }
        };
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

            {positing && <Loading />}
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
                categoryLoading={categoryLoading}
                tags={tags}
                showTags={showTags}
                onTags={onTags}
                description={description}></PostingForm>
        </>
    );
};

export default PostWriting;
