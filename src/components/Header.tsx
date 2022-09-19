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

import { ReactComponent as Doc } from "./doc.svg";
import { ReactComponent as Repo } from "./repo.svg";
import { ReactComponent as GitHub } from "./github.svg";
import { ReactComponent as Member } from "./member.svg";
import { ReactComponent as Logout } from "./logout.svg";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 62px;
  background-color: #24292f;
  padding-left: 16px;
  align-items: center;
`;

const LogoContainer = styled(Link)`
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-image: url(${logo});
  background-size: contain; */
  &:hover {
    path {
      stroke: #ff69b4;
    }
  }
`;
const SearchForm = styled.div`
  width: 100%;
  margin-left: 10px;
  max-width: 272px;
  min-height: 28px;
  margin-top: 6px;
`;
const SearchInput = styled.input`
  width: 100%;
  background-color: #24292f;
  border: 1px solid #57606a;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
`;

const CategoryLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  width: 100%;
  margin-top: 7px;
`;
const Category = styled(Link)`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  font-size: 14px;
  line-height: 1.5;
  font-weight: 600;
  color: white;
  margin-right: 30px;
  cursor: pointer;
  :hover {
    color: #ff69b4;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const LeftContainer = styled.div``;
const RightContainer = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const Header = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state) as any;
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            console.log(result);
            console.log(result["firstname"]);
            dispatch(
              setUserData(
                result["user_id"],
                result["firstname"],
                result["main_photo"]
              )
            );
            console.log(userData);
          }
        });
        setAlreadyLogged(true);
      }
    });
  }, []);

  const memberHandler = () => {
    if (userData.user.user_id) {
      navigate("/member");
    } else {
      navigate("/signin");
    }
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out!");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        <LogoContainer to="/">
          <GitHub stroke="#FFF" />
        </LogoContainer>
        <SearchForm>
          <SearchInput placeholder="Search..." />
        </SearchForm>
        <CategoryLinks>
          <CategoryContainer>
            <LeftContainer>
              <Category to="issues">Issues</Category>
              <Category to="branches">Branch</Category>
            </LeftContainer>
            <RightContainer>
              <Category to="tutorial">
                Docs
                {/* <Doc /> */}
              </Category>
              <Category to="repo">
                Repo
                {/* <Repo /> */}
              </Category>
              <Category as="div" onClick={memberHandler}>
                <Member />
              </Category>
              <Category as="div" onClick={signout}>
                <Logout />
              </Category>
            </RightContainer>
          </CategoryContainer>
        </CategoryLinks>
      </Wrapper>
    </>
  );
};

export default Header;
