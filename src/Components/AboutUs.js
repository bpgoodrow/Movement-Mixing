import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  QuerySnapshot,
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import { async } from "@firebase/util";

const AboutUs = () => {
  const [alexAbout, setAlexAbout] = useState([]);
  const [alexDesc, setAlexDesc] = useState('');
  const [joshAbout, setJoshAbout] = useState([]);
  const [joshDesc, setJoshDesc] = useState('');
  const collectionRef = collection(db, 'alexAbout');

  useEffect(() => {
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAlexAbout(items);
    });
    return () => {
      unsub();
    };
  }, []);

  async function addAlexAbout() {
    const newAlexAbout = {
      alexDesc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };
    try {
      const aboutAlexRef = doc(collectionRef, newAlexAbout.id);
      await setDoc(aboutAlexRef, newAlexAbout);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteAlexAbout(alexAbout) {
    try {
      const aboutAlexRef = doc(collectionRef, alexAbout.id);
      await deleteDoc(aboutAlexRef, aboutAlexRef);
    } catch (error) {
      console.error(error);
    }
  }

  if (auth.currentUser == null) {
    return (
      <>
        <AboutAlexWrapper>
          <div>
            <img src="./portland.png" alt="Alex Portrait" title="Alex Portrait" />
          </div>
          <AlexInfo>
            {alexAbout.map((alexAbout) => (
              <div key={alexAbout.id}>
                {alexAbout.alexDesc}
              </div>
            ))}
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
  } else {
    return (
      <>
      <AboutContainer>
        <StyledTextArea value={alexDesc} placeholder={alexAbout.map((about) => (about.alexDesc))} onChange={(e) => setAlexDesc(e.target.value)} />
            <StyledButton onClick={() => addAlexAbout()}>Submit</StyledButton>
      </AboutContainer>
        <AboutAlexWrapper>
          <div>
            <img src="./portland.png" alt="Alex Portrait" title="Alex Portrait" />
          </div>
          <AlexInfo>
            {alexAbout.map((alexAbout) => (
              <div key={alexAbout.id}>
                {alexAbout.alexDesc}
                <div>
                  <StyledButton onClick={() => deleteAlexAbout(alexAbout)}>Delete</StyledButton>
                </div>
              </div>
            ))}
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

const StyledTextArea = styled.textarea`
  border: solid light-gray 2px;
  &:focus {
    outline: none;
    border: 2px solid black;
  }
  height: 2.5rem;
  padding: .5rem;
  outline: none;
  width: 50vw;
  @media (max-width: 700px) {
    width: 80vw;
  }
`

const StyledButton = styled.button`
border: solid white 1px;
background-color: black;
color: white;
cursor: pointer;
height: 2rem;
  &:hover {
    border: 2px solid white;
  }
  &:active {
    border: 3px solid white;
  }
margin-top: 1em;
width: 6rem;
`

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export default AboutUs;