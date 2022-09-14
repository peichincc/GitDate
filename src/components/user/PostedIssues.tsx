import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostedIssues = ({ postedIssues }: any) => {
  let navigate = useNavigate();
  return (
    <>
      Display posted issues
      {postedIssues.map((blog: any) => (
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

export default PostedIssues;
