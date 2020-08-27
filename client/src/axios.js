import Axios from "axios";

export const getData = () => {
  return Axios.get("http://localhost:4000/api").then((res) => console.log(res));
};

export const postData = (data) => {
  return Axios.post("http://localhost:4000/api/post", {
    title,
    description,
  }).then((res) => console.log(res));
};

export const getIdDate = (id) => {
  return Axios.get("http://localhost:4000/api", { params: { ID: id } });
};
