import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IssuesList = ({ issuesStatus, docs }: any) => {
  let navigate = useNavigate();

  return (
    <>
      <h1>Display {issuesStatus} issues here</h1>
      {docs.map((blog: any) => {
        const postTime = new Date(blog?.posted_at.seconds * 1000).toString();
        return (
          <>
            <h2>Blog title: {blog.title}</h2>
            <p>Posted time: {postTime}</p>
            <button
              onClick={() => {
                navigate("/issue/" + blog.issue_id);
              }}
            >
              Click to issue
            </button>
          </>
        );
      })}
    </>
  );
};

export default IssuesList;
