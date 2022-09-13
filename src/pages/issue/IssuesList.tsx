import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IssuesList = ({ issuesStatus, docs }: any) => {
  let navigate = useNavigate();

  return (
    <>
      <h1>Display {issuesStatus} issues here</h1>
      {docs.map((blog: any) => {
        const newT = new Date(blog?.posted_at.seconds * 1000);
        const postTime =
          newT.getFullYear() +
          "-" +
          ("0" + (newT.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + newT.getDate()).slice(-2);
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
