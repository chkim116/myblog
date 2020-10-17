import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeForm from "../../components/Home/HomeForm";
import { hashTagSearch } from "../../Modules/search";
import { Loading } from "../Etc/Loading";

const Home = ({ history }) => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);

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

  const dispatch = useDispatch();
  const hash = useSelector((state) => state.search.tags);

  const onClick = (e) => {
    const { tag } = e.target.dataset;
    dispatch(hashTagSearch(tag));
    history.push(`/search?tag=${hash}`);
  };

  return (
    <div>{loadingHome ? <HomeForm tagList={tag}></HomeForm> : <Loading />}</div>
  );
};

export default Home;
