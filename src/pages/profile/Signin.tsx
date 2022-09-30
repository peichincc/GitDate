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

import Alert from "../../components/modal/Alert";

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
  const [ButtonPop, setButtonPop] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state) as any;
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(userInfo.isLogged);
    setAlreadyLogged(userInfo.isLogged);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        var uid = user.uid;
        firebaseapi.searchUserName(uid).then((result) => {
          if (result) {
            // console.log(result);
            // console.log(result["firstname"]);
            dispatch(
              setUserData(
                result["user_id"],
                result["firstname"],
                result["main_photo"]
              )
            );
            console.log(userInfo);
            setAlreadyLogged(true);
          }
        });
        // setAlreadyLogged(true);
      }
    });
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, recipient.email, recipient.password)
      .then(() => {
        // dispatch(signin());
        // navigate("/");
        setIsLoading(false);
        // setAlreadyLogged(true);
        setButtonPop(true);
        setAlertMsg("Log in successfully!");
        // console.log(userInfo.isLogged);
        setAlreadyLogged(userInfo.isLogged);
      })
      .catch((error) => {
        setButtonPop(true);
        setAlertMsg("Please enter the correct info");
        setIsLoading(false);
      });
  };

  return (
    <>
      <Wrapper>
        <Alert
          trigger={ButtonPop}
          setButtonPop={setButtonPop}
          alertMsg={alertMsg}
        />
        <BlockInnerImg>
          <BlockInner>
            <BlockContent>
              <Container>
                <Title>Sign In to GitDate</Title>
                {alreadyLogged ? (
                  <>
                    <h2>Welcome! {userInfo.user.user_name}</h2>
                    <SubmitBtn onClick={() => navigate("/member")}>
                      Your Profile
                    </SubmitBtn>
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
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              onSubmit();
                            }
                          }}
                        />
                      </FormInputContainer>
                    </FormGroup>
                    <SubmitBtn onClick={onSubmit}>Sign In</SubmitBtn>
                    <TextReminder>
                      New to GitDate?{" "}
                      <SignUpBtn onClick={() => navigate("/signup")}>
                        Create an account.
                      </SignUpBtn>
                    </TextReminder>
                    <TextReminder>
                      Test account: <br />
                      test@test.com / password: 123456
                      <br />
                      test2@test.com / password: 123456
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
