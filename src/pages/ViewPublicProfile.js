import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Row, Col, Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from "uuid";
import firebase from 'firebase'
import { database } from "../config";
import Navbar from "../Components/navbar";


export default function ViewPublicProfile() {

  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [profileCheck, setProfileCheck] = useState(null)
  //snapshots
  const [profileData, setProfileData] = useState([])
  //spinner
  const [loading, setLoading] = useState(true)
  const [childKey, setChildkey] = useState("")
  //
  const [city, setCity] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [filterQuery, setFilterQuery] = useState("")
  const [yes, setYes] = useState("Yes")

  const queryString = window.location.search;
  const RetrievedUser = queryString.substring(1);
  console.log(RetrievedUser);


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
      }
    });
  }, []);


  useEffect(() => {
    database.ref("UserProfile").orderByChild("userUid").equalTo(RetrievedUser).once("value", (snapshot) => {
      if (snapshot.exists()) {
        setProfileCheck(true)
        { setLoading(false) }
      } else {
        setProfileCheck(false)
        { setLoading(false) }
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [RetrievedUser])
  //

  //get profile data
  useEffect(() => {
    database.ref("UserProfile").orderByChild("userUid").equalTo(RetrievedUser).on('value', (snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        var childkeyFirebase = childSnapshot.key;
        setChildkey(childkeyFirebase)
        var childData = childSnapshot.val();
        var city = childSnapshot.val().city;
        var email = childSnapshot.val().email;
        var phone = childSnapshot.val().phone;
        var name = childSnapshot.val().name;
        var thumbnail = childSnapshot.val().thumbnail;

        setCity(city);
        setEmail(email);
        setPhone(phone);
        setName(name);
        setThumbnail(thumbnail);
        setFilterQuery(city);

        items.push(childData);
      });
      setProfileData(items)
    });
  }, [RetrievedUser])
  //

  console.log(profileData.name);

  return (
    <div>
      <Navbar />
      {/* SPINNER */}
      {loading == true ? (<div className="spinner-border spinner text-primary"></div>) : ""}

      {profileData.map((data) => (
        <Jumbotron className="mt-5" key={uuidv4()}>
          <Row>
            <Col sm={12} lg={2} md={2}>
              <img src={data.thumbnail} className="img-fluid img-thumbnail profile-picture" />
            </Col>
            <Col sm={12} lg={10} md={10}>
              <h1 className="display-4">{data.name}</h1>
              <p className="lead"><FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}</p>
              <p><FontAwesomeIcon icon={faEnvelope} /> {data.email}</p>
              <p><FontAwesomeIcon icon={faPhone} /> {data.phone}</p>
              <hr className="my-2" />
            </Col>
          </Row>
        </Jumbotron>

      ))}
    </div>
  )
}

