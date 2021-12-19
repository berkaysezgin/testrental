import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  CardGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faLiraSign,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { database } from "../config";
import Navbar from "../Components/navbar";

export default function MyListings() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);

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

  //TODO : setLoading status as false
  useEffect(() => {
    database
      .ref("properties")
      .orderByChild("userUid")
      .equalTo(userUid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setListingsCheck(true);

        } else {
          setListingsCheck(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userUid]);
  //

  //get listing data
  useEffect(() => {
    database
      .ref("properties")
      .orderByChild("userUid")
      .equalTo(userUid)
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            title: data.title,
            imageOneURL: data.imageOneURL,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            city: data.city,
            per_month: data.per_month,
          });
        });
        setListings(items);
      });
  }, [userUid]);
  //

  return (
    <>

      <div className="featured-section">
        {listingsCheck == true ? <h2 className="text-center p-2 mt-4">My Listings</h2> : ""}

          <CardGroup>
          <Row xs={1} md={4} className="g-4">
            {listings.map((data) => (
              <Link to={{ pathname: '/property', search: `?${data.key}`, state: { fromDashboard: true } }}>
                <Col className="mt-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={data.imageOneURL}
                    className="my-listings-thumbnail"
                  />
                  <Card.Body>
                    <Card.Title className="text-dark truncate">{data.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                  <FontAwesomeIcon icon={faBed} /> {data.bedrooms}&nbsp;&nbsp;
                   <FontAwesomeIcon icon={faShower} /> {data.bathrooms}&nbsp;&nbsp;
                   <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}&nbsp;&nbsp;
                   <span className="p-2">
                     <FontAwesomeIcon icon={faLiraSign} /> {data.per_month}
                   </span>
                  </Card.Footer>
                </Card>
                </Col>
              </Link>
            ))}
            </Row>
          </CardGroup>
      </div>
      <br />
      <br />
    </>
  );
}
