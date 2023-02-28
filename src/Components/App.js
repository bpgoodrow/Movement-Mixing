import React from "react";
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import RoutePath from "./RoutePath";
import Contact from './Contact';
import styled from "styled-components";
const AppContainer = styled.div`

`

const StyledApp = styled.div`
  max-width: 80%;
  margin-top: 10px;
  margin-left: 20%;
  margin-right: 20%;
  @media (max-width: 1800px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  @media (max-width: 699px) {
    margin-left: 10px;
    margin-right: 10px;
    max-width: 100%;
    width: 95%;
  }
`

function App() {

  const handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      behavior: 'smooth',
    });
  }

  return (
    <AppContainer>
      <StyledApp>
        <Router>
          <Header handleScroll={handleScroll}/>
          <RoutePath />
          <Contact />
        </Router>
      </StyledApp>
    </AppContainer>
  );
}

export default App;
