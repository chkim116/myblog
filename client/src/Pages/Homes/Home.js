import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import { SeoMeta } from "../../SeoMeta";
import { Loading } from "../Etc/Loading";

const Home = () => {
    const [loadingHome, setLoadingHome] = useState(false);
    const [postLoading, setPostingLoading] = useState(false);
    const [tagList, setTagList] = useState([]);
    const [post, setPost] = useState();

    // 태그 불러오기
    useEffect(() => {
        const getTags = async () => {
            setLoadingHome(false);
            try {
                await Axios.get("/tag").then((res) => setTagList(res.data));
                setLoadingHome(true);
            } catch (err) {
                console.log(err);
            }
        };
        getTags();
    }, []);

    // 최근 게시물 4개만 불러오기
    useEffect(() => {
        const getRecentPost = async () => {
            setPostingLoading(false);
            try {
                await Axios.get("/api/recent").then((res) => setPost(res.data));
                setPostingLoading(true);
            } catch (err) {
                console.log(err);
            }
        };
        getRecentPost();
    }, []);

    const data = {
        title: "Think_Thank",
        description: "내가 생각하는 창고, Think Tank",
        canonical: ``,
        keywords: tagList.map((tag) => tag[0]),
    };

    return (
        <>
            <SeoMeta data={data} />
            <div>
                {loadingHome && postLoading ? (
                    <HomeForm post={post} tagList={tagList}></HomeForm>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default Home;
