import React, { useEffect, useState } from "react";
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
} from "../../utils/StyledComponent";

import branch from "./branch.png";

const BranchesHeader = styled(BoxHeader)`
  font-size: 14px;
  line-height: 1.5;
  color: #24292f;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BranchDate = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  color: #877457;
`;
const GithubTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 8px;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const RightContainer = styled.div``;

const BranchesList = ({ branchType, docs }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BranchesHeader>{branchType} Branches</BranchesHeader>
        <ContentContainer>
          {docs.map((blog: any) => (
            <>
              <BlogList>
                <LeftContainer>
                  <img
                    src={branch}
                    style={{ width: "20px", height: "20px" }}
                    alt="branch_icon"
                  />
                  <GithubTitleContainer>
                    <BranchDate>{blog.date}</BranchDate>
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
