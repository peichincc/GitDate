import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IssuesList = ({ issuesStatus, docs }: any) => {
  let navigate = useNavigate();
  return (
    <>
      <h1>Display {issuesStatus} issues here</h1>
      {docs.map((blog: any) => (
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

export default IssuesList;
