import React from "react";

const PostDetailForm = ({ post }) => {
  const id = post.map((p) => p._id);
  console.log(id);
  return (
    <>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
      <h1>자업어ㅣㅏㅈㅂ어ㅣㅏㅈ버이ㅏㅓ이ㅏㅓ바ㅣㅇ저ㅣㅏㅓ</h1>
    </>
  );
};

// axios get ('/postdetail/(id))
export default PostDetailForm;
