import React from "react";
import { Link } from "react-router-dom";
import "./HomeForm.scss";

const HashTag = ({ hash, length }) => {
  const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  return (
    <Link to='/'>
      <div className='main__hash-tag' style={{ color }}>
        #{hash}({length})
      </div>
    </Link>
  );
};

const HomeForm = ({ tag }) => {
  return (
    <>
      <main className='main'>
        <div className='main__hash'>
          <div className='tags__keyword'>Keywords Tags</div>
          <div className='main__hash-box'>
            {tag.map((t, index) => (
              <div key={index}>
                <HashTag
                  hash={t}
                  length={tag.filter((tags) => tags === t).length}
                />
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
