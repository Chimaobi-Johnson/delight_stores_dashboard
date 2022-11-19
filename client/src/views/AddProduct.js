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

function AddProduct() {
  const [productInput, setProductInput] = useState({
    name: "",
    price: null,
    subheading: "",
    description: "",
    imageUrl: "",
    image: "",
    deliveryStatus: "",
    tags: [],
    sizes: [],
  });

  const [tag, setTag] = useState("");
  const [size, setSize] = useState("");

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

  console.log(productInput);

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
                        <label>Product Name</label>
                        <Form.Control
                          placeholder="Enter name of product"
                          type="text"
                          value=""
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <label>Sub Heading</label>
                        <Form.Control
                          placeholder="Product sub heading"
                          type="text"
                          value=""
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="12">
                      <Form.Group>
                        <label>Price</label>
                        <Form.Control
                          defaultValue={0}
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group controlId="formControlsSelectMultiple">
                        <label>Select Category</label>
                        <Input type="select">
                          <option value="">...</option>
                          <option value="other">Others</option>
                        </Input>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="formControlsSelectMultiple2">
                        <label>Delivery Status</label>
                        <Input type="select">
                          <option value="">...</option>
                          <option value="ready">Ready for delivery</option>
                          <option value="ready">Pickup only</option>
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
                          value=""
                          placeholder="Give full description product"
                          rows="4"
                          as="textarea"
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
                        <label>Product Images</label>
                        <Form.Control
                          type="file"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pr-1" md="6">
                      <Button variant="primary">Upload</Button>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Add Product
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

export default AddProduct;
