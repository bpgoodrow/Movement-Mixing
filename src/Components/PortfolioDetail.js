import React, {useState} from "react";
import PropTypes from "prop-types";
import { auth } from './../firebase';
import styled from "styled-components";
import { FaApple, FaSpotify } from "react-icons/fa";
import { SiTidal } from "react-icons/si"

const AlbumImage = styled.img`
  max-width: 50%;
  object-fit: cover;
  height: auto;
  @media (max-width: 999px) {
    max-width: 100%;
  }
`

const DetailContainer = styled.div`
  display: flex;
  @media (max-width: 999px) {
    flex-direction: column;
  }
`

const InfoContainer = styled.div`
  display: flex;
  font-size: 2rem;
  @media(max-width: 1600px) {
    font-size: 2vw;
  }
  margin-left: 10%;
  flex-direction: column;
  @media (max-width: 999px) {
    margin-left: 0px;
    font-size: 1.5em;
  }
  @media (max-width: 699px) {
    font-size: 1.5em;
    margin-top: 15px;
  }
`

const InfoItem = styled.div`
  margin-bottom: 5px;
`

const LinkIcon = styled.a`
  cursor: pointer;
  margin-right: 20px;
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

const ContainerItem = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
`

const PortfolioDetail = (props) => {
  const { portfolioItem, onClickingDelete } = props;
  const [artist, setArtist] = useState(["Artist", null])
  const [song, setSong] = useState(["Song", null])
  const [masteredBy, setMasteredBy] = useState(["Mastered By"], null)
  const [producedBy, setProducedBy] = useState(["Produced By", null])
  const [mixedBy, setMixedBy] = useState(["Mixed By", null])
  const [spotify, setSpotify] = useState([<FaSpotify color="white" size={35}/>, null])
  const [appleMusic, setAppleMusic] = useState([<FaApple color="white" size={37}/>, null])
  const [tidal, setTidal] = useState([<SiTidal color = "white" size={43}/>, null])


  if (auth.currentUser == null) {
    let visibleButtons = !null;
    console.log(auth.currentUser, "auth", visibleButtons);
    console.log(portfolioItem)
    return (
      <>
        <DetailContainer>
          <AlbumImage src={portfolioItem.albumCover} />
          <InfoContainer>
            {/* <ContainerItem>
              {portfolioItem.artistName}
              &nbsp;
              |
              &nbsp;
              {portfolioItem.albumName}
            </ContainerItem> */}
            <ContainerItem>
                {/* {
                  portfolioItem.songName == undefined
                  ? <div>{null}</div>
                  : <div>{}</div>
                }
              &nbsp; */}
              {portfolioItem.songName}
            </ContainerItem>
            <ContainerItem>
                {
                  portfolioItem.artistName == undefined
                  ? <div>{null}</div>
                  : <div>{artist}</div>
                }
              &nbsp;
              {portfolioItem.artistName}
            </ContainerItem>
            <ContainerItem>
              {
                portfolioItem.producedBy == undefined
                ? <div>{null}</div>
                : <div>{producedBy}</div>
              }
              &nbsp;
              {portfolioItem.producedBy}
            </ContainerItem>
            <ContainerItem>
              {
                portfolioItem.mixedBy == undefined
                ? <div>{null}</div>
                : <div>{mixedBy}</div>
              }
              &nbsp;
              {portfolioItem.mixedBy}
            </ContainerItem>
            <ContainerItem>
              {
                portfolioItem.masteredBy == undefined
                ? <div>{null}</div>
                : <div>{masteredBy}</div>
              }
              &nbsp;
              {portfolioItem.masteredBy}
            </ContainerItem>
            <ContainerItem>
              <LinkIcon href={portfolioItem.spotify} target="_blank">
                {
                  portfolioItem.spotify == undefined
                  ? <div>{null}</div>
                  : <div>{spotify}</div>
                }
              </LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank">
                {
                  portfolioItem.spotify == undefined
                  ? <div>{null}</div>
                  :<div>{appleMusic}</div>
                }
                </LinkIcon>
              <LinkIcon href={portfolioItem.tidal} target="_blank">
                {
                  portfolioItem.tidal == undefined
                  ? <div>{null}</div>
                  : <div>{tidal}</div>
                }
              </LinkIcon>
            </ContainerItem>
            {visibleButtons ? null : <button onClick={props.onClickingEdit }>Update Item</button>}
            {visibleButtons ? null : <button onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</button>}
            
            <StyledButton onClick={props.onClickingHome }>Back</StyledButton>
            {/* {error ? null : <button onClick={handleClick}>{buttonText}</button>} */}
          </InfoContainer>
        </DetailContainer>
      </>
    ); 
  } else {
    let visibleButtons = !null;
    return (
      <>
        <DetailContainer>
          <AlbumImage src={portfolioItem.albumCover} />
          <InfoContainer>
            <InfoItem>Artist {portfolioItem.artistName}</InfoItem>
            <InfoItem>Album {portfolioItem.albumName}</InfoItem>
            <InfoItem>Song {portfolioItem.songName}</InfoItem>
            <InfoItem>Mastered By {portfolioItem.masteredBy}</InfoItem>
            <InfoItem>Produced By {portfolioItem.producedBy}</InfoItem>
            <InfoItem>Mixed By {portfolioItem.mixedBy}</InfoItem>
            <div>
              <LinkIcon href={portfolioItem.spotify} target="_blank"><FaSpotify color="white" size={35}/></LinkIcon>
              <LinkIcon href={portfolioItem.appleMusic} target="_blank"><FaApple color="white" size={39}/></LinkIcon>
              <LinkIcon href={portfolioItem.tidal} target="_blank"><SiTidal color="white" size={35}/></LinkIcon>
            </div>
            <StyledButton onClick={props.onClickingEdit }>Update Item</StyledButton>
            <StyledButton onClick={()=> onClickingDelete(portfolioItem.id)}>Delete</StyledButton>
            <StyledButton onClick={props.onClickingHome }>Back</StyledButton>
          </InfoContainer>
        </DetailContainer>
      </>
    )
  }
}

PortfolioDetail.propTypes = {
  portfolioItem: PropTypes.object,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default PortfolioDetail;