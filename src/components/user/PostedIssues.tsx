import { DocumentData } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BoxHeader } from "../../pages/profile/Profile";
import { ClickBtn } from "../../utils/styledComponent";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-right: 50px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  height: auto;
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
  width: 60px;
  text-align: center;
`;

const PostedIssues = ({ postedIssues }: DocumentData) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BoxHeader>Posted issues</BoxHeader>
        <ContentContainer>
          {postedIssues && postedIssues.length > 0
            ? postedIssues.map(
                (blog: { status: string; title: string; issue_id: string }) => (
                  <>
                    <BlogList key={`list-${blog.issue_id}`}>
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
                )
              )
            : "...more to come"}
        </ContentContainer>
      </Container>
    </>
  );
};

export default PostedIssues;
