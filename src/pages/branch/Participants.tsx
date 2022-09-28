import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ParticipantsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
const ParticipantContainer = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  max-width: 150px;
  min-width: 140px;
  height: 150px;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const PhotoBox = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 9999px;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
    transition-duration: 0.5s;
  }
`;
const NameTag = styled.div`
  margin-top: 15px;
`;

const Participants = ({ participantsList }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <ParticipantsContainer>
        {participantsList.map((list: any) => (
          <>
            <ParticipantContainer>
              <PhotoBox
                src={list.photo}
                alt="Participants_photo"
                onClick={() => {
                  navigate("/readme/" + list.id);
                }}
              />
              <NameTag> {list.name}</NameTag>
            </ParticipantContainer>
          </>
        ))}
      </ParticipantsContainer>
    </>
  );
};

export default Participants;
