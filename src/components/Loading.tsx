import React from "react";
import styled from "styled-components";

import loadingGif from "../utils/loading.gif";

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;

const Loading = () => {
  return (
    <>
      <LoadingWrapper>
        One moment please...
        <img
          src={loadingGif}
          alt="wait until the page loads"
          style={{ height: "50px", width: "50px" }}
        />
      </LoadingWrapper>
    </>
  );
};

export default Loading;
