import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  max-width: 1376px;
  margin: 0 auto;
`;

interface Data {
  name: string;
  order: number;
}

const CreateIssue = () => {
  const [checked, setChecked] = useState(false);
  const MyCheckBoxList: Data[] = [
    {
      order: 0,
      name: "Angular",
    },
    {
      order: 1,
      name: "React",
    },
    {
      order: 2,
      name: "Java",
    },
    {
      order: 4,
      name: "Python",
    },
    {
      order: 3,
      name: "JavaScript",
    },
  ];

  return (
    <>
      <Wrapper>
        <h1>To create an issue</h1>
        <p>Category</p>
        <select>
          <option>Please Select your issue type</option>
          <option>Date</option>
          <option>Hang out</option>
          <option>Networking</option>
        </select>
        <br />
        <p>Title</p>
        <input></input>
        <br />
        <p>Content</p>
        <textarea></textarea>
        <br />
        <p>Tags</p>
        <ul>
          {MyCheckBoxList.map(({ name, order }, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  value={name}
                />
                {name}
              </li>
            );
          })}
        </ul>
        <br />
        <h2>Upload image</h2>
      </Wrapper>
    </>
  );
};

export default CreateIssue;
