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
  const dispatch = useDispatch();
  const userData = useSelector((state) => state) as any;
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
    signOut(auth)
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
        <Title>Member Sign In</Title>
        {alreadyLogged ? (
          <>
            <h2>Welcome! {userData.user.user_name}</h2>
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
