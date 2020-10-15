import React from "react";
import { Link } from "react-router-dom";
import "./HomeForm.scss";

const HashTag = ({ hash, length }) => {
  const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  return (
    <Link to={`/search?term=${hash}`}>
      <div className='main__hash-tag' style={{ color }}>
        #{hash}({length})
      </div>
    </Link>
  );
};

const HomeForm = ({ filterTags }) => {
  const tagsKeyValue = Object.entries(filterTags).sort((a, b) => b[1] - a[1]);
  const tags = tagsKeyValue.map(([key, value]) => [key, value]);

  return (
    <>
      <main className='main'>
        <div className='main__hash'>
          <div className='main__hash-box'>
            {tags.slice(0, 10).map((t, index) => (
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
