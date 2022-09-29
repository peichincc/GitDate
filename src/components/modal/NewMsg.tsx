import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";

const MsgIcon = styled.div`
  position: absolute;
  right: 80px;
  top: 17px;
  font-size: 12px;
  color: #ff69b4;
`;

const NewMsg = () => {
  return (
    <>
      <MsgIcon>
        <FontAwesomeIcon icon={faMessage} />
      </MsgIcon>
    </>
  );
};

export default NewMsg;
