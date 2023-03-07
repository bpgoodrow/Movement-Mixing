import React from "react";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <>
      <AboutAlexWrapper>
        <div>
          <img src="./portland.png" alt="Alex Portrait" title="Alex Portrait" />
        </div>
        <AlexInfo>
        Alex blah blah blah ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </AlexInfo>
      </AboutAlexWrapper>
      <AboutJoshWrapper>
        <JoshInfo>
        Josh Blah Blah Blah ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </JoshInfo>
        <div>
          <img src="./portland.png" alt="Alex Portrait" title="Alex Portrait" />
        </div>
      </AboutJoshWrapper>
      
    </>
  )
}

const AboutAlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  @media (max-width:799px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const AlexInfo = styled.div`
  margin-left: 50px;
  font-size: 1.2rem;
  @media (max-width: 799px) {
    margin-left: 0px;
  }
`

const AboutJoshWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  @media(max-width: 799px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
`

const JoshInfo = styled.div`
  margin-right: 50px;
  font-size: 1.2rem;
  @media(max-width: 799px){
    margin-right: 0px;
  }
`

export default AboutUs;