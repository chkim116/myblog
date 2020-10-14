import React from "react";
import { Link } from "react-router-dom";
import "./HomeForm.scss";

const HashTag = ({ hash }) => {
  const color = `#${Math.round(Math.random() * 0xffffff).toString(16)}`;
  return (
    <Link to='/'>
      <div className='main__hash-tag' style={{ color }}>
        {hash}
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
            {tag.map((t) => (
              <div key={t}>
                <HashTag hash={t} />
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
