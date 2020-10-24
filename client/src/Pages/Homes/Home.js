import Axios from "axios";
import React, { useEffect, useState } from "react";
import HomeForm from "../../components/Home/HomeForm";
import routes from "../../routes";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      setLoadingHome(false);
      try {
        const tags = await Axios.get(`${routes.api}/tag`).then(
          (res) => res.data
        );
        console.log(tags);
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
      {loadingHome ? (
        <HomeForm post={tagList} tagList={tag}></HomeForm>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
