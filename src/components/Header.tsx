import React from "react";
import styled from "styled-components";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";

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
  return (
    <>
      <Wrapper>
        <LogoContainer />
        <CategoryLinks>
          <Category to="issues">Issues</Category>
          <Category to="createissue">Post issue</Category>
          {/* <Category to="branches">Branch</Category>
          <Category to="createbranch">New Branch</Category> */}
          <Category to="profile">Profile(member)</Category>
          <Category to="signin">Log In</Category>
          <Category to="signup">Sign Up</Category>
        </CategoryLinks>
      </Wrapper>
    </>
  );
};

export default Header;
