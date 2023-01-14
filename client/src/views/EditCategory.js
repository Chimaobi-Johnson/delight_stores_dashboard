import React, { useEffect, useState } from "react";
import { Alert } from 'reactstrap';
import axios from 'axios';
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

function EditCategory (props) {

    useEffect(() => {
        const categoryId = props.location.pathname.split('/').pop()  // take the last item which is the ID
        axios.get(`/api/category/?id=${categoryId}`).then(res => {
            if(res.status === 200) {
                console.log(res.data)
                setInputData(prevState => {
                    return {
                        ...prevState,
                        id: categoryId,
                        name: res.data.category.name,
                        description: res.data.category.description,
                        imagePreviewUrl: res.data.category.imageUrl
                    }
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const [inputData, setInputData ] = useState({
        id: null,
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

    const [loading, setLoading] = useState(false)
    const [hasError, setError] = useState(true)

    const [responseData, setResponseData] = useState({
      loading: false,
      initAlert: false,
      alertType: 'Info',
      alertMessage: ''
    })

    const submitFormHandler = e => {

       if(inputData.name === '') {
        setResponseData(prevState => {
          return {
            ...prevState,
            initAlert: true,
            alertType: 'warning',
            alertMessage: 'Name field cannot be empty'
          }
        })
        return
       } else {

        setResponseData(prevState => {
          return {
            ...prevState,
            loading: true
          }
        })

          e.preventDefault()
          const data = new FormData();
          data.append('categoryId', inputData.id);
          data.append('name', inputData.name);
          data.append('description', inputData.description);
          data.append('image', inputData.imageUrl)
          
          axios.post('/api/category/update', data)
          .then(res => {
            if(res.status === 201 || res.status === 200) {
              setInputData(prevState => {
                return {
                    ...prevState,
                    name: '',
                    description: '',
                    imageUrl: null,
                    imagePreviewUrl: null
                }
            })
            setResponseData(prevState => {
              return {
                ...prevState,
                loading: false,
                initAlert: true,
                alertType: 'success',
                alertMessage: 'Category updated successfully'
              }
            })
            }
          })
          .catch(err => {
            setResponseData(prevState => {
              return {
                ...prevState,
                loading: false,
                initAlert: true,
                alertType: 'danger',
                alertMessage: 'Server error. Check connection or try again later'
              }
            })
          })
                  
       }
    }

    const closeNotification = () => {
      setResponseData(prevState => {
        return {
          ...prevState,
          initAlert: false
        }
      })
    }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Product</Card.Title>
              </Card.Header>
              <Card.Body>
              <Alert
                color={responseData.alertType}
                isOpen={responseData.initAlert}
                toggle={closeNotification}
            >
                <span>{responseData.alertMessage}</span>
            </Alert>
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
                    {responseData.loading ? 'Saving...' : 'Update'}
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


export default EditCategory;
