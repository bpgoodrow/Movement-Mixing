import React, { useState } from "react";
import { auth } from "./../firebase.js"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import styled from "styled-components";

const Login = () => {

  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
  }

  function doSignOut(event) {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You logged out")
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return(
    <div>
    <h1>Login</h1>
    {signInSuccess}
      <StyledForm onSubmit={doSignIn}>
        <StyledInput
          type='text'
          name='signinEmail'
          placeholder='email' />
        <StyledInput
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <StyledButton type='submit'>Sign in</StyledButton>
      </StyledForm>

      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <StyledButton onClick={doSignOut}>Sign out</StyledButton>
      </div>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled.button`
  border: solid white 1px;
  background-color: black;
  color: white;
  cursor: pointer;
  height: 2rem;
    &:hover {
      background-color: #282828;
    }
    &:active {
      background-color: #484848;
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

export default Login;