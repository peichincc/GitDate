import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setUserData, signin } from "../../src/actions/index";
import firebaseapi from "../../src/utils/firebaseapi";
import { DocumentData } from "firebase/firestore";
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

import { Tours } from "./Tours";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 62px;
  background-color: #24292f;
  padding-left: 16px;
  align-items: center;
  width: 100%;
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
      stroke: #9a9b9d;
    }
  }
`;
const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  max-width: 272px;
  /* min-height: 28px; */
  margin-top: 6px;
  background-color: #24292f;
  border: 1px solid #57606a;
  border-radius: 6px;
`;
const SearchInput = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  background: none;
  border: none;
  &:focus {
    background-color: white;
  }
`;
const SearchBtn = styled.button`
  margin-right: 4px;
  width: 22px;
  height: 20px;
  color: #57606a;
  cursor: pointer;
  border: 1px solid #57606a;
  background-color: #24292f;
`;
const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;
const ResultBox = styled.div`
  width: 100%;
  background-color: white;
  height: 20px;
  color: black;
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
  font-size: 16px;
  line-height: 1.5;
  font-weight: 600;
  color: white;
  margin-right: 30px;
  cursor: pointer;
  :hover {
    color: #9a9b9d;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
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
  const userInfo = useSelector((state) => state) as any;
  const [alreadyLogged, setAlreadyLogged] = useState(false);

  const [searchResults, setSearchRsults] = useState<DocumentData>();

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
            console.log(userInfo);
          }
        });
        setAlreadyLogged(true);
      }
    });
  }, []);

  const memberHandler = () => {
    if (userInfo.user.user_id) {
      navigate("/member");
    } else {
      navigate("/signin");
    }
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out!");
        alert("Signed out successfully");
        dispatch(signin());
        dispatch(setUserData("", "", ""));
        setAlreadyLogged(false);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
    console.log(userInfo);
  };

  const [searchName, setSearchName] = useState("");
  const [expanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }

  function close() {
    setExpanded(false);
  }
  const getSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  const getSearchResults = () => {
    firebaseapi.searchUserByName(searchName).then((res) => {
      console.log(res);
      if (res) {
        // console.log(res["firstname"]);
        setSearchRsults(res);
      }
      expand();
    });
  };

  return (
    <>
      <Wrapper>
        <LogoContainer to="/">
          <GitHub stroke="#FFF" />
        </LogoContainer>
        {/* <SearchForm>
          <SearchWrapper>
            <SearchInput
              placeholder="Enter name to search user..."
              onChange={getSearchName}
            />
            <SearchBtn onClick={getSearchResults}>/</SearchBtn>
          </SearchWrapper>
          {expanded && (
            <ResultBox>
              {searchResults?.map((user: any) => {
                <>
                  <h1>{user.firstname}</h1>
                </>;
              })}
            </ResultBox>
          )}
        </SearchForm> */}
        <CategoryLinks>
          <CategoryContainer>
            <LeftContainer>
              <Category to="issues" id="issues">
                Issues
              </Category>
              <Category to="branches" id="branches">
                Branches
              </Category>
            </LeftContainer>
            <RightContainer>
              {/* <Category to="tutorial">
                Docs
              </Category> */}
              <Category as="div" id="docs">
                {/* Docs */}
                <Tours />
              </Category>
              <Category to="repo" id="repo">
                Repo
              </Category>
              <Category as="div" onClick={memberHandler}>
                <Member />
              </Category>
              {/* <Category as="div" onClick={signout}>
                <Logout />
              </Category> */}
            </RightContainer>
          </CategoryContainer>
        </CategoryLinks>
      </Wrapper>
    </>
  );
};

export default Header;
