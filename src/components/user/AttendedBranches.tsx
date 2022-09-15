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

const ClickBtn = styled.button`
  border: 1px solid transparent;
  border-radius: 2em;
  cursor: pointer;
`;

const AttendedBranches = ({ attendedBranches }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BoxHeader>Attended branches</BoxHeader>
        <ContentContainer>
          {attendedBranches &&
            attendedBranches.map((blog: any) => (
              <>
                <BlogList>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <ClickBtn
                    onClick={() => {
                      navigate("/branch/" + blog.branch_id);
                    }}
                  >
                    Click to branch
                  </ClickBtn>
                </BlogList>
              </>
            ))}
        </ContentContainer>
      </Container>
    </>
  );
};

export default AttendedBranches;