import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BoxHeader } from "../../pages/profile/Profile";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: 50vh;
`;
const ContentContainer = styled.div`
  padding: 20px;
`;

const BlogList = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d0d7de;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const BlogTitle = styled.div`
  display: flex;
`;
const BlogStatus = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 2em;
  border: 1px solid;
  margin-right: 20px;
`;
const ClickBtn = styled.button`
  border: 1px solid transparent;
  border-radius: 2em;
  cursor: pointer;
`;

const PostedIssues = ({ postedIssues }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BoxHeader>Posted issues</BoxHeader>
        <ContentContainer>
          {postedIssues.map((blog: any) => (
            <>
              <BlogList>
                <BlogTitle>
                  <BlogStatus>{blog.status}</BlogStatus>
                  {blog.title}
                </BlogTitle>
                <ClickBtn
                  onClick={() => {
                    navigate("/issue/" + blog.issue_id);
                  }}
                >
                  Click to issue
                </ClickBtn>
              </BlogList>
            </>
          ))}
        </ContentContainer>
      </Container>
    </>
  );
};

export default PostedIssues;
