import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const IssueAll = () => {
  let navigate = useNavigate();
  const db = getFirestore();

  return (
    <>
      <Wrapper>
        <p>Display all issues here.</p>
      </Wrapper>
    </>
  );
};

export default IssueAll;
