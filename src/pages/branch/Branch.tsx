import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import firebaseapi from "../../utils/firebaseapi";
import { DocumentData } from "firebase/firestore";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const CheckOutBtn = styled.button`
  margin: 20px;
  color: white;
  background-color: black;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
`;

const Branch = () => {
  let navigate = useNavigate();
  const userData = useSelector((state) => state) as any;
  const { id } = useParams<any>();
  const [getUser, setGetUser] = useState("");
  const [getUserName, setGetUserName] = useState("");
  const [getAuthor, setGetAuthor] = useState("");
  const [getAuthorID, setGetAuthorID] = useState("");
  const [branchData, setBranchData] = useState<DocumentData>();
  const [newT, setNewT] = useState("");

  useEffect(() => {
    const userId = userData.user.user_id;
    const userName = userData.user.user_name;
    console.log(userId);
    console.log(userName);
    if (userId && userName) {
      setGetUser(userId);
      setGetUserName(userName);
    }
    firebaseapi.readBranchData(id).then((res) => {
      if (res) {
        console.log(res);
        const newT = new Date(res.posted_at.seconds * 1000).toString();
        setNewT(newT);
        setBranchData(res);
      }
      firebaseapi.searchUserName(res?.hosted_by).then((res) => {
        if (res) {
          console.log(res["firstname"]);
          setGetAuthor(res["firstname"]);
          setGetAuthorID(res["user_id"]);
        }
      });
    });
  }, []);

  const deleteBranch = async (id: string | undefined) => {
    await firebaseapi.deleteBranch(id);
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        Display branch here <p>branch id: {id}</p>
        {branchData && (
          <div>
            <br />
            <img src={branchData.main_image} alt="main_photo" />
            <p>Type:</p>
            {branchData.type}
            <h2>Title:</h2>
            {branchData.title}
            <p>Content:</p>
            {branchData.content}
            <p>Branch status:</p>
            {branchData.status}
            <p>Date:</p>
            {branchData.date}
            <p>Location:</p>
            {branchData.location}
            <p>Posted by:</p>
            Author name: {getAuthor}
            <button
              onClick={() => {
                navigate("/readme/" + branchData.hosted_by);
              }}
            >
              Readme
            </button>
            <p>Posted at:</p>
            {newT}
          </div>
        )}
        <br />
        <CheckOutBtn>git checkout</CheckOutBtn>
        <h2>Area for author</h2>
        <button
          onClick={() => {
            deleteBranch(id);
          }}
        >
          Delete this branch
        </button>
      </Wrapper>
    </>
  );
};

export default Branch;
