import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { TfiClose } from 'react-icons/tfi'
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

  const AboutLink = styled(NavLink)`
    text-decoration: none;
    margin-left: 1rem;
    cursor: pointer;
    border-bottom: ${(props) => (props.aboutActive ? 'solid white .5px' : 'none')};
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
    margin-top: 125px;
    display: flex;
    align-items: center;
    justify_content: center;
    flex-direction: row-reverse;
    justify-content: space-around;
    position: absolute;
    z-index: 0;
    right: 0;
    overflow: hidden;
    @media (min-width: 699px) {
      display: none;
    }
  `

  const MovementMixingLogo = styled.img`
  cursor: pointer;
    width: 300px;
    @media (max-width: 699px) {
      width: 200px;
    }
  `

  const HamburgerContainer = styled.div`
    @media (min-width: 699px) {
      display: none;
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
  const [aboutActive, setAboutActive] = useState(false);
  const [faqActive, setFaqActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  const open = <HamburgerIcons><RxHamburgerMenu size="30px" color="white" fontWeight= '100'/></HamburgerIcons>
  const close = <HamburgerIcons><TfiClose size="25px" color="white" /></HamburgerIcons>

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleHomeClick = () => {
    setHomeActive(true);
    setAboutActive(false);
    setFaqActive(false);
    setContactActive(false);
  }

  const handleAboutClick = () => {
    setAboutActive(true);
    setHomeActive(false);
    setFaqActive(false);
    setContactActive(false);
  }

  const handleFaqClick = () => {
    setFaqActive(true);
    setAboutActive(false);
    setHomeActive(false);
    setContactActive(false);
  }

  const handleContactClick = () => {
    setContactActive(true);
    setAboutActive(false);
    setHomeActive(false);
    setFaqActive(false);
  }

  return (
      <HeaderContainer>
        <div onClick={refreshPage}>
          <MovementMixingLogo src="./Logo.png" alt="Movement Mixing Logo" />
        </div>
        <HeaderTitleAndLinksContainer>
          <HeaderLinkContainer>
            <HomeLink to="/" onClick={handleHomeClick}homeActive={homeActive}>
              <StyledLink to="/">Home</StyledLink>
            </HomeLink>
            {/* <AboutLink to="/about" onClick={handleAboutClick}aboutActive={aboutActive}>
              <StyledLink to="/about">About</StyledLink>
            </AboutLink> */}
            {/* <FaqLink to="/faq" onClick={handleFaqClick} faqActive={faqActive}>
              <StyledLink to="/faq">FAQ</StyledLink>
            </FaqLink> */}
            <ContactLink onClick={handleContactClick} contactActive={contactActive}>
              <StyledLink onClick={handleScroll}>Contact</StyledLink>
            </ContactLink>
          </HeaderLinkContainer>
        </HeaderTitleAndLinksContainer>
        <HamburgerContainer onClick={() => {setToggle(!toggle)}}>{ toggle ? close : open }</HamburgerContainer>
        <HamburgerToggle>

          {toggle && (
            <>

                {/* <FaqLink to="/faq" onClick={handleFaqClick} faqActive={faqActive}>
                  <StyledLink to="/faq">FAQ</StyledLink>
                </FaqLink> */}
                <ContactLink onClick={handleContactClick} contactActive={contactActive}>
                  <StyledLink onClick={handleScroll}>Contact</StyledLink>
                </ContactLink>
                {/* <AboutLink to ="/about" onClick={handleAboutClick} aboutActive={aboutActive}>
                  <StyledLink to="/about">About</StyledLink>
                </AboutLink> */}
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