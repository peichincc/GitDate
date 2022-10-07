import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import hangout from "../../assets/images/feature/hangout.jpg";
import dating from "../../assets/images/feature/dating.jpg";
import networking from "../../assets/images/feature/networking.jpg";
import pride from "../../assets/images/feature/pride.jpg";
import { Tour } from "../../components/Tour";
import { ActionButton, TagButton } from "../../utils/styledComponent";
import { ShowMainMap } from "../../components/map/MainMap";
import firebaseapi from "../../utils/firebaseapi";
import { Carousel } from "./Carousel";
import { RootState } from "../..";

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
  padding-bottom: 56px;
`;
const Block = styled.div`
  display: block;
  margin: 0 auto;
`;
const BlockCarousel = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 64px);
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
  @media screen and (min-width: 770px) {
    max-width: 680px;
    padding-bottom: 15px;
    padding-top: 55px;
    padding-right: 32px;
    padding-left: 32px;
  }
`;
const BlockTitle = styled.h1`
  padding-bottom: 10px;
`;
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
  @media screen and (max-width: 700px) {
    height: auto;
  }
`;
const Features = styled.div`
  text-align: center;
`;
const FeaturesList = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
const FeaturesItem = styled.div`
  position: relative;
  width: 30%;
  margin: 20px;
  margin-bottom: 0px;
  @media screen and (max-width: 770px) {
    width: 100%;
    margin: 0;
  }
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
const PrideContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  @media screen and (max-width: 770px) {
    flex-direction: column;
  }
`;
const PrideItem = styled(FeaturesItem)`
  background-image: url(${pride});
  width: 50%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
`;
const PrideWordWrapper = styled.div`
  width: 50%;
  padding: 30px;
`;
const PrideTitle = styled(FeaturesItemTitle)`
  right: 0;
`;
const MapContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`;
const MapBlock = styled.div`
  margin-top: 50px;
`;
const TourReminder = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [markersFromDB, setMarkersFromDB] = useState([]);

  useEffect(() => {
    const userID = userInfo.user.user_id;
    if (userID) {
      setAlreadyLogged(true);
    }
    firebaseapi.readBranchLocations().then((res) => {
      if (res) {
        setMarkersFromDB(res["markers"]);
      }
    });
  }, []);

  return (
    <>
      <Wrapper>
        <Block>
          <BlockCarousel id="mainDoc">
            <Carousel />
            <BlockInner>
              <BlockContent id="signup">
                <BlockTitle>
                  Push On GitDate.
                  <br />
                  Merge Your Soulmate.
                </BlockTitle>
                <BlockText>
                  Make the first commit and start meeting new people!
                </BlockText>
                <BlockAction>
                  {alreadyLogged ? (
                    ""
                  ) : (
                    <>
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
                    </>
                  )}
                </BlockAction>
                <TourReminder>
                  <Tour />
                </TourReminder>
              </BlockContent>
            </BlockInner>
          </BlockCarousel>
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
              Meet our GitDaters around the world
            </h2>
            <MapContainer>
              <ShowMainMap markersFromDB={markersFromDB} />
            </MapContainer>
          </Features>
        </MapBlock>
        <Block>
          <BlockFeature>
            <PrideContainer>
              <PrideWordWrapper>
                <h2>
                  In GitDate,
                  <br />
                  Be who you are.
                  <br />
                  <br />
                  You could choose your gender options freely.
                  <br />
                  <br />
                  <TagButton>Female</TagButton>
                  <TagButton>Male</TagButton>
                  <TagButton>Non-binary</TagButton>
                  <TagButton>Transgender</TagButton>
                  <TagButton>Intersex</TagButton>
                  <TagButton>Prefer not to say</TagButton>
                  <TagButton>...more to come</TagButton>
                </h2>
              </PrideWordWrapper>
              <PrideItem>
                <PrideTitle>Building a better world</PrideTitle>
              </PrideItem>
            </PrideContainer>
          </BlockFeature>
        </Block>
      </Wrapper>
    </>
  );
};

export default Home;
