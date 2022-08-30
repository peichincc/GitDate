import React from "react";
import styled from "styled-components";

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
}

const signInData: ListData[] = [
  { label: "Account", key: "account" },
  { label: "Password", key: "password" },
];

const LogIn = () => {
  return (
    <>
      <Wrapper>
        <Title>Member Sign In</Title>
        {signInData.map(({ label, key }: ListData) => (
          <FormGroup key={key}>
            <FormLabel>{label}</FormLabel>
            <FormControl />
          </FormGroup>
        ))}
        <SubmitBtn>Send</SubmitBtn>
      </Wrapper>
    </>
  );
};

export default LogIn;
