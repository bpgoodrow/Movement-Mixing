import React, { useState, useEffect } from "react";
import About from "./About";
import PortfolioDisplay from "./PortfolioDisplay";
import PortfolioDetail from "./PortfolioDetail";
import NewPortfolioForm from "./NewPortfolioForm";
import EditPortfolioItemForm from "./EditPortfolioItemForm";
import TextAnimation from "./TextAnimation";
import { db, auth, storage } from './../firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";
import styled from "styled-components";

const PortfolioControl = () => {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [portfolioDisplay, setPortfolioDisplay] = useState([]);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  // const imageListRef = ref(storage, "album-covers/")

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `album-covers/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url])
        addDoc(collection(db, 'mixingPortfolio'), ({
          albumCover: url
        }))
      })
    })
  }

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url]);
  //       })
  //     })
  //   });
  // }, []);


  useEffect(() => {
    setLoading(true)
    const unSubscribe = onSnapshot(
      collection(db, "mixingPortfolio"),
      (querySnapshot) => {
        const mixingPortfolio = [];
        querySnapshot.forEach((doc) => {
          mixingPortfolio.push({
            artistName: doc.data().artistName,
            albumName: doc.data().albumName,
            songName: doc.data().songName,
            masteredBy: doc.data().masteredBy,
            producedBy: doc.data().producedBy,
            mixedBy: doc.data().mixedBy,
            spotify: doc.data().spotify,
            appleMusic: doc.data().appleMusic,
            tidal: doc.data().tidal,
            albumCover: doc.data().albumCover,
            id: doc.id,
          });
        });
        setPortfolioDisplay(mixingPortfolio);
        setLoading(false);
      },
      (error) => {
      setError(error.message);
    }
    );
    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedPortfolioItem != null) {
      setFormVisibleOnPage(false);
      setSelectedPortfolioItem(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewPortfolioItemToPortfolioDisplay = async (newPortfolioItemData) => {
    await addDoc(collection(db, "mixingPortfolio"), newPortfolioItemData);
    setFormVisibleOnPage(false);
  }

  const handleChangingSelectedPortfolioItem = (id) => {
    const selection = portfolioDisplay.filter(PortfolioItem => PortfolioItem.id === id)[0];
    setSelectedPortfolioItem(selection);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingPortfolioItemInPortfolioDisplay = async (portfolioItemToEdit) => {
    await updateDoc(doc(db, "mixingPortfolio", portfolioItemToEdit.id), portfolioItemToEdit);
    setEditing(false);
    setSelectedPortfolioItem(null);
  }

  const handleDeletingPortfolioItem = async (id) => {
    await deleteDoc(doc(db, "mixingPortfolio", id));
    setSelectedPortfolioItem(null);
  }

  const handleHomeClick = () => {
    setSelectedPortfolioItem(null);
  }

  if (auth.currentUser == null) {
    let currentlyVisibleState = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (selectedPortfolioItem != null) {
      currentlyVisibleState = <PortfolioDetail 
      portfolioItem={selectedPortfolioItem}
      />
      if (error) {
        currentlyVisibleState = <p>There was an error: {error}</p>
      } else if (selectedPortfolioItem != null) {
        currentlyVisibleState = <PortfolioDetail 
        portfolioItem={selectedPortfolioItem}
        onClickingHome={handleHomeClick}
        />
      } else {
        currentlyVisibleState = <PortfolioDisplay onPortfolioItemSelection=
        {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
        />
      }
    } else {
      currentlyVisibleState =
      <>
        <About />
        {/* {loading ? <h1>Loading...</h1> : null} */}
        <PortfolioDisplay onPortfolioItemSelection=
        {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
        />
        <TextAnimation/>
      </>
    }
    return (
      <div>
        <>
    </>
        {currentlyVisibleState}
      </div>
    )
  } else if (auth.currentUser !== null) {

    let currentlyVisibleState = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {
      currentlyVisibleState = <EditPortfolioItemForm portfolioItem={selectedPortfolioItem}
      onEditPortfolioItem = {handleEditingPortfolioItemInPortfolioDisplay}
      />
    } else if (selectedPortfolioItem != null) {
      currentlyVisibleState = <PortfolioDetail 
      portfolioItem={selectedPortfolioItem}
      onClickingEdit= {handleEditClick}
      onClickingDelete = {handleDeletingPortfolioItem}
      onClickingHome={handleHomeClick}
      />
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewPortfolioForm onNewPortfolioItemCreation={handleAddingNewPortfolioItemToPortfolioDisplay}/>;
    } else {
      currentlyVisibleState = 
      <>
        <About />
        <input type= "file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
        <StyledButton onClick={uploadImage}>Upload</StyledButton>
        <PortfolioDisplay onPortfolioItemSelection=
        {handleChangingSelectedPortfolioItem} portfolioDisplay={portfolioDisplay}
        />
        <TextAnimation/>
      </>
    }
    return(
      <div>
        {currentlyVisibleState}
        
      </div>
    )
  }
}

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

export default PortfolioControl;