import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import firebaseapi from "../../src/utils/firebaseapi";
import {
  doc,
  query,
  collection,
  where,
  onSnapshot,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import useOnclickOutside from "react-cool-onclickoutside";
import { ReactComponent as GitHub } from "./github.svg";
import { ReactComponent as Member } from "./member.svg";
import { Tours, stepType } from "./Tours";
import SearchResults from "./SearchResults";

import Notification from "../components/modal/Notification";

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 62px;
  background-color: #24292f;
  padding-left: 16px;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 770px) {
    padding-left: 0;
  }
`;

const LogoContainer = styled(Link)`
  cursor: pointer;
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
  height: auto;
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
const SearchContainer = styled.div`
  position: absolute;
  width: 270px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  border-radius: 0px 0px 6px 6px;
`;

const CategoryLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  width: 100%;
  margin-top: 7px;
  @media screen and (max-width: 770px) {
    display: none;
  }
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
  @media screen and (max-width: 770px) {
    border-bottom: 1px solid #d0d7de;
    padding-bottom: 8px;
    padding-top: 8px;
    font-size: 14px;
    color: #d0d7de;
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

const MobileBar = styled.div`
  @media screen and (max-width: 770px) {
    display: block;
  }
`;
const ToggleBtn = styled.button`
  margin-left: 16px;
  height: 24px;
  width: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0;
  box-sizing: border-box;
  @media screen and (min-width: 770px) {
    display: none;
  }
`;
const ToggleBtnLine = styled.div`
  width: 17px;
  height: 2px;
  background: #d0d7de;
`;
const MobileSidebar = styled.div`
  position: absolute;
  width: 100%;
  height: 250px;
  background-color: #24292f;
  top: 62px;
`;
const MobileLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
const ClostBtn = styled.button`
  font-size: 20px;
  background-color: #24292f;
  border: none;
  margin-top: 3px;
  color: white;
`;

const Header = () => {
  const db = getFirestore();
  const [showNotification, setShowNotification] = useState(false);
  const [getInvitationList, setGetInvitationList] = useState<any>();
  const [arrayLength, setArrayLength] = useState(0);
  const currentPage = useLocation();
  const [page, setPage] = useState<any>("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state) as any;

  const [searchResults, setSearchRsults] = useState<DocumentData>();

  // Mobile sidebar (RWD)
  const [showSidebar, setShowSidebar] = useState(false);
  const clickhandler = () => {
    setShowSidebar(true);
  };

  useEffect(() => {
    const userId = userInfo.user.user_id;
    console.log(userId);
    getFriend(userId);
    // console.log(currentPage);
    // console.log(currentPage.pathname);
    setPage(currentPage.pathname);
  }, [currentPage]);

  const getFriend = (id: string) => {
    onSnapshot(doc(collection(db, "Users"), id), (doc) => {
      if (doc.exists()) {
        setGetInvitationList(doc.data().friend_request);
        // console.log(doc.data().friend_request);
        // To compare the friend request
        setArrayLength(doc.data().friend_request.length);
        setShowNotification(false);
        if (doc.data().friend_request.length > arrayLength) {
          setShowNotification(true);
        }
      }
    });
  };

  const memberHandler = () => {
    if (userInfo.user.user_id) {
      navigate("/member");
    } else {
      navigate("/signin");
    }
  };

  const [searchName, setSearchName] = useState("");
  const [expanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    setExpanded(false);
  });

  const getSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };
  const getSearchResults = () => {
    firebaseapi.searchUserByName(searchName).then((res) => {
      console.log(res);
      if (res) {
        expand();
        // console.log(res["firstname"]);
        setSearchRsults(res);
      }
    });
  };

  return (
    <>
      <Wrapper>
        <MobileBar>
          <ToggleBtn onClick={clickhandler}>
            <ToggleBtnLine />
            <ToggleBtnLine />
            <ToggleBtnLine />
          </ToggleBtn>
        </MobileBar>
        {showSidebar && (
          <MobileSidebar>
            <MobileLinkContainer>
              <Category to="issues" id="issues">
                Issues
              </Category>
              <Category to="branches" id="branches">
                Branches
              </Category>
              <Category as="div" id="docs">
                <Tours stepType={stepType} page={page} />
              </Category>
              <Category to="repo" id="repo">
                Repo
              </Category>
              <Category as="div" onClick={memberHandler}>
                <Member />
              </Category>
              <ClostBtn
                onClick={() => {
                  setShowSidebar(false);
                }}
              >
                &times;
              </ClostBtn>
            </MobileLinkContainer>
          </MobileSidebar>
        )}
        <LogoContainer to="/">
          <GitHub stroke="#FFF" />
        </LogoContainer>
        <SearchForm>
          <SearchWrapper id="searchUser">
            <SearchInput
              placeholder="Enter name to search user..."
              onChange={getSearchName}
            />
            <SearchBtn onClick={getSearchResults}>/</SearchBtn>
          </SearchWrapper>
          {expanded && (
            <SearchContainer ref={ref}>
              <SearchResults searchResults={searchResults} />
            </SearchContainer>
          )}
        </SearchForm>
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
              {showNotification && <Notification />}
              <Category as="div" id="docs">
                <Tours stepType={stepType} page={page} />
              </Category>
              <Category to="repo" id="repo">
                Repo
              </Category>
              <Category as="div" onClick={memberHandler}>
                <Member />
              </Category>
            </RightContainer>
          </CategoryContainer>
        </CategoryLinks>
      </Wrapper>
    </>
  );
};

export default Header;
