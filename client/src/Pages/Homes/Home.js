import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HomeForm from "../../components/Home/HomeForm";
import { useUserId } from "../../middleware";
import { getAuth } from "../../Modules/auth";
import { Loading } from "../Etc/Loading";

const Home = () => {
  const [loadingHome, setLoadingHome] = useState(false);
  const [tagList, setTagList] = useState([]);

  // user 체크
  const getUser = useUserId("/auth");
  const { userId } = getUser;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuth(userId));
  }, [userId]);

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
      {loadingHome ? (
        <HomeForm post={tagList} tagList={tag}></HomeForm>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
