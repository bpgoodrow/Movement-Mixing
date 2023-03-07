import React, { useEffect, useState } from "react";
import styled from "styled-components";
const letter1 = [{ name: "F" }, { name: "$" }, { name: "%" }];
const letter2 = [{name: "#"}, { name: "U" }, { name: "*"}];
const letter3 = [{ name: "&"}, { name: "@"}, { name: "C"}];
const letter4 = [{ name: "!"}, { name: "^"}, { name: "K"}];

const TextAnimation = () => {
  const [letterF, setLetterF] = useState(letter1[0]);
  const [letterU, setLetterU] = useState(letter2[0]);
  const [letterC, setLetterC] = useState(letter3[0]);
  const [letterK, setLetterK] = useState(letter4[0]);
  const [index, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);
  const [index4, setIndex4] = useState(0);

  useEffect(() => {
    const timerId1 = setInterval(
      () => setIndex((i) => (i + 1) % letter1.length),
      2500
    );
    return () => clearInterval(timerId1);
  }, []);

  useEffect (() => {
    const timerId2 = setInterval(
    () => setIndex2((i) => (i + 1) % letter2.length),
    2000
    );
    return () => clearInterval(timerId2);
  }, []);

  useEffect(() => {
    const timerId3 = setInterval(
      () => setIndex3((i) => (i + 1) % letter3.length),
      3000
    );
    return () => clearInterval(timerId3);
  },[]);
  
  useEffect(() => {
    const timerId4 = setInterval(
      () => setIndex4((i) => (i + 1) % letter1.length),
      2000
    );
    return () => clearInterval(timerId4);
  }, []);

  useEffect(() => {
    setLetterF(letter1[index]);
  }, [index]);

  useEffect(() => {
    setLetterU(letter2[index2]);
  }, [index2]);
  
  useEffect(() => {
    setLetterC(letter3[index3]);
  },[index3]);

  useEffect(() => {
    setLetterK(letter4[index4]);
  }, [index4]);

  return(
    <AnimationWrapper>
      <div>
        {letterF.name}{letterU.name}{letterC.name}{letterK.name} that sounds good.
      </div>
    </AnimationWrapper>
  )
}

const AnimationWrapper = styled.h1`
  display: flex;
  justify-content: flex-end;
`

export default TextAnimation;