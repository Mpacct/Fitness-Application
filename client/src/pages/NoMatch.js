import React from "react";
import Error from "../components/Error";

const NoMatch = () => {
  return (
    <div>
      <Error>
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </Error>
    </div>
  );
};

export default NoMatch;