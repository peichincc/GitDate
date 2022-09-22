import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FooterCopyright = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  color: #bdbdbd;
  display: block;
  text-align: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 1;
`;

const Footer = () => {
  return (
    <>
      <FooterCopyright>© 2022 GitDate | All Rights Reserved</FooterCopyright>
    </>
  );
};

export default Footer;
