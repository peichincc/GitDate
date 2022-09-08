import React, { useEffect } from "react";
import styled from "styled-components";

import back from "./back.jpg";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Block = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const BlockInnerImg = styled.div`
  background-image: url(${back});
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffc629;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  color: #333;
  @media (min-width: 770px) {
    height: calc(100vh - 64px);
  }
`;

const BlockInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  max-width: 100%;
  padding: 16px;
`;

const BlockContent = styled.div`
  display: block;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  @media screen and (min-width: 900px) {
    max-width: 680px;
    padding: 32px;
  }
`;

const BlockTitle = styled.h1``;
const BlockText = styled.div``;

const Header = () => {
  return (
    <>
      <Wrapper>
        <Block>
          <BlockInnerImg>
            <BlockInner>
              <BlockContent>
                <BlockTitle>Make the first commit.</BlockTitle>
                <BlockText>Start meeting new people!</BlockText>
              </BlockContent>
            </BlockInner>
          </BlockInnerImg>
        </Block>
      </Wrapper>
    </>
  );
};

export default Header;
