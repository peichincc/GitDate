import React, { useState, useEffect, useRef } from "react";
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
import { ShowMainMap } from "../../components/map/MainMap";

import firebaseapi from "../../utils/firebaseapi";

import { Carousel } from "./Carousel";

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
  padding-bottom: 56px;
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
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 4s;
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const BlockCarousel = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
  /* opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 4s;
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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
const SignUpBtn = styled(ActionButton)`
  background-color: #24292f;
  color: white;
  &:hover {
    border: 1px solid rgba(27, 31, 36, 0.15);
    background-color: #e6e7e9;
  }
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
  top: 20%;
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

const MapContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;
const MapBlock = styled.div`
  margin-top: 50px;
`;

const images = [img01, img02, img03, img04, img05, img06];

const Home = () => {
  // // New Carousel
  // const slidePresentationTime = 3000; // after how many ms slide will change - now 3s / 3000ms
  // const [currentSlide, setCurrentSlide] = useState(0);
  // let sliderInterval = useRef() as any; // interval ref
  // //

  const [markersFromDB, setMarkersFromDB] = useState([]);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(1);
  const change = () => {
    if (photo === 7) {
      setPhoto(1);
      return;
    }
    setPhoto((prev) => prev + 1);
  };

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   sliderInterval = setInterval(() => {
  //     setCurrentSlide((currentSlide + 1) % images.length); // change current slide to next after 3s
  //   }, slidePresentationTime);
  //   return () => {
  //     clearInterval(sliderInterval);
  //   };
  // });

  useEffect(() => {
    firebaseapi.readBranchLocations().then((res) => {
      console.log(res);
      if (res) {
        setMarkersFromDB(res["markers"]);
      }
    });
    //   const interval = setInterval(() => {
    //     change();
    //   }, 5000);
    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, [photo]
  }, []);

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
          <BlockCarousel>
            <Carousel />
            {/* <BlockInnerImg
            style={{
              backgroundImage: `url(${returnPhotoURL()})`,
            }}
          > */}
            <BlockInner>
              <BlockContent>
                <BlockTitle>Make the first commit.</BlockTitle>
                <BlockText>Start meeting new people!</BlockText>
                <BlockAction>
                  <SignUpBtn
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Join
                  </SignUpBtn>
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
          </BlockCarousel>
          {/* </BlockInnerImg> */}
        </Block>
        <Block>
          <BlockFeature>
            <Features>
              <h2>
                GitDate is not just for dating
                <br />
                You can explore all kinds of relationships here
              </h2>
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
        <MapBlock>
          <Features>
            <h2>
              What's more...
              <br />
              To meet our GitDaters around the world
            </h2>
            <MapContainer>
              <ShowMainMap markersFromDB={markersFromDB} />
            </MapContainer>
          </Features>
        </MapBlock>
      </Wrapper>
    </>
  );
};

export default Home;
