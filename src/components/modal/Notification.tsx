import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import FriendAlert from "./FriendAlert";

const NotificationBox = styled.div`
  position: absolute;
  top: 23px;
  right: 230px;
  font-size: 18px;
  color: #f6f8fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 25px;
  height: 25px;
  cursor: pointer;
  @media screen and (max-width: 770px) {
    right: 10px;
  }
  &:hover {
    color: #9a9b9d;
  }
`;

const Notification = () => {
  const [alertWithCTAPop, setAlertWithCTAPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const openAlert = () => {
    setAlertMsg("You have pull requests, let's go checking!");
    setAlertWithCTAPop(true);
    return;
  };
  return (
    <>
      <FriendAlert
        trigger={alertWithCTAPop}
        setAlertWithCTAPop={setAlertWithCTAPop}
        alertMsg={alertMsg}
      />
      <NotificationBox>
        <FontAwesomeIcon icon={faTriangleExclamation} onClick={openAlert} />
      </NotificationBox>
    </>
  );
};

export default Notification;
