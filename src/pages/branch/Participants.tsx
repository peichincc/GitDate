import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ParticipantContainer = styled.div`
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
`;

const Participants = ({ participantsList }: any) => {
  return (
    <>
      {participantsList.map((list: any) => (
        <>
          <ParticipantContainer>
            <PhotoBox src={list.photo} alt="Participants_photo" />
            {list.name}
          </ParticipantContainer>
        </>
      ))}
    </>
  );
};

export default Participants;
