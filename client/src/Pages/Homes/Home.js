import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeForm from "../../components/Home/HomeForm";
import { useGetPost } from "../../middleware";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);
  const { loading } = useGetPost("/api/all");
  const post = useSelector((state) => state.category.post);

  useEffect(() => {
    const getTags = async () => {
      setLoadingHome(false);
      try {
        const tags = await Axios.get("/tag").then((res) => res.data);
        setTagList(tags);
        setLoadingHome(true);
      } catch (err) {
        console.log(err);
      }
    };
    getTags();
  }, []);

  let tag = [];
  tagList.forEach((list) => {
    tag.push(list.tags);
  });

  return (
    <div>
      {loadingHome && loading ? (
        <HomeForm post={post} tagList={tag}></HomeForm>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
