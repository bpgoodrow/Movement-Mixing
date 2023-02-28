import React, {useEffect, useState} from "react";

import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";

const AboutWrapper = styled.div`
  margin-bottom: 100px;
  font-size: 1.5rem;
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

const About = () => {

  const [about, setAbout] = useState([]);
  const [desc, setDesc] = useState('');
  const collectionRef = collection(db, 'about');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // const q = query(
      // collectionRef,
      //  where('owner', '==', currentUserId),
      // where('desc', '==', 'about1') // does not need index
      //  where('score', '<=', 100) // needs index  https://firebase.google.com/docs/firestore/query-data/indexing?authuser=1&hl=en
      // orderBy('score', 'asc'), // be aware of limitations: https://firebase.google.com/docs/firestore/query-data/order-limit-data#limitations
      // limit(1)
    // );

    setLoading(true);
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setAbout(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addAbout() {

    const newAbout = {
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const aboutRef = doc(collectionRef, newAbout.id);
      await setDoc(aboutRef, newAbout);
    } catch (error) {
      console.error(error);
    }
  }

   //DELETE FUNCTION
   async function deleteAbout(about) {
    try {
      const aboutRef = doc(collectionRef, about.id);
      await deleteDoc(aboutRef, aboutRef);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editAbout(about) {
    console.log(editAbout, "edit working")
    const updatedAbout = {
      lastUpdate: serverTimestamp(),
    };

    try {
      const aboutRef = doc(collectionRef, about.id);
      updateDoc(aboutRef, updatedAbout);
    } catch (error) {
      console.error(error);
    }
  }
  
  if (auth.currentUser == null) {
    return (
      <AboutWrapper>
      {/* {loading ? <h1>Loading...</h1> : null} */}
      {about.map((about) => (
        <div key={about.id}>
          <p>{about.desc}</p>
        </div>
      ))}
    </AboutWrapper>
    )
  } else {
    return(
      <AboutWrapper>
        <div>
          <h3>Update About</h3>
          <AboutContainer>
            <StyledTextArea value={desc} placeholder={about.map((about) => (about.desc))} onChange={(e) => setDesc(e.target.value)} />
            <StyledButton onClick={() => addAbout()}>Submit</StyledButton>
          </AboutContainer>
        </div>
        {/* {loading ? <h1>Loading...</h1> : null} */}
        {about.map((about) => (
          <div key={about.id}>
            {about.desc}
            <div>
              <StyledButton onClick={() => deleteAbout(about)}>Delete</StyledButton>
            </div>
          </div>
        ))}
      </AboutWrapper>
    )
  }
}



export default About;