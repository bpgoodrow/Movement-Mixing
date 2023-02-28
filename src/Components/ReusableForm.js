import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ReusableForm = (props) => {

  return (
    <div>
      <StyledForm onSubmit={props.formSubmissionHandler}>
        <StyledInput
          type="text"
          name="artistName"
          placeholder="artist name"
          />
        <StyledInput
          type="text"
          name="albumName"
          placeholder="album name"
        />
        <StyledInput
          type="text"
          name="songName"
          placeholder="song name"
        />
        <StyledInput
          type="text"
          name="masteredBy"
          placeholder="Mastered By"
        />
        <StyledInput
          type="text"
          name="producedBy"
          placeholder="Produced By"
        />
        <StyledInput
          type="text"
          name="mixedBy"
          placeholder="Mixed By"
        />
        <StyledInput
          type="text"
          name="spotify"
          placeholder="spotify"
        />
        <StyledInput
          type="text"
          name="appleMusic"
          placeholder="apple music"
        />
        <StyledInput
          type="text"
          name="tidal"
          placeholder="tidal"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </div>
  )
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

const StyledButton = styled.button`
  border: solid black 1px;
  background-color: black;
  color: white;
  cursor: pointer;
  height: 2rem;
    &:hover {
      background-color: #282828;
      border: 3px solid #282828;
    }
    &:active {
      background-color: #484848;
      border: 3px solid #484848;
    }
  margin-top: 1em;
  width: 6rem;
`

const StyledInput = styled.input`
  border: solid light-gray 2px;
  height: 1.5rem;
  padding: .5rem;
  width: 50vw;
  margin-bottom: 1em;
  &:focus {
    outline: none;
    border: 2px solid black;
  }
  @media (max-width: 700px) {
    width: 80vw;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

export default ReusableForm;