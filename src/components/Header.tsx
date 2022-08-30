import React from "react";
import styled from "styled-components";
import logo from "./logo.png";

const Wrapper = styled.div`
  max-width: 1376px;
  display: flex;
  margin: 0 auto;
  height: 62px;
  background-color: #24292f;
`;

const LogoContainer = styled.div`
  width: 62px;
  height: 62px;
  background-image: url(${logo});
  background-size: contain;
`;

const Header = () => {
  return (
    <>
      <Wrapper>
        <LogoContainer />
      </Wrapper>
    </>
  );
};

export default Header;
