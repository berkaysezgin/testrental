import React, {useState, useEffect} from 'react'
import {
    Row,
    Col,
    Container,
    Card,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4} from "uuid";
import {database} from "../config";

export default function ReadReviews() {

//snapshots
    const [reviews, setReviews] = useState([]);
    const queryString2 = window.location.search;
    const RetrivedchildKey2 = queryString2.substring(1);


    //get listing data
    useEffect(() => {
        database
            .ref("Reviews")
            .orderByChild("propertyKey")
            .equalTo(String(RetrivedchildKey2))
            .on("value", (snapshot) => {
                const items = [];
                snapshot.forEach((childSnapshot) => {
                    var data = childSnapshot.val();
                    items.push({
                        key: data.propertyKey,
                        name: data.name,
                        review: data.review,
                        stars: data.stars,
                    });
                });
                setReviews(items);
            });
    }, []);
    //


    return (
        <>
            <Container>
                <h4>Reviews:</h4>
                <Row>
                    {reviews.map((data) => (
                        <Col sm={12} md={12} lg={12} key={uuidv4()}>
                            <Card className="mt-2">
                                <Card.Body>
                                    <Card.Title className="text-dark">{data.name}</Card.Title>
                                    <span className="">
                          {data.stars < 2 ? <><FontAwesomeIcon icon={faStar}/></> : data.stars == 2 ? <><FontAwesomeIcon
                              icon={faStar}/><FontAwesomeIcon icon={faStar}/></> : data.stars == 3 ? <><FontAwesomeIcon
                              icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon
                              icon={faStar}/></> : data.stars == 4 ? <><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon
                              icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/></> : <>
                              <FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon
                              icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/></>}
                        </span>
                                    <Card.Text className="text-dark">
                                        {data.review}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                    ))}
                </Row>
            </Container>
            <br/>
            <br/>
        </>
    );
}
    