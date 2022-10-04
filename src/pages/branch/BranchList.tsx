import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  BoxHeader,
  Container,
  ContentContainer,
  BlogList,
  GithubPostTitle,
  Button,
} from "../../utils/styledComponent";
import branch from "../../assets/icons/branch.png";

const BranchesHeader = styled(BoxHeader)`
  font-size: 14px;
  line-height: 1.5;
  color: #24292f;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const BranchDate = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  color: #877457;
`;
const ImageBox = styled.div`
  width: 168px;
  height: 100px;
  background: transparent;
  border-radius: 20px;
  overflow: hidden;
  margin-right: 12px;
`;
const ImageBoxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
    transition-duration: 0.5s;
  }
`;
const GithubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const LeftContainer = styled.div`
  display: flex;
`;
const RightContainer = styled.div``;

const BranchesList = ({ branchType, docs }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BranchesHeader>
          <img
            src={branch}
            style={{ width: "20px", height: "20px" }}
            alt="branch_icon"
          />
          {branchType} Branches
        </BranchesHeader>
        <ContentContainer>
          {docs.map((blog: any) => (
            <>
              <BlogList>
                <LeftContainer>
                  <ImageBox>
                    <ImageBoxImage
                      src={blog.main_image}
                      alt="branch_photo"
                      onClick={() => {
                        navigate("/branch/" + blog.branch_id);
                      }}
                    />
                  </ImageBox>
                  <GithubTitleContainer>
                    <BranchDate>
                      {blog.date} · {blog.time}
                    </BranchDate>
                    <GithubPostTitle>{blog.title}</GithubPostTitle>
                  </GithubTitleContainer>
                </LeftContainer>
                <RightContainer>
                  <Button
                    onClick={() => {
                      navigate("/branch/" + blog.branch_id);
                    }}
                  >
                    Click to Branch
                  </Button>
                </RightContainer>
              </BlogList>
            </>
          ))}
        </ContentContainer>
      </Container>
    </>
  );
};

export default BranchesList;
