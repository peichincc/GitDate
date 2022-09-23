import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CheatSheet from "./modal/Cheatsheet";

import { ReactComponent as Logo } from "./githubConer.svg";
import "./corner.css";

const AnimatedLogo = styled(Logo)`
  &:hover path {
    .github-corner:hover .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
    @keyframes octocat-wave {
      0%,
      100% {
        transform: rotate(0);
      }
      20%,
      60% {
        transform: rotate(-25deg);
      }
      40%,
      80% {
        transform: rotate(10deg);
      }
    }
    @media (max-width: 500px) {
      .github-corner:hover .octo-arm {
        animation: none;
      }
      .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
      }
    }
  }
`;

const SliderWrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 200;
`;
const BackgroundBox = styled.div`
  background-color: gray;
  transform: rotate(45deg);
`;
const StickyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const Triangle = styled.div`
  width: 0;
  height: 0;
  border: 70px solid #24292f;
  border-right: 100px solid transparent;
  border-top: 100px solid transparent;
  border-bottom-right-radius: 10px;
`;

const Slider = () => {
  const [ButtonPop, setButtonPop] = useState(false);
  return (
    <>
      <SliderWrapper>
        <CheatSheet trigger={ButtonPop} setButtonPop={setButtonPop} />
        <StickyBox onClick={() => setButtonPop(true)}>
          <Logo className="github-corner" />
          <Triangle />
        </StickyBox>
      </SliderWrapper>
    </>
  );
};

export default Slider;
