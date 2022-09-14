import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HostedBranches = ({ hostedBranches }: any) => {
  let navigate = useNavigate();
  return (
    <>
      Display hosted branches
      {hostedBranches.map((blog: any) => (
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
