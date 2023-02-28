import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled from "styled-components";
import { BsInstagram } from "react-icons/bs"
import { AiOutlineInstagram, AiFillTwitterCircle } from "react-icons/ai"

const ContactWrapper = styled.div`
  border-top: solid gray .5px;
  margin-top: 50px;
  margin-bottom: 50px;
`

const ContactInfo = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  @media (max-width: 699px) {
    font-size: 1rem;
  }
`

const ContactLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  @media (max-width: 699px) {
    font-size: 1rem;
  }
`

const Contact = () => {
  return(
    <ContactWrapper>
      <ContactInfo>
        <h2>Follow Us</h2>
        <h2>Work With Us</h2>
      </ContactInfo>
      <ContactLinks>
        <div>
          <a href="https://www.instagram.com/" target="_blank"><AiOutlineInstagram color="white" size={35} style={{ marginRight: 10 }}/></a>
          <a href="https://www.twitter.com/" target="_blank"><AiFillTwitterCircle color="white" size={35}/></a>
        </div>
        <StyledAnchor href="mailto:team@movementmixing.com">team@movementmixing.com</StyledAnchor>
      </ContactLinks>
    </ContactWrapper>
  );
}

export default Contact;