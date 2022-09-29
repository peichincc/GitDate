import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import FriendAlert from "./FriendAlert";

const NotificationWrapper = styled.div`
  position: fixed;
  top: 19px;
  right: 5px;
  z-index: 200;
`;
const NotificationBox = styled.div`
  font-size: 18px;
  color: black;
  border-radius: 50%;
  background-color: #f6f8fa;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
  &:hover {
    color: #9a9b9d;
  }
`;

const Notification = () => {
  const [alertWtihCTAPop, setAlertWtihCTAPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const openAlert = () => {
    setAlertMsg("You have pull requests, let's go checking!");
    setAlertWtihCTAPop(true);
    return;
  };
  return (
    <>
      <FriendAlert
        trigger={alertWtihCTAPop}
        setAlertWtihCTAPop={setAlertWtihCTAPop}
        alertMsg={alertMsg}
      />
      <NotificationWrapper>
        <NotificationBox>
          <FontAwesomeIcon icon={faTriangleExclamation} onClick={openAlert} />
        </NotificationBox>
      </NotificationWrapper>
    </>
  );
};

export default Notification;
