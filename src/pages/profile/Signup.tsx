import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import firebase from "../../utils/firebase";

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

const Signup = () => {
  const navigate = useNavigate();
  interface recipient {
    email: string;
    password: string;
  }
  const [recipient, setRecipient] = useState<recipient>({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(recipient.email, recipient.password)
      .then(() => {
        navigate("/");
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
              value={recipient[key as keyof recipient]}
              onChange={(e) =>
                setRecipient({ ...recipient, [key]: e.target.value })
              }
            />
          </FormGroup>
        ))}
        <SubmitBtn onClick={onSubmit}>Send</SubmitBtn>
      </Wrapper>
    </>
  );
};

export default Signup;
