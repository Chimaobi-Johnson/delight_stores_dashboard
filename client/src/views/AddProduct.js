import React, { useEffect, useState } from "react";

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
  Modal,
} from "react-bootstrap";
import { Input } from "reactstrap";
import axios from "axios";

function AddProduct() {
  const [productInput, setProductInput] = useState({
    name: "",
    price: null,
    subheading: "",
    description: "",
    category: null,
    imagesUrl: [],
    imagesId: [],
    deliveryStatus: "",
    tags: [],
    sizes: [],
  });

  const [tag, setTag] = useState("");
  const [size, setSize] = useState({
    name: '',
    price: null,
    availability: ''
  });
  const [imagesUrl, setImageUrl] = useState([]);
  const [images, setImage] = useState([]);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = () => {
      axios
        .get("/api/categories")
        .then((categories) => {
          setCategories(categories.data.categories);
          setProductInput((prevState) => {
            return {
              ...prevState,
              category: categories.data.categories[0]._id,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCategories();
  }, []);

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

  const addSizeToArray = (e) => {
    if(size.name === null) {
      return
    }
    console.log(size)
    const newSize = [...productInput.sizes];
    newSize.push(size);
    setProductInput((prevState) => {
      return {
        ...prevState,
        sizes: newSize,
      };
    });
    setSize(prevState => {
      return {
        name: null,
        price: null,
        availability: null
      }
    });
    setModalData(prevState => {
      return {
        show: false
      }
    })
  };

  console.log(productInput)

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

  // const removeSize = (index) => {
  //   const newSize = [...productInput.sizes];
  //   newSize.splice(index, 1);
  //   setProductInput((prevState) => {
  //     return {
  //       ...prevState,
  //       sizes: newSize,
  //     };
  //   });
  // };

  const changeTagHandler = (e) => {
    setTag(e.target.value);
  };

  const changeSizeHandler = (input, e) => {
    console.log(e.target.value)
    setSize((prevState) => {
      return {
        ...prevState,
        [input]: e.target.value
      }
    })
  };

  const getImageFile = (e) => {
    const fileLength = e.target.files.length;
    const imageUrlArray = [...imagesUrl];
    const imagesArr = [...images];
    for (let i = 0; i < fileLength; i++) {
      imageUrlArray.push(URL.createObjectURL(e.target.files[i]));
      imagesArr.push(e.target.files[i]);
    }
    setImageUrl(imageUrlArray);
    setImage(imagesArr);
  };

  const removeImageHandler = (index) => {
    const newImageUrlArr = [...imagesUrl];
    const newImageArr = [...images];
    newImageUrlArr.splice(index, 1);
    newImageArr.splice(index, 1);
    setImageUrl(newImageUrlArr);
    setImage(newImageArr);
  };

  const changeInputHandler = (input, e) => {
    setProductInput((prevState) => {
      return {
        ...prevState,
        [input]: e.target.value,
      };
    });
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    console.log(productInput);
    const formData = new FormData();
    formData.append("name", productInput.name);
    formData.append("price", productInput.price);
    formData.append("subheading", productInput.subheading);
    formData.append("description", productInput.description);
    formData.append("category", productInput.category);
    formData.append("deliveryStatus", productInput.deliveryStatus);
    formData.append("sizes", productInput.sizes);
    formData.append("tags", productInput.tags);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    setLoading(true);

    axios
      .post("/api/product/add", formData)
      .then((res) => {
        if (res.status === 201) {
          setLoading(false);
          setModalData((prevState) => {
            return {
              ...prevState,
              show: true,
              title: "Add Product",
              body: "Product added successfully",
              options: false,
            };
          });
          setProductInput((prevState) => {
            return {
              ...prevState,
              name: "",
              price: 0,
              subheading: "",
              description: "",
              imagesUrl: [],
              imagesId: [],
              deliveryStatus: "",
              tags: [],
              sizes: [],
            };
          });
          setImage([]);
          setImageUrl([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const initSizeModal = () => {
    
    setModalData((prevState) => {
      return {
        ...prevState,
        show: true,
        title: "Add size",
        body: 'add size',
        options: false,
      };
    });
  };

  const AddSize = () => {
    return (
      <div>
         <Form.Group>
            <label>Size Name (e.g SM, MD, LG)</label>
            <Form.Control
              type="text"
              value={size.name}
              onChange={(e) => changeSizeHandler('name', e)}
            ></Form.Control>
          </Form.Group>
         <Form.Group>
            <label>Price</label>
            <Form.Control
              type="number"
              value={size.price}
              onChange={(e) => changeSizeHandler('price', e)}
            ></Form.Control>
          </Form.Group>
        <Form.Group controlId="formControlsSelectMultiple">
          <label>Availability</label>
          <Input
            type="select"
            value={size.availability}
            onChange={(e) => changeSizeHandler('availability', e)}
          >
            <option value=''>
            </option>
            <option value='in-stock'>
              In stock
            </option>
            <option value='not-in-stock'>
              Not in stock
            </option>
          </Input>
        </Form.Group>
        <Button onClick={addSizeToArray} style={{ marginTop: '2rem' }} size="md">Add Size</Button>
      </div>
    );
  };

  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    body: "",
    options: false,
  });

  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setModalData((prevState) => {
      return {
        ...prevState,
        show: false,
      };
    });
  };

  return (
    <>
      <Container fluid>
        <Modal show={modalData.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalData.body === 'add size' ? <AddSize /> : modalData.body}</Modal.Body>
          {modalData.options ? (
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          ) : null}
        </Modal>
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
                        <label>Product Name</label>
                        <Form.Control
                          placeholder="Enter name of product"
                          type="text"
                          value={productInput.name}
                          onChange={(e) => changeInputHandler("name", e)}
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
                          onChange={(e) => changeInputHandler("subheading", e)}
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
                          onChange={(e) => changeInputHandler("price", e)}
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
                          onChange={(e) => changeInputHandler("category", e)}
                        >
                          {categories
                            ? categories.map((item) => {
                                return (
                                  <>
                                    <option
                                      key={Math.random() * 120}
                                      value={item._id}
                                    >
                                      {item.name}
                                    </option>
                                  </>
                                );
                              })
                            : "No categories found"}
                        </Input>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formControlsSelectMultiple2">
                        <label>Delivery Status</label>
                        <Input
                          type="select"
                          value={productInput.deliveryStatus}
                          onChange={(e) =>
                            changeInputHandler("deliveryStatus", e)
                          }
                        >
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
                          onChange={(e) => changeInputHandler("description", e)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ alignItems: "flex-end" }}>
                    <Col md="6">
                      <Form.Group>
                        <label>Add Available Sizes</label>
                      </Form.Group>
                      <Button className="btn-fill" variant="info" onClick={initSizeModal}>Add size</Button>

                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      sizes display
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
                      <Button className="btn-fill" variant="info" onClick={(e) => addTag(e)}>
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
                        {imagesUrl.length !== 0
                          ? imagesUrl.map((image, index) => {
                              return (
                                <div
                                  key={index + Math.random()}
                                  onClick={(param) => removeImageHandler(index)}
                                >
                                  <img style={productImage} src={image} />
                                </div>
                              );
                            })
                          : ""}
                      </div>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="primary"
                    onClick={submitFormHandler}
                  >
                    {loading ? "Adding Product..." : "Add Product"}
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

const imagesContainer = {
  display: "flex",
  justifyContent: "flex-start",
  flexWrap: "wrap",
  padding: "1rem 2rem",
  width: "100%",
};

const productImage = {
  width: "200px",
  height: "170px",
  marginRight: "2rem",
  marginBottom: "2rem",
};

export default AddProduct;
