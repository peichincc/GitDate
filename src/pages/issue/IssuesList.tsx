import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BoxHeader,
  Container,
  ContentContainer,
  BlogList,
  GithubPostTitle,
  GithubSubTitle,
  Button,
} from "../../utils/styledComponent";
import { ReactComponent as Open } from "../../assets/images/issueOpen.svg";
import ToggleOn from "../../assets/images/toggleOn.svg";
import ToggleOff from "../../assets/images/toggleOff.svg";
import { DocumentData } from "firebase/firestore";

const IssueList = styled(BlogList)`
  @media screen and (max-width: 770px) {
    flex-direction: column;
    justify-content: space-evenly;
  }
`;
const IssuesHeader = styled(BoxHeader)`
  font-size: 14px;
  line-height: 1.5;
  color: #24292f;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeftContainer = styled.div``;
const HeaderRightContainer = styled.div``;
const ToggleOnBtn = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const RightContainer = styled.div``;
const IconContainer = styled.div``;
const CategoryContainer = styled.div`
  width: 100px;
  padding-bottom: 6px;
  padding-left: 8px;
`;
const CategoryContainerGallery = styled(CategoryContainer)`
  text-align: center;
  padding-left: 0;
`;
const GithubPostTitleGallery = styled(GithubPostTitle)`
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 50px;
  width: 220px;
`;
const GithubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
`;
const CardsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;
const CardContainer = styled.div`
  margin: 20px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 280px;
  background: #fff;
  border-radius: 4px;
`;
const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;
const ImageBoxImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 20px;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
    transition-duration: 0.5s;
  }
`;
const ContentBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 150px;
`;

const IssuesList = (props: { issuesStatus: string; docs: DocumentData }) => {
  const { issuesStatus, docs } = props;
  const [switchMode, setSwitchMode] = useState(true);
  let navigate = useNavigate();

  return (
    <>
      <Container>
        <IssuesHeader>
          <HeaderLeftContainer>{issuesStatus} issues</HeaderLeftContainer>
          <HeaderRightContainer>
            <ToggleOnBtn
              id="issuesToggle"
              onClick={() => setSwitchMode((pre) => !pre)}
            >
              {switchMode ? (
                <img src={ToggleOn} alt="ToggleBtn" />
              ) : (
                <img src={ToggleOff} alt="ToggleBtn" />
              )}
            </ToggleOnBtn>
          </HeaderRightContainer>
        </IssuesHeader>
        {switchMode ? (
          <ContentContainer>
            {docs.map(
              (blog: {
                posted_at: { seconds: number };
                category: string;
                title: string;
                issue_id: string;
              }) => {
                const newT = new Date(blog?.posted_at.seconds * 1000);
                const postTime =
                  newT.getFullYear() +
                  "-" +
                  ("0" + (newT.getMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + newT.getDate()).slice(-2);
                return (
                  <>
                    <IssueList key={`allissue-${blog.issue_id}`}>
                      <LeftContainer>
                        <IconContainer>
                          <Open stroke="#adecbf" />
                        </IconContainer>
                        <CategoryContainer>{blog.category}</CategoryContainer>
                        <GithubTitleContainer>
                          <GithubPostTitle>{blog.title}</GithubPostTitle>
                          <GithubSubTitle>
                            Posted time: {postTime}
                          </GithubSubTitle>
                        </GithubTitleContainer>
                      </LeftContainer>
                      <RightContainer>
                        <Button
                          id="issueClick"
                          onClick={() => {
                            navigate("/issue/" + blog.issue_id);
                          }}
                        >
                          Click to issue
                        </Button>
                      </RightContainer>
                    </IssueList>
                  </>
                );
              }
            )}
          </ContentContainer>
        ) : (
          <CardsContainer>
            {docs.map(
              (blog: {
                posted_at: { seconds: number };
                category: string;
                title: string;
                issue_id: string;
                main_image: string;
              }) => {
                const newT = new Date(blog?.posted_at.seconds * 1000);
                const postTime =
                  newT.getFullYear() +
                  "-" +
                  ("0" + (newT.getMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + newT.getDate()).slice(-2);
                return (
                  <>
                    <CardContainer key={blog.issue_id}>
                      <Card>
                        <ImageBox>
                          <ImageBoxImage
                            id="issueClick"
                            src={blog.main_image}
                            alt="issue_photo"
                            onClick={() => {
                              navigate("/issue/" + blog.issue_id);
                            }}
                          />
                        </ImageBox>
                        <ContentBox>
                          <CategoryContainerGallery>
                            {blog.category}
                          </CategoryContainerGallery>
                          <GithubPostTitleGallery>
                            {blog.title}
                          </GithubPostTitleGallery>
                          <GithubSubTitle>
                            Posted time: {postTime}
                          </GithubSubTitle>
                        </ContentBox>
                      </Card>
                    </CardContainer>
                  </>
                );
              }
            )}
          </CardsContainer>
        )}
      </Container>
    </>
  );
};

export default IssuesList;
