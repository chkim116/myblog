import requestIp from "request-ip";
import Home from "../models/Home.js";

// 처음 들어왔을 때 false면, 조회수 +1, 들어왔는데 true면 조회수
export const checkView = async (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  try {
    const home = await Home.find({});
    home[0].views += 1;
    home[0].ip.push(clientIp);
    home[0].save();
    res.status(200).json(home[0]);
  } catch (err) {
    res.status(400);
    console.log(err);
  }
};

export const checkIp = async (req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  const home = await Home.find({});
  if (home[0].ip.indexOf(clientIp) > -1) {
    console.log("아이피 중복으로 조회수 올라가지 않음.");
    res.json(home[0]);
    return;
  } else {
    next();
  }
};

export const getView = async (req, res, next) => {
  const home = await Home.find({});

  if (home.length >= 1) {
    next();
    return;
  }
  await Home.create({
    views: 0,
    ip: [],
    totalView: 0,
  });
  next();
};

// total view

export const totalView = async (req, res) => {
  const home = await Home.find({});
  const { totalView, _id, views } = home[0];
  await Home.findOneAndUpdate(
    { _id },
    { views: 0, totalView: parseInt(totalView + views), ip: [] }
  );
};
