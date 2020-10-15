import React from "react";
import "./HomeForm.scss";
import { Link } from "react-router-dom";

const HashTag = ({ hash, length }) => {
  const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  return (
    <Link to={`/search?tag=${hash}`}>
      <div className='main__hash-tag' data-tag={hash} style={{ color }}>
        #{hash}({length})
      </div>
    </Link>
  );
};

const HomeForm = ({ tagList, tagId }) => {
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
      <main className='main'>
        <div className='main__hash'>
          <div className='main__hash-box'>
            {sortTags.map((t, index) => (
              <div key={index}>
                <HashTag hash={t[0]} length={t[1]} />
              </div>
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
