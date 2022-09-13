import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUserData, signin } from "../../src/actions/index";
import firebaseapi from "../../src/utils/firebaseapi";
import { auth } from "../../src/utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Wrapper = styled.div`
  max-width: 1376px;
  display: flex;
  margin: 0 auto;
  height: 62px;
  background-color: #24292f;
`;

const LogoContainer = styled.div`
  width: 62px;
  height: 62px;
  background-image: url(${logo});
  background-size: contain;
`;

const CategoryLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;
const Category = styled(Link)`
  color: white;
  margin-right: 20px;
`;

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state) as any;
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       var uid = user.uid;
  //       firebaseapi.searchUserName(uid).then((result) => {
  //         if (result) {
  //           console.log(result);
  //           console.log(result["firstname"]);
  //           dispatch(setUserData(result["user_id"], result["firstname"]));
  //           console.log(userData);
  //         }
  //       });
  //       setAlreadyLogged(true);
  //     }
  //   });
  // }, []);

  return (
    <>
      <Wrapper>
        <LogoContainer />
        <CategoryLinks>
          <Category to="issues">Issues</Category>
          <Category to="createissue">PostIssue</Category>
          <Category to="branches">Branch</Category>
          <Category to="createbranch">NewBranch</Category>
          <Category to="profile">Profile(member)</Category>
          <Category to="signin">LogIn</Category>
          <Category to="signup">SignUp</Category>
        </CategoryLinks>
      </Wrapper>
    </>
  );
};

export default Header;
