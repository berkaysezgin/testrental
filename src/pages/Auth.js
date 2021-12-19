import React,{useEffect, useContext} from 'react'
import {Redirect} from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import {UserContext} from '../context/UserContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from 'react-google-button'
import Navbar from '../Components/navbar'

export default function Auth() {

const context = useContext(UserContext);

const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/home',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};

useEffect(() => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      context.setUser({email: user.email, phone: user.phone, uid: user.uid})
    }
  });
}, [])


 
    return (
      <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
   
}
