import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import choosePic from '../pictures/choose-pic.svg'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import imageCompression from 'browser-image-compression';
import { imageConfig } from '../utils/profileImageConfig'
import { database, storage } from "../config";
import firebase from "firebase";
import Navbar from "../Components/navbar";

export default function CreateProfile() {


  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [userUid, setUserUid] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [thumbnail, setThumbnail] = useState(choosePic)
  //submit status
  const [submit, setSubmit] = useState("")
  const [profileCheck, setProfileCheck] = useState("")
  const [filter, setFilter] = useState("")

  //Authstate
  const [authState, setAuthState] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState("Logged-out")
      } else {
        setAuthState("Logged-in")
        setUserUid(user.uid)
        setEmail(user.email)
        setPhone(user.phone)
        setName(user.displayName)
      }
    });
  }, [])

  //image 1 function
  async function uploadProfilePicture(e) {

    const imageFile = e.target.files[0];

    try {
      const compressedFile1 = await imageCompression(imageFile, imageConfig);

      await uploadToServer(compressedFile1); // write your own logic

      function uploadToServer() {
        const imageOne = compressedFile1;
        const uploadTask = storage.ref(`profile-pictures/${imageOne.name}`).put(imageOne);
        uploadTask.on(
          "STATE_CHANGED",
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast("Profile Picture Upload in Progress:Please Wait", { type: "warning", toastId: "1", });
            if (progress === 100) {
              toast.update("1", {
                render: "Image Successfully Uploaded",
                type: "success",
                autoClose: 5000
              });
            }
          },
          (error) => {
            console.log(error);
            toast(error, { type: "error" })
          },
          () => {
            storage
              .ref("profile-pictures")
              .child(imageOne.name)
              .getDownloadURL()
              .then((url) => {
                setThumbnail(url);
              });
          }
        );
      }

    } catch (error) {
      toast(error, { type: "error" })
    }
  };

  //submission
  const handleSubmit = (e) => {
    e.preventDefault();
    database.ref("UserProfile").push({
      name: name,
      city: city,
      email: email,
      phone: phone,
      userUid: userUid,
      thumbnail: thumbnail,
      filter: filter,
    });
    setSubmit("Submitted")
  };

  //check
  useEffect(() => {
    database.ref("UserProfile").orderByChild("userUid").equalTo(userUid).once("value", (snapshot) => {
      if (snapshot.exists()) {
        setProfileCheck(true)
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [handleSubmit])
  //



  if (profileCheck === true) {
    return (
      <>
        <Redirect to="/" />
      </>
    )
  }


  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/" />
      </>
    )
  }


  if (authState === "Logged-out") {
    return (
      <>
        <Redirect to="/" />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <Container className="mr-top-2">
        <Card>
          <Card.Header className="text-center card-title card-header-create-profile">Create Profile</Card.Header>
          <Card.Body>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group as={Row} controlId="name">
                    <Form.Label column sm={2}>
                      Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="mail">
                    <Form.Label column sm={2}>
                      E-mail
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="example@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={2}>
                      Phone
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="+90 000 000 00 00" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Col>
                  </Form.Group>


                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                      City
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" placeholder="Istanbul" onChange={(e) => setCity(e.target.value)} />
                    </Col>
                  </Form.Group>

                  <Form.Label>Upload Profile Picture</Form.Label>
                  <br />
                  <Form.Row>
                    <Form.Group as={Col} lg={12} md={12} sm={12}>
                      <Form.File onChange={uploadProfilePicture} />
                    </Form.Group>
                  </Form.Row>
                  <hr />
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 0 }}>
                      <Button type="submit">Submit</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={12} md={6} lg={6} className="profile-image-div">
                {/* thumbnail here */}
                <img src={thumbnail} className="img-fluid profile-thumb" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
