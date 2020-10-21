import React from "react";
import { HomeBanner } from "./HomeBanner";
import { HomeHashtag } from "./HomeHashtag";
import "./HomeForm.scss";
import { Link } from "react-router-dom";

const HomeForm = ({ tagList, post }) => {
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
      <div className='recent'>
        <div className='recent-post'>최근 글</div>
        <Link to='/post' className='recent-btn'>
          view more
        </Link>
      </div>
      <div className='wrap__post'>
        {post.splice(0, 3).map((p, index) => (
          <div className='main__post' key={index}>
            <Link to={`/postdetail/${p._id}`}>
              <div className='main__post-title'>{p.title}</div>
              <div className='main__post-desc'>
                <div dangerouslySetInnerHTML={{ __html: p.description }}></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
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
          <div className='main__hash-title'>Welcome to My Blog!</div>
          <div className='main__btn'>
            <Link to='/post'>
              <button className='main__btn-post' type='button'>
                POST
              </button>
            </Link>
            <Link to='/guestbook'>
              <button className='main__btn-guest' type='button'>
                GUEST BOOK
              </button>
            </Link>
            <Link to='/about'>
              <button className='main__btn-guest' type='button'>
                ABOUT
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeForm;
