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
  Modal
} from "react-bootstrap";
import { Input } from "reactstrap";
import axios from 'axios';
import { Alert } from 'reactstrap';
import { useEffect } from "react";

function EditProduct(props) {

    useEffect(() => {
        const productId = props.location.pathname.split('/').pop()  // take the last item which is the ID
        axios.get(`/api/product/edit/?id=${productId}`).then(res => {
            if(res.status === 200) {
                console.log(res.data)
                setProductInput(prevState => {
                    return {
                        ...prevState,
                        id: productId,
                        name: res.data.product.name,
                        price: res.data.product.price,
                        subheading: res.data.product.subheading,
                        description: res.data.product.description,
                        category: res.data.category ? res.data.category.name : null,
                        imagesId:  res.data.product.imagesId,
                        imagesUrl: res.data.product.imagesUrl,
                        deliveryStatus: res.data.product.deliveryStatus,
                        tags: res.data.product.tags,
                        sizes: res.data.product.sizes,
                    }
                })
                setImageUrl(res.data.product.imagesUrl)

            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        const getCategories = () => {
            axios.get('/api/categories')
            .then(categories => {
                setCategories(categories.data.categories)
            })
            .catch(err => {
                console.log(err)
            })
            
        }
    
        getCategories()
      }, [])

  const [productInput, setProductInput] = useState({
    id: null,
    name: "",
    price: null,
    subheading: "",
    description: "",
    category: "",
    imagesUrl: [],
    imagesId: [],
    deliveryStatus: "",
    tags: [],
    sizes: [],
  });

  const [tag, setTag] = useState("");
  const [size, setSize] = useState("");
  const [imagesUrl, setImageUrl] = useState([]);
  const [images, setImage] = useState([]);
  const [categories, setCategories] = useState(null)

  const addTag = (e) => {
    e.preventDefault();
    if (tag === "") return;
    const newTag = [...productInput.tags];
    newTag.push(tag);
    setProductInput((prevState) => {
      return {
        ...prevState,
        tags: newTag,
      };
    });
    setTag("");
  };

  const addSize = (e) => {
    e.preventDefault();
    if (size === "") return;
    const newSize = [...productInput.sizes];
    newSize.push(size);
    setProductInput((prevState) => {
      return {
        ...prevState,
        sizes: newSize,
      };
    });
    setSize("");
  };

  const removeTag = (index) => {
    const newTag = [...productInput.tags];
    newTag.splice(index, 1);
    setProductInput((prevState) => {
      return {
        ...prevState,
        tags: newTag,
      };
    });
  };

  const removeSize = (index) => {
    const newSize = [...productInput.sizes];
    newSize.splice(index, 1);
    setProductInput((prevState) => {
      return {
        ...prevState,
        sizes: newSize,
      };
    });
  };

  const changeTagHandler = (e) => {
    setTag(e.target.value);
  };

  const changeSizeHandler = (e) => {
    setSize(e.target.value);
  };

  const getImageFile = e => {
    const fileLength = e.target.files.length;
    const imageUrlArray = [...imagesUrl];
    const imagesArr = [...images];
    for(let i = 0; i < fileLength; i++) {
        imageUrlArray.push(URL.createObjectURL(e.target.files[i]))
        imagesArr.push(e.target.files[i])
    }
    setImageUrl(imageUrlArray)
    setImage(imagesArr)
  }

  const [currentImageDetails, setCurrentImageDetails] = useState({
    cloudinaryId: null,
    cloudinaryUrl: null,
    productId: null
  })


  const removeImageHandler = (image) => {
    const location = image.split('/').slice(-3)[0];
    const subLocation = image.split('/').slice(-2)[0];
    const id = image.split('/').pop().split('.')[0];
    const cloudinaryId = `${location}/${subLocation}/${id}`;

    setCurrentImageDetails(prevState => {
        return {
            ...prevState,
            cloudinaryId: cloudinaryId,
            cloudinaryUrl: image,
            productId: productInput.id
        }
    })

    setModalData(prevState => {
        return {
            ...prevState,
            show: true,
            title: 'Delete Image',
            body: 'Are you sure you want to delete image?',
            options: true
        }
    })
  }

  const deleteImageHandler = () => {
    setModalData(prevState => {
        return {
            ...prevState,
            show: false
        }
    })
    axios.post('/api/product/image/delete', currentImageDetails)
    .then(res => {
        if(res.status === 200) {
            const newImagesUrl = [ ...imagesUrl]
            const currentIndex = newImagesUrl.indexOf(currentImageDetails.cloudinaryUrl);
            newImagesUrl.splice(currentIndex, 1)
            setImageUrl(newImagesUrl)
            setCurrentImageDetails(prevState => {
                return {
                    ...prevState,
                    cloudinaryId: null,
                    cloudinaryUrl: null,
                    productId: null
                }
            })
            setModalData(prevState => {
                return {
                    ...prevState,
                    show: true,
                    title: 'Delete Image',
                    body: 'Image deleted successfully',
                    options: false
                }
            })
        }
    }).catch(err => {
        console.log(err)
        setModalData(prevState => {
            return {
                ...prevState,
                show: true,
                title: 'Delete failed',
                body: 'Error. Check connection or try again later',
                options: false
            }
        })
    })
  }


  const changeInputHandler = (input, e) => {
    setProductInput(prevState => {
        return {
            ...prevState,
            [input]: e.target.value
        }
    })
  }

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productId', productInput.id)
    formData.append('name', productInput.name)
    formData.append('price', productInput.price)
    formData.append('subheading', productInput.subheading)
    formData.append('description', productInput.description)
    formData.append('category', productInput.category)
    formData.append('deliveryStatus', productInput.deliveryStatus)
    formData.append('sizes', productInput.sizes)
    formData.append('tags', productInput.tags)
    
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
   }
  
    axios.post('/api/product/update', formData)
    .then(res => {
        if(res.status === 200) {
            setModalData(prevState => {
                return {
                    ...prevState,
                    show: true,
                    title: 'Update Product',
                    body: 'Product updated successfully',
                    options: false
                }
            })
        }
    })
    .catch(err => {
        console.log(err)
        setModalData(prevState => {
            return {
                ...prevState,
                show: true,
                title: 'Update failed',
                body: 'Check connection or try again later',
                options: false
            }
        })
    })

  }

  const [responseData, setResponseData] = useState({
    loading: false,
    initAlert: false,
    alertType: 'Info',
    alertMessage: ''
  })

  const closeNotification = () => {
    setResponseData(prevState => {
      return {
        ...prevState,
        initAlert: false
      }
    })
  }

  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    body: '',
    options: false
  })

  const handleClose = () => {
    setModalData(prevState => {
        return {
            ...prevState,
            show: false
        }
    })
    }

  return (
    <>
      <Container fluid>
      <Modal show={modalData.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalData.body}</Modal.Body>
            {modalData.options ? (
                <Modal.Footer>
                    <Button variant="secondary" onClick={deleteImageHandler}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            ) : null}
      </Modal>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Product</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Product Name</label>
                        <Form.Control
                          placeholder="Enter name of product"
                          type="text"
                          value={productInput.name}
                          onChange={(e) => changeInputHandler('name', e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Sub Heading</label>
                        <Form.Control
                          placeholder="Product sub heading"
                          type="text"
                          value={productInput.subheading}
                          onChange={(e) => changeInputHandler('subheading', e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          type="number"
                          value={productInput.price}
                          onChange={(e) => changeInputHandler('price', e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formControlsSelectMultiple">
                        <label>Select Category</label>
                        <Input 
                            type="select" 
                            value={productInput.category}
                            onChange={(e) => changeInputHandler('category', e)}>
                            {categories ? categories.map(item => {
                                return (
                                    <>
                                      <option key={Math.random() * 120} value={item._id}>{item.name}</option>
                                    </>
                                )
                            }) : 'No categories found'}
                        </Input>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formControlsSelectMultiple2">
                        <label>Delivery Status</label>
                        <Input 
                            type="select"    
                            value={productInput.deliveryStatus}
                            onChange={(e) => changeInputHandler('deliveryStatus', e)}>
                            <option value="">...</option>
                            <option value="ready">Ready for delivery</option>
                            <option value="pickup">Pickup only</option>
                        </Input>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Product Description</label>
                        <Form.Control
                          cols="80"
                          placeholder="Give full description product"
                          rows="4"
                          as="textarea"
                          value={productInput.description}
                          onChange={(e) => changeInputHandler('description', e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col md="6">
                      <Form.Group>
                        <label>Add Available Sizes (SM, MD, LG ...)</label>
                        <Form.Control
                          placeholder="Add Available Sizes (SM, MD, LG ...)"
                          type="text"
                          onChange={(e) => changeSizeHandler(e)}
                          value={size}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Button variant="primary" onClick={(e) => addSize(e)}>
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      {productInput.sizes !== 0
                        ? productInput.sizes.map((size, index) => {
                            return (
                              <Button
                                style={{
                                  color: "black",
                                  border: "1px solid #363636",
                                  marginRight: "9px"    ,
                                  padding: "2px 7px",
                                }}
                                variant="primary"
                                key={index}
                                onClick={(index) => removeSize(index)}
                              >
                                {size}
                              </Button>
                            );
                          })
                        : ""}
                    </Col>
                  </Row>

                  <Row style={{ alignItems: "flex-end" }}>
                    <Col md="6">
                      <Form.Group>
                        <label>Add Tag</label>
                        <Form.Control
                          placeholder="Add tags"
                          type="text"
                          onChange={(e) => changeTagHandler(e)}
                          value={tag}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Button variant="primary" onClick={(e) => addTag(e)}>
                        Add
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <ul>
                        {productInput.tags !== 0
                          ? productInput.tags.map((tag, index) => {
                              return (
                                <li
                                  style={{ cursor: "pointer" }}
                                  key={index}
                                  onClick={(index) => removeTag(index)}
                                >
                                  {tag}
                                </li>
                              );
                            })
                          : ""}
                      </ul>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Product Images (Max 6)</label>
                        <Form.Control
                          type="file"
                          onChange={getImageFile}
                          name="images"
                          multiple
                        ></Form.Control>
                            <Form.Text className="text-muted">
                                Click on image to remove
                            </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                        <Col md="12">
                            <div style={imagesContainer}>
                                {imagesUrl.length !== 0 ? imagesUrl.map((image, index) => {
                                    return (
                                        <div key={index + Math.random()} onClick={(param) => removeImageHandler(image)}>
                                           <img style={productImage} src={image} />
                                           
                                        </div>
                                    )
                                }): ''}
                            </div>
                        </Col>
                    </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={submitFormHandler}
                  >
                    Update Product
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <Alert
                    color={responseData.alertType}
                    isOpen={responseData.initAlert}
                    toggle={closeNotification}
                >
                    <span>{responseData.alertMessage}</span>
                </Alert>
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

const imagesContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: '1rem 2rem',
    width: '100%'
}

const productImage = {
    width: '200px',
    height: '170px',
    marginRight: '2rem',
    marginBottom: '2rem',
}

export default EditProduct;
