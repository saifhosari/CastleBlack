import React from "react";

const PostError = ({ error, setError }) => {
  return (
    <div className="postError">
      <div className="postError_error"> {error} </div>
      <div className="blue_btn" onClick={() => setError("")}>
        Try again
      </div>
    </div>
  );
};

export default PostError;
