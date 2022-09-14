import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BoxHeader } from "../../pages/profile/Profile";

const AttendedBranches = ({ attendedBranches }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <BoxHeader>Display attended branches</BoxHeader>
      {attendedBranches.map((blog: any) => (
        <>
          <h2>Blog title: {blog.title}</h2>
          <button
            onClick={() => {
              navigate("/branch/" + blog.id);
            }}
          >
            Click to issue
          </button>
        </>
      ))}
    </>
  );
};

export default AttendedBranches;
