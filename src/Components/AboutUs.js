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
} from 'firebase/firestore';
import { db, auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject, getStorage } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const AboutUs = () => {
  const [alexAbout, setAlexAbout] = useState([]);
  const [alexDesc, setAlexDesc] = useState('');
  const [joshAbout, setJoshAbout] = useState([]);
  const [joshDesc, setJoshDesc] = useState('');
  const collectionRef = collection(db, 'alexAbout');
  const collectionRef1 = collection(db, 'joshAbout');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

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

  useEffect(() => {
    const unsub = onSnapshot(collectionRef1, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setJoshAbout(items);
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

  async function addJoshAbout() {
    const newJoshAbout = {
      joshDesc,
      id: uuidv4(),
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };
    try {
      const aboutJoshRef = doc(collectionRef1, newJoshAbout.id);
      await setDoc(aboutJoshRef, newJoshAbout);
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

  async function deleteJoshAbout(joshAbout) {
    try {
      const aboutJoshRef = doc(collectionRef1, joshAbout.id);
      await deleteDoc(aboutJoshRef, aboutJoshRef);
    } catch (error) {
      console.error(error);
    }
  }

  const imagesListRef = ref(storage, "alexProfilePic/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profilePics/alexProfilePic`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  if (auth.currentUser == null) {
    return (
      <>
        <AboutAlexWrapper>     
          <div>
            <img src="./portland.png" alt="Josh Portrait" title="Josh Portrait" />
          </div>
          {alexAbout.map((alexAbout) => (
            <AlexInfo key={alexAbout.id}>
              {alexAbout.alexDesc}
            </AlexInfo>
          ))}
     
        </AboutAlexWrapper>
        <AboutJoshWrapper>
          {joshAbout.map((joshAbout) => (
            <JoshInfo key={joshAbout.id}>
              {joshAbout.joshDesc}
            </JoshInfo>
          ))}

            <ProfileImg src="./JoshMVMTProfile.jpg" alt="Alex Portrait" title="Alex Portrait" />

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
          <StyledButton onClick={uploadFile}>Upload</StyledButton>
          <AlexInfo>
          <div>
            {/* <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            /> */}
            <StyledButton onClick={() => deleteAlexAbout(alexAbout)}>Delete</StyledButton>
            {/* {imageUrls.map((url) => {
              return (
                <>
                <RateCardContainer>
                  <RateCardImg src={url} />
                </RateCardContainer>
                </>
              );
            })} */}
          </div>
          <div>
            <img src="./portland.png" alt="Josh Portrait" title="Josh Portrait" />
          </div>
            {alexAbout.map((alexAbout) => (
              <div key={alexAbout.id}>
                {alexAbout.alexDesc}
              </div>
            ))}
          </AlexInfo>
        </AboutAlexWrapper>
        <AboutContainer>
        <StyledTextArea value={joshDesc} placeholder={joshAbout.map((about) => (about.joshDesc))} onChange={(e) => setJoshDesc(e.target.value)} />
            <StyledButton onClick={() => addJoshAbout()}>Submit</StyledButton>
        </AboutContainer>
        <AboutJoshWrapper>
          <JoshInfo>
            {joshAbout.map((joshAbout) => (
              <div key={joshAbout.id}>
                {joshAbout.joshDesc}
                <div>
                  <StyledButton onClick={() => deleteJoshAbout(joshAbout)}>Delete</StyledButton>
                </div>
              </div>
            ))}
          </JoshInfo>

            <ProfileImg src="./JoshMVMTProfile.jpg" alt="Josh Portrait" title="Josh Portrait" />
          
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

const RateCardContainer = styled.div`
margin-top: 20px;
display: flex;
justify-content: center;
`

const RateCardImg = styled.img`
width: 100%;
height: auto;
@media (min-width: 699px) {
  width: 80%;
}
`

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const ProfileImg = styled.img`
  height: auto;
  width: 250px;
  @media (max-width: 599px) {
    width: 99%;
  }
`

export default AboutUs;