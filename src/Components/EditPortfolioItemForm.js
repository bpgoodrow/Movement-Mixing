import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

const EditPortfolioItemForm = (props) => {
  const { portfolioItem } = props;

  function handleEditPortfolioItemFormSubmission(e) {
    e.preventDefault();
    props.onEditPortfolioItem({
      artistName: e.target.artistName.value,
      albumName: e.target.albumName.value,
      songName: e.target.songName.value,
      masteredBy: e.target.masteredBy.value,
      producedBy: e.target.producedBy.value,
      mixedBy: e.target.mixedBy.value,
      spotify: e.target.spotify.value,
      appleMusic: e.target.appleMusic.value,
      tidal: e.target.tidal.value,
      id: portfolioItem.id,
    });
  }
  return (
    <div>
      <ReusableForm
        formSubmissionHandler={handleEditPortfolioItemFormSubmission}
      />
    </div>
  )
}

EditPortfolioItemForm.propTypes = {
  portfolioItem: PropTypes.object,
  onEditPortfolioItem: PropTypes.func,
}

export default EditPortfolioItemForm;