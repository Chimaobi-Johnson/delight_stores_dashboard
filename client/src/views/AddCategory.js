import React, { useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Input } from "reactstrap";
import axios from 'axios';

function AddCategory() {

    const [inputData, setInputData ] = useState({
        name: '',
        description: '',
        imageUrl: null,
        imagePreviewUrl: null
    })

    const changeInputHandler = (input, e) => {
        setInputData(prevState => {
            return {
                ...prevState,
                [input]: e.target.value
            }
        })
    }

    const getImageFile = e => {
        setInputData(prevState => {
            return {
                ...prevState,
                imageUrl: e.target.files[0],
                imagePreviewUrl: URL.createObjectURL(e.target.files[0])
            }
        })
    }

    const submitFormHandler = e => {

        e.preventDefault()
        const data = new FormData();
        data.append('name', inputData.name);
        data.append('description', inputData.description);
        data.append('image', inputData.imageUrl)
        
        axios.post('/api/category/new', data)
        .then(res => {
          if(res.status === 201) {
            alert("saved successfully")
            setInputData(prevState => {
              return {
                  ...prevState,
                  name: '',
                  description: '',
                  imageUrl: null,
                  imagePreviewUrl: null
              }
          })
          }
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Add New Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Category Name</label>
                        <Form.Control
                          placeholder="Enter name of category"
                          type="text"
                          value={inputData.name}
                          onChange={(e) => changeInputHandler('name', e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                        <Col md="6">
                            <Form.Group>
                                <label>Description</label>
                                <Form.Control
                                placeholder="Description"
                                type="text"
                                value={inputData.description}
                                onChange={(e) => changeInputHandler('description', e)}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Category Image</label>
                        <Form.Control
                          type="file"
                          onChange={getImageFile}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                        <Col md="12">
                            <div>
                                {inputData.imagePreviewUrl ? <img style={imageStyles} src={inputData.imagePreviewUrl} /> : '' }
                            </div>
                        </Col>
                    </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={submitFormHandler}
                  >
                    Add Category
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-3.jpg")}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const imageStyles = {
    width: '200px',
    height: '170px',
    marginRight: '2rem',
    marginBottom: '2rem',
}


export default AddCategory;
