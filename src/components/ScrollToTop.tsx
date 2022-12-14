import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const UpBtn = styled.button`
  border: none;
  background: none;
  font-size: 30px;
  cursor: pointer;
  color: #24292f;
`;
const ScrollWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 200;
`;

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <ScrollWrapper>
        <UpBtn
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <FontAwesomeIcon icon={faCircleArrowUp} />
        </UpBtn>
      </ScrollWrapper>
    </>
  );
};

export default ScrollToTop;
