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
  @media screen and (max-width: 770px) {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-button {
    display: none;
    background: transparent;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #f6f8fa;
    border: 1px solid #d0d7de;
    border-bottom: 0px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: transparent;
  }
`;
const BlogList = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d0d7de;
  padding-top: 10px;
  padding-bottom: 10px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;
const BlogTitle = styled.div`
  display: flex;
  @media screen and (max-width: 770px) {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 20px;
    text-align: center;
  }
`;
const CardsContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  @media screen and (min-width: 770px) {
    display: none;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: auto;
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

const AttendedBranches = ({ attendedBranches }: DocumentData) => {
  let navigate = useNavigate();
  return (
    <>
      <Container>
        <BoxHeader>Attended branches</BoxHeader>
        <ContentContainer>
          {attendedBranches && attendedBranches.length > 0
            ? attendedBranches.map(
                (blog: {
                  date: string;
                  main_image: string | undefined;
                  title: string;
                  id: string;
                }) => (
                  <>
                    <BlogList key={`attended-${blog.id}`}>
                      <BlogTitle>{blog.title}</BlogTitle>
                      <ClickBtn
                        onClick={() => {
                          navigate("/branch/" + blog.id);
                        }}
                      >
                        Click to branch
                      </ClickBtn>
                    </BlogList>
                    <CardsContainer>
                      <Card>
                        <ImageBox
                          onClick={() => {
                            navigate("/branch/" + blog.id);
                          }}
                        >
                          <ImageBoxImage src={blog.main_image} />
                        </ImageBox>
                        <BlogTitle>{blog.title}</BlogTitle>
                        {blog.date}
                      </Card>
                    </CardsContainer>
                  </>
                )
              )
            : "...more to come"}
        </ContentContainer>
      </Container>
    </>
  );
};

export default AttendedBranches;
