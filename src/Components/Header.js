import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CgMenu, CgClose } from 'react-icons/cg';
import { TfiClose, TfiMenu } from 'react-icons/tfi'
import { RxHamburgerMenu } from 'react-icons/rx'

  const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 100px;
  `;

  const HomeLink = styled(NavLink)`
    text-decoration: none;
    cursor: pointer;
    border-bottom: ${(props) => (props.homeActive ? 'solid white .5px' : 'none')};
    &:hover {
      border-bottom: solid white .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const FaqLink = styled(NavLink)`
    text-decoration: none;
    margin-left: 1rem;
    cursor: pointer;
    border-bottom: 
      ${(props) => (props.faqActive ? 'solid white .5px' : 'none')};
    &:hover {
      border-bottom: solid white .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const ContactLink = styled(NavLink)`
    text-decoration: none;
    cursor: pointer;
    margin-left: 1rem;
    border-bottom: 
      ${(props) => (props.contactActive ? 'solid white .5px' : 'none')};
    &:hover {
      border-bottom: solid white .5px;
    }
    @media (max-width: 405px) {
      margin: .55rem;
    }
  `;

  const HeaderTitleAndLinksContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
  `;

  const HeaderLinkContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media (max-width: 700px) {
      display: none
    }
  `;

  const StyledLink = styled(NavLink)`
    align-items: center;
    font-size: 1.2rem;
    color: white;
    display: flex;
    justify-content: center;
    text-decoration: none;
  `;

  const HamburgerToggle = styled.div`
    
    width: 100%;
    display: flex;
    align-items: center;
    justify_content: center;
    flex-direction: row-reverse;
    justify-content: end;
    position: absolute;
    z-index: 0;
    right: 0;
    margin-right: 1%;
    overflow: hidden;
    @media (min-width: 699px) {
      display: none;
    }
  `

  const MovementMixingLogo = styled.img`
  cursor: pointer;
    width: 250px;
    @media (max-width: 699px) {
      width: 100px;
    }
  `
  const HamburgerIcons = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `

const Header = ({ handleScroll }) => {

  const [toggle, setToggle] = useState(false);
  const [homeActive, setHomeActive] = useState(true);
  const [faqActive, setFaqActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  const open = <HamburgerIcons><RxHamburgerMenu size="30px" color="white" fontWeight= '100'/></HamburgerIcons>
  const close = <HamburgerIcons><TfiClose size="25px" color="white" /></HamburgerIcons>

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleHomeClick = () => {
    setHomeActive(true);
    setFaqActive(false);
    setContactActive(false);
  }

  const handleFaqClick = () => {
    setFaqActive(true);
    setHomeActive(false);
    setContactActive(false);
  }

  const handleContactClick = () => {
    setContactActive(true);
    setHomeActive(false);
    setFaqActive(false);
  }

  return (
      <HeaderContainer>
        <div onClick={refreshPage}>
          <MovementMixingLogo src="./MVMT Color REV.png" alt="Movement Mixing Logo" />
        </div>
        <HeaderTitleAndLinksContainer>
          <HeaderLinkContainer>
            <HomeLink to="/" onClick={handleHomeClick}homeActive={homeActive}>
              <StyledLink to="/">Home</StyledLink>
            </HomeLink>
            <FaqLink to="/faq" onClick={handleFaqClick} faqActive={faqActive}>
              <StyledLink to="/faq">FAQ</StyledLink>
            </FaqLink>
            <ContactLink onClick={handleContactClick} contactActive={contactActive}>
              <StyledLink onClick={handleScroll}>Contact</StyledLink>
            </ContactLink>
          </HeaderLinkContainer>
        </HeaderTitleAndLinksContainer>
        <HamburgerToggle>
          <div onClick={() => setToggle(!toggle)}>{ toggle ? close : open }</div>
          {toggle && (
            <>
              <FaqLink to="/faq" onClick={handleFaqClick} faqActive={faqActive}>
                <StyledLink to="/faq">FAQ</StyledLink>
              </FaqLink>
              <ContactLink onClick={handleContactClick} contactActive={contactActive}>
                <StyledLink onClick={handleScroll}>Contact</StyledLink>
              </ContactLink>
              <HomeLink to="/" onClick={handleHomeClick}homeActive={homeActive}>
                <StyledLink to="/">Home</StyledLink>
              </HomeLink>
            </>
          )}
        </HamburgerToggle>
      </HeaderContainer>
  );
}

export default Header;

// mobile nav animate slide from right to left