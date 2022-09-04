import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../actions";

import firebase from "firebase/compat/app";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Title = styled.h1``;
const FormGroup = styled.div``;
const FormLabel = styled.div``;
const FormControl = styled.input``;
const SubmitBtn = styled.button``;

interface ListData {
  label: string;
  key: string;
  type?: string;
}

const signInData: ListData[] = [
  { label: "Email", key: "email", type: "text" },
  { label: "Password", key: "password", type: "password" },
];

const Signin = () => {
  //redux test
  const dispatch = useDispatch();
  const isLogged = useSelector((state: any) => state.isLogged);
  //
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const navigate = useNavigate();
  interface recipientType {
    email: string;
    password: string;
  }
  const [recipient, setRecipient] = useState<recipientType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        // console.log(uid);
        window.localStorage.setItem("userId", uid);
        setAlreadyLogged(true);
      }
    });
  }, []);

  const onSubmit = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(recipient.email, recipient.password)
      .then(() => {
        navigate("/");
        setIsLoading(false);
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sign out!");
      })
      .catch((error) => {
        console.log(error);
      });
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <>
      <Wrapper>
        {isLogged ? (
          <p>redux test: already log in</p>
        ) : (
          <p>redux test: not log in</p>
        )}
        <button
          onClick={() => {
            dispatch(signin());
          }}
        >
          redux test
        </button>
        <Title>Member Sign In</Title>
        {alreadyLogged ? (
          <>
            <h2>Welcome!</h2>
            <SubmitBtn onClick={signout}>Sign out</SubmitBtn>
          </>
        ) : (
          <>
            {signInData.map(({ label, key, type }: ListData) => (
              <FormGroup key={key}>
                <FormLabel>{label}</FormLabel>
                <FormControl
                  type={type}
                  value={recipient[key as keyof recipientType]}
                  onChange={(e) =>
                    setRecipient({ ...recipient, [key]: e.target.value })
                  }
                />
              </FormGroup>
            ))}
            <SubmitBtn onClick={onSubmit}>Send</SubmitBtn>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Signin;
