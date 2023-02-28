import React from "react";
import PropTypes from "prop-types";
import PortfolioItem from "./PortfolioItem";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -4%;
  @media (max-width: 1900px) {
    margin-right: -3.5%;
  }
  @media (max-width: 1500px) {
    margin-right: -2.5%;
  }
  @media (max-width: 1200px) {
    margin-right: -2%;
  }
  @media (max-width: 699px) {
  justify-content: center;
  margin-left: -10px;
  margin-right: -11px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
`

const PortfolioDisplay = (props) => {
  return(
    <Grid>
        {[...Object.values(props.portfolioDisplay)].reverse().map((portfolioItem) =>
        <PortfolioItem
          whenPortfolioItemClicked = { props.onPortfolioItemSelection }
          albumCover= { portfolioItem.albumCover }
          artistName= { portfolioItem.artistName }
          albumName={ portfolioItem.albumName }
          songName={ portfolioItem.songName }
          masteredBy={ portfolioItem.masteredBy }
          producedBy={ portfolioItem.producedBy }
          mixedBy={ portfolioItem.mixedBy }
          spotify= { portfolioItem.spotify }
          appleMusic= { portfolioItem.appleMusic}
          tidal = {portfolioItem.tidal}
          id= { portfolioItem.id }
          key= { portfolioItem.id }
          />
        )}
    </Grid>
  );
}

PortfolioDisplay.propTypes = {
  portfolioDisplay: PropTypes.array,
  onPortfolioItemSelection: PropTypes.func
}

export default PortfolioDisplay;