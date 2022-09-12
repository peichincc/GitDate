import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Participants = ({ participantsList }: any) => {
  return (
    <>
      Participants:
      {participantsList.map((list: any) => (
        <>
          {list.name} _
          <img
            src={list.photo}
            alt="Participants_photo"
            style={{ width: 50, height: 50 }}
          />
        </>
      ))}
    </>
  );
};

export default Participants;
