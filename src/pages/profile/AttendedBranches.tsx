import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AttendedBranches = ({ attendedIssues }: any) => {
  let navigate = useNavigate();
  return (
    <>
      Display attended branches
      {attendedIssues.map((blog: any) => (
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
