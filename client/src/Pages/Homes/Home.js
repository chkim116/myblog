import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import { SeoMeta } from "../../SeoMeta";
import { Loading } from "../Etc/Loading";

const Home = () => {
    const [loadingHome, setLoadingHome] = useState(false);
    const [tagList, setTagList] = useState([]);

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
                {loadingHome ? (
                    <HomeForm tagList={tagList}></HomeForm>
                ) : (
                    <Loading />
                )}
            </div>
        </>
    );
};

export default Home;
