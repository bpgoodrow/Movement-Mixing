import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from "react";
import {
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './../firebase';
import { v4 as uuidv4 } from 'uuid';
import styled, { keyframes } from "styled-components";
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

const Faqs = ({onClick}) => {

  const [faqs, setFaqs] = useState([]);
  const [desc, setDesc] = useState();
  const [header, setHeader] = useState();
  const [toggle, setToggle] = useState(false);
  const colletionRef = collection(db, 'faqs');
  const [loading, setLoading] = useState();
  const [expandedIndexes, setExpandedIndexes] = useState(
    Array(faqs.length).fill(false)
  );

  useEffect(() => {
    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFaqs(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, []);

  async function addFaqs() {

    const newFaqs = {
      header,
      desc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const faqsRef = doc(colletionRef, newFaqs.id);
      await setDoc(faqsRef, newFaqs);
    } catch (error) {
      console.error(error);
    }
  }

   //DELETE FUNCTION
   async function deleteFaqs(faqs) {
    try {
      const faqsRef = doc(colletionRef, faqs.id);
      await deleteDoc(faqsRef, faqsRef);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = (index) => {
    setExpandedIndexes((prevExpandedIndexes) => {
      const newState = [...prevExpandedIndexes];
      newState.splice(index, 1, !prevExpandedIndexes[index]);
      // Call toggle arrow
      return newState;
    });
  };

  if (auth.currentUser == null) {
    return (
      <>
      <FaqWrapper>
          {loading ? <h1>Loading...</h1> : null}
          {faqs.map(({header, desc}, index) => (
            <div key={faqs.id} className="details-wrapper">
              <FaqItem1>
                {/* <FaqItem  onClick={() => (handleClick(index))}></FaqItem> */}
                <h3>{header}</h3>
                {desc}
              </FaqItem1>
              <p
                className="text"
                // check for each child's state to display correctly
                style={{ transition: "all 0.1s linear", display: expandedIndexes[index] ? "block" : "none" }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
              </p>
            </div>
          ))}
          {/* <FaqItems/> */}
        </FaqWrapper>
      </>
    )
  } else {
      return(
        <FaqWrapper>
          <FaqInputWrapper>
            <h6>FAQ</h6>
            <StyledTextArea value={header} onChange={(e) => setHeader(e.target.value)} />
            <h6>Answer</h6>
            <StyledTextArea value={desc} onChange={(e) => setDesc(e.target.value)} />
            <StyledButton onClick={() => addFaqs()}>Submit</StyledButton>
          </FaqInputWrapper>
          {loading ? <h1>Loading...</h1> : null}
          {faqs.map(({header, desc}, index) => (
            <div key={faqs.id}>
              <div>
                <FaqItem onClick={() => (handleClick(index))}><h3>{header}</h3></FaqItem>
              </div>
              <p style={{ transition: "all 5s linear", display: expandedIndexes[index] ? "block" : "none" }}>
              </p>
              {desc}
            </div>
          ))}
        </FaqWrapper>
      )
    }
}

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

const FaqWrapper = styled.div`
  font-size: 1.5em;
`

const FaqItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const FaqItem1 = styled.div`
  border-bottom: solid gray .5px;
  display: flex;
  flex-direction: column;
`

const FaqInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default Faqs;