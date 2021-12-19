import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'
import { Container } from 'react-bootstrap';
import { database } from "../config";
import { useLocation } from 'react-router-dom';

export default function NavigationBar({ companyName = "Rentax" }) {

  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [profileData, setProfileData] = useState([])
  const [childKey, setChildkey] = useState("")
  const [name, setName] = useState("")
  const [profileCheck, setProfileCheck] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false)
      } else {
        setAuthState(true)
        setUserUid(user.uid)
      }
    });
  }, [])
 
  useEffect(() => {
    database.ref("UserProfile").orderByChild("userUid").equalTo(userUid).on('value', (snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        var childkeyFirebase = childSnapshot.key;
        setChildkey(childkeyFirebase)
        var childData = childSnapshot.val();
        var name = childSnapshot.val().name;

        setName(name);
        items.push(childData);
      });
      setProfileData(items)
    });
  }, [userUid])

  useEffect(() => {
    database.ref("UserProfile").orderByChild("userUid").equalTo(userUid).once("value", (snapshot) => {
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
  }, [userUid])
  //

  //signout function
  const Logout = () => {
    firebase.auth().signOut().then(() => {
      <Redirect to="/" />
    })
      .catch((error) => {
        toast(error, { type: "error" })
      })
  }
  

  const authClick = () => {
    window.open("\auth", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,width=400,height=400");
  };

  return (
    <Navbar expand="lg" className="navbar"
      style={{ backgroundColor: "rgb(63, 71, 95)" }}
    >
      <Link to="/"><Navbar.Brand className={"text-light brand-name"}>{companyName}</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <React.Fragment>
            <Nav.Link as={Link} to="/personal-rooms" className={"text-light"}>View listings for sale</Nav.Link>
            <Nav.Link as={Link} to="/family-apartments" className={"text-light"}>View listings for rent</Nav.Link>
          </React.Fragment>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {authState ? (
            <>
              <NavDropdown title={<span className="text-light">{name}</span>} className="text-light dropdown-menu-bar">
                <Container>
                  {!name ? (
                    <Nav.Link as={Link} to="/create-profile" className="text-dark">My Profile</Nav.Link>
                  ) : (<Nav.Link as={Link} to="/my-profile" className="text-dark">My Profile</Nav.Link>)}
                  <Nav.Link as={Link} to='/' onClick={Logout} className="text-danger">Logout</Nav.Link>
                </Container>
              </NavDropdown>
            </>
          ) : ""}


          {authState ? (
            ""
          ) : <Navbar.Text>
            <Button onClick={authClick} className="btn btn-outline-primary" variant="outline-primary">Sign In</Button>&nbsp;&nbsp;&nbsp;
            <Button onClick={authClick} className="btn btn-outline-success" variant="outline-primary">Create Account</Button>
          </Navbar.Text>
          }

          {authState ? (
            <>

              <Navbar.Text>
                {!name ? (
                  <Link to="/create-profile"><Button className="btn btn-outline-danger" variant="outline-primary">Create Profile</Button></Link>
                ) : ""}
                &nbsp;&nbsp;&nbsp;<Link to="/my-listings"><Button className="btn btn-outline-primary" variant="outline-primary">My Listings</Button></Link>
              </Navbar.Text>&nbsp;&nbsp;&nbsp;
              <Navbar.Text>
                <Link to="/create-listing"><Button className="btn btn-outline-success" variant="outline-primary">Create Listing</Button></Link>
              </Navbar.Text>
            </>
          ) : ""}

        </Navbar.Collapse>
      </Navbar.Collapse>
      {/* Error toast */}
      <ToastContainer />
    </Navbar>

  )
}
