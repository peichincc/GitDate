import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import img01 from "./slider/slider01.jpg";
import img02 from "./slider/slider02.jpg";
import img03 from "./slider/slider03.jpg";
import img04 from "./slider/slider04.jpg";
import img05 from "./slider/slider05.jpg";
import img06 from "./slider/slider06.jpg";
import hangout from "./feature/hangout.jpg";
import dating from "./feature/dating.jpg";
import networking from "./feature/networking.jpg";

import { ActionButton } from "../../utils/StyledComponent";

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
`;

const Block = styled.div`
  display: block;
  margin: 0 auto;
`;

const BlockInnerImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #24292f;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  color: #333;
  height: calc(100vh - 64px);
  /* @media (max-width: 770px) {
    height: calc(100vh - 64px);
  } */
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
  @media screen and (min-width: 1280px) {
    max-width: 680px;
    padding: 32px;
  }
`;
const BlockTitle = styled.h1``;
const BlockText = styled.div``;
const BlockAction = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const BlockFeature = styled.div`
  height: 100vh;
  margin-top: 48px;
`;
const Features = styled.div`
  text-align: center;
`;
const FeaturesList = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`;
const FeaturesItem = styled.div`
  /* flex: 1 1 auto;
  display: flex; */
  position: relative;
  width: 30%;
  margin: 20px;
  margin-bottom: 0px;
`;
const FeaturesPhoto = styled.div`
  width: 100%;
  height: 100%;
`;
const FeaturesPhotoImg = styled.img`
  width: 100%;
  height: 100%;
`;
const FeaturesItemTitle = styled.div`
  top: 10%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
`;
const FeaturesItemTitleDate = styled(FeaturesItemTitle)`
  top: 80%;
`;
const FeaturesItemTitleNetworking = styled(FeaturesItemTitle)`
  top: 30%;
`;

const Home = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(1);
  const change = () => {
    if (photo === 7) {
      setPhoto(1);
      return;
    }
    setPhoto((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      change();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [photo]);

  const returnPhotoURL = () => {
    switch (photo) {
      case 1:
        return img01;
      case 2:
        return img02;
      case 3:
        return img03;
      case 4:
        return img04;
      case 5:
        return img05;
      case 6:
        return img06;
      default:
        return img01;
    }
  };

  return (
    <>
      <Wrapper>
        <Block>
          <BlockInnerImg
            style={{
              backgroundImage: `url(${returnPhotoURL()})`,
            }}
          >
            <BlockInner>
              <BlockContent>
                <BlockTitle>Make the first commit.</BlockTitle>
                <BlockText>Start meeting new people!</BlockText>
                <BlockAction>
                  <ActionButton
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Join
                  </ActionButton>
                  <ActionButton
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    Sign In
                  </ActionButton>
                </BlockAction>
              </BlockContent>
            </BlockInner>
          </BlockInnerImg>
        </Block>
        <Block>
          <BlockFeature>
            <Features>
              <h2>GitDate is not just for dating</h2>
              <FeaturesList>
                <FeaturesItem>
                  <FeaturesItemTitleDate>Dating</FeaturesItemTitleDate>
                  <FeaturesPhoto>
                    <FeaturesPhotoImg src={dating} />
                  </FeaturesPhoto>
                </FeaturesItem>
                <FeaturesItem>
                  <FeaturesItemTitle>Hang Out</FeaturesItemTitle>
                  <FeaturesPhoto>
                    <FeaturesPhotoImg src={hangout} />
                  </FeaturesPhoto>
                </FeaturesItem>
                <FeaturesItem>
                  <FeaturesItemTitleNetworking>
                    Networking
                  </FeaturesItemTitleNetworking>
                  <FeaturesPhoto>
                    <FeaturesPhotoImg src={networking} />
                  </FeaturesPhoto>
                </FeaturesItem>
              </FeaturesList>
            </Features>
          </BlockFeature>
        </Block>
      </Wrapper>
    </>
  );
};

export default Home;
