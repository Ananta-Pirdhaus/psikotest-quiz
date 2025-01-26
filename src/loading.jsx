import React from "react";
import "./styles/loading.scss";
function Loading() {
  return (
    <div className="blur-background">
      <div className="ring">
        Loading
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Loading;
