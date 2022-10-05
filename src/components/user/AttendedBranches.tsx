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

const AttendedBranches = ({ attendedBranches }: DocumentData) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BoxHeader>Attended branches</BoxHeader>
        <ContentContainer>
          {attendedBranches && attendedBranches.length > 0
            ? attendedBranches.map((blog: { title: string; id: string }) => (
                <>
                  <BlogList key={blog.id.toString()}>
                    <BlogTitle>{blog.title}</BlogTitle>
                    <ClickBtn
                      onClick={() => {
                        navigate("/branch/" + blog.id);
                      }}
                    >
                      Click to branch
                    </ClickBtn>
                  </BlogList>
                </>
              ))
            : "...more to come"}
        </ContentContainer>
      </Container>
    </>
  );
};

export default AttendedBranches;
