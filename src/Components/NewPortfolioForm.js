import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

const NewPortfolioForm = (props) => {
  function handleNewPortfolioItemFormSubmission(e) {
    e.preventDefault();
    props.onNewPortfolioItemCreation({
      artistName: e.target.artistName.value,
      albumName: e.target.albumName.value,
      songName: e.target.songName.value,
      masteredBy: e.target.masteredBy.value,
      producedBy: e.target.producedBy.value,
      mixedBy: e.target.mixedBy.value,
      spotify: e.target.spotify.value,
      appleMusic: e.target.appleMusic.value,
      tidal: e.target.tidal.value
    })
  }
  return(
    <div>
      <ReusableForm 
        formSubmissionHandler={handleNewPortfolioItemFormSubmission}
        buttonText={"Submit"}
      />
    </div>
  );
}

NewPortfolioForm.propTypes = {
  onNewPortfolioItemCreation: PropTypes.func
};

export default NewPortfolioForm;