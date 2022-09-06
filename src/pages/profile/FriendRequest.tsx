import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firebaseapi from "../../utils/firebaseapi";

interface Props {
  sentInvitationList: [];
  getInvitationList: [];
}

const Friend = ({ sentInvitationList, getInvitationList }: Props) => {
  return (
    <>
      <p>Recieved request:</p>
      {getInvitationList &&
        getInvitationList.map((anObjectMapped, index) => {
          return (
            <div>
              <p key={`${anObjectMapped["user_name"]}`}>
                {anObjectMapped["user_name"]} - {anObjectMapped["user_id"]}
              </p>
              <button>Merge</button>
              <button>Close</button>
            </div>
          );
        })}
      <p>Sent request:</p>
      {sentInvitationList &&
        sentInvitationList.map((anObjectMapped, index) => {
          return (
            <div>
              <p key={`${anObjectMapped["user_name"]}`}>
                {anObjectMapped["user_name"]} - {anObjectMapped["user_id"]}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default Friend;
