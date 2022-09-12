import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BranchesList = ({ docs }: any) => {
  let navigate = useNavigate();
  return (
    <>
      {docs.map((blog: any) => (
        <>
          <h2>Branch title: {blog.title}</h2>
          <button
            onClick={() => {
              navigate("/branch/" + blog.branch_id);
            }}
          >
            Click to Branch
          </button>
        </>
      ))}
    </>
  );
};

export default BranchesList;
