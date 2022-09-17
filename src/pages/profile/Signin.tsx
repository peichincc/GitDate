import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, signin } from "../../actions";
import back from "./back.jpg";

import firebaseapi from "../../utils/firebaseapi";
import { auth } from "../../utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { Title } from "./Signup";
import { FormInputContainer } from "./Signup";
import { SubmitBtn } from "./Signup";

const Wrapper = styled.div`
  display: block;
  margin: 0 auto;
`;
const BlockInnerImg = styled.div`
  background-image: url(${back});
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #24292f;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  color: #333;
  height: calc(100vh - 64px);
`;
const BlockInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  max-width: 100%;
  padding: 16px;
`;
const BlockContent = styled.div`
  display: block;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 680px;
  padding: 32px;
  /* @media screen and (min-width: 900px) {
    max-width: 680px;
    padding: 32px;
  } */
`;
const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 576px;
  padding: 24px;
`;

const FormGroup = styled.div`
  margin-top: 15px;
`;
const FormLabel = styled.div``;
const FormControl = styled.input`
  border: 1 px;
  width: 200px;
`;

const TextReminder = styled.div`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;
const SignUpBtn = styled.button`
  padding: 5px;
  background: none;
  font-size: 16px;
  border: 0px;
  cursor: pointer;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

const Signin = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state) as any;
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            // console.log(result);
            // console.log(result["firstname"]);
            dispatch(setUserData(result["user_id"], result["firstname"]));
            console.log(userData);
          }
        });
        setAlreadyLogged(true);
      }
    });
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, recipient.email, recipient.password)
      .then(() => {
        dispatch(signin());
        // navigate("/");
        setIsLoading(false);
        setAlreadyLogged(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use": {
            setErrorMsg("Email already in use");
            break;
          }
        }
        setIsLoading(false);
      });
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
        <BlockInnerImg>
          <BlockInner>
            <BlockContent>
              <Container>
                <Title>Sign In to GitDate</Title>
                {alreadyLogged ? (
                  <>
                    <h2>Welcome! {userData.user.user_name}</h2>
                    <SubmitBtn onClick={signout}>Sign out</SubmitBtn>
                  </>
                ) : (
                  <>
                    <FormGroup key="email">
                      <FormLabel>email address</FormLabel>
                      <FormInputContainer>
                        <FormControl
                          type="text"
                          value={recipient.email}
                          onChange={(e) =>
                            setRecipient({
                              ...recipient,
                              email: e.target.value,
                            })
                          }
                        />
                      </FormInputContainer>
                    </FormGroup>
                    <FormGroup key="password">
                      <FormLabel>Password</FormLabel>
                      <FormInputContainer>
                        <FormControl
                          type="password"
                          value={recipient.password}
                          onChange={(e) =>
                            setRecipient({
                              ...recipient,
                              password: e.target.value,
                            })
                          }
                        />
                      </FormInputContainer>
                    </FormGroup>
                    <SubmitBtn onClick={onSubmit}>Sign In</SubmitBtn>
                    <TextReminder>
                      New to GitDate? <SignUpBtn>Create an account.</SignUpBtn>
                    </TextReminder>
                  </>
                )}
              </Container>
            </BlockContent>
          </BlockInner>
        </BlockInnerImg>
      </Wrapper>
    </>
  );
};

export default Signin;
