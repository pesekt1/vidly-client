import React from "react";

//stateless functional component
const LikeSFC = () => {
  let dynamicClass = props.liked ? "bi bi-heart-fill m-2" : "bi bi-heart m-2";
  return (
    <i
      className={dynamicClass}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default LikeSFC;
