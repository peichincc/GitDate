import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HostedBranches = ({ hostedIssues }: any) => {
  let navigate = useNavigate();
  return (
    <>
      Display hosted branches
      {hostedIssues.map((blog: any) => (
        <>
          <h2>Blog title: {blog.title}</h2>
          <button
            onClick={() => {
              navigate("/issue/" + blog.issue_id);
            }}
          >
            Click to issue
          </button>
        </>
      ))}
    </>
  );
};

export default HostedBranches;
