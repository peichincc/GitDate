import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendedBranches = ({ attendedBranches }: any) => {
  let navigate = useNavigate();
  return (
    <>
      Display attended branches
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
