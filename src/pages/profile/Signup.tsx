import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { auth } from "../../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

const Title = styled.h1``;
const FormGroup = styled.div``;
const FormLabel = styled.div``;
const FormControl = styled.input``;
const SubmitBtn = styled.button`
  width: 200px;
`;

interface ListData {
  label: string;
  key: string;
  type?: string;
}

const signInData: ListData[] = [
  { label: "Email", key: "email", type: "text" },
  { label: "Password", key: "password", type: "password" },
];

const Signup = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  interface recipientType {
    email: string;
    password: string;
  }
  const [recipient, setRecipient] = useState<recipientType>({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, recipient.email, recipient.password)
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

  return (
    <>
      <Wrapper>
        <Title>Member Sign Up</Title>
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
        {errorMsg && <p>{errorMsg}</p>}
        <SubmitBtn onClick={onSubmit}>
          {isLoading ? "Loading" : "Send"}
        </SubmitBtn>
      </Wrapper>
    </>
  );
};

export default Signup;
