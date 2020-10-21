import React from "react";
import { HomeBanner } from "./HomeBanner";
import "./HomeForm.scss";
import { HomeHashtag } from "./HomeHashtag";

const HomeForm = ({ tagList }) => {
  let tags = [];
  tagList.map((list) => list.forEach((tag) => tags.push(tag)));

  const reduceTag = tags.reduce((obj, current) => {
    if (!obj[current]) {
      obj[current] = 0;
    }
    obj[current]++;
    return obj;
  }, {});
  const tagsKeyValue = Object.entries(reduceTag).sort((a, b) => b[1] - a[1]);
  const sortTags = tagsKeyValue.map(([key, value]) => [key, value]);

  return (
    <>
      <HomeBanner />
      <main className='main'>
        <div className='main__hash'>
          <div className='main__hash-title'>Keyword Tags</div>
          <div className='main__hash-box'>
            {sortTags.map((t, index) => (
              <HomeHashtag key={index} hash={t[0]} length={t[1]} />
            ))}
          </div>
        </div>

        <div className='main__hello'>
          <h1 className='main__title'>생각창고</h1>
          <div>Welcome to My Blog!</div>
          <div>Thanks for your Visit</div>
        </div>
      </main>
    </>
  );
};

export default HomeForm;
