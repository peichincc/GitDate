import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, signin } from "../../actions";

import firebaseapi from "../../utils/firebaseapi";
import { auth } from "../../utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { Container } from "./Signup";
import { Title } from "./Signup";
import { FormInputContainer } from "./Signup";
import { SubmitBtn } from "./Signup";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-top: 15px;
`;
const FormLabel = styled.div``;
const FormControl = styled.input`
  border: 0 0 1 0px;
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
            console.log(result);
            console.log(result["firstname"]);
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
                      setRecipient({ ...recipient, email: e.target.value })
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
                      setRecipient({ ...recipient, password: e.target.value })
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
      </Wrapper>
    </>
  );
};

export default Signin;
