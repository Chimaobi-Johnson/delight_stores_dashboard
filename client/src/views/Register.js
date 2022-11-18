import React, { Component, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from 'axios';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Register() {

  const [inputData, setInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const editTextHandler = (type, e) => {
    setInputData(prevState => {
        return {
            ...prevState,
            [type]: e.target.value
        }
    })
  }

  const [errorMessages, setErrorMessages] = useState([])

  const [errorObj, setErrorObj] = useState({
    
  })

  const validateData = (inputObj) => {
     for(const[key, value] of Object.entries(inputObj)) {
        // console.log(value)
        if(value === '') {
            const errArr = [...errorMessages]
            errArr.push('All fields are mandatory');
            setErrorMessages(errArr)
        }
     }
  }


  const submitFormHandler = async () => {
    if(inputData.password !== inputData.confirmPassword) {
        setErrorMessage('Password and confirm password does not match!')
        return
    } else {
        // validateData(inputData)
        // if(errorMessages.length === 0) {
        //     console.log('Form submitted')
        // }
        const formData = new FormData();
        formData.append('firstName', inputData.firstName)
        formData.append('lastName', inputData.lastName)
        formData.append('email', inputData.email)
        formData.append('password', inputData.password)

        const result = await axios.post('/api/register', formData);
        if(result.data.status === 200) {
            alert('User created successfully')
        } else {
            alert('Error')
            console.log(result)
        }
    }
 
  }

  console.log(errorMessages)

  return (
    <>
      <Row className="justify-content-center">
        <Col lg="4" md="8" sm="12">
          <Card>
            <Card.Header>
              <Card.Title as="h2">SIGN UP</Card.Title>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </Card.Header>
            <Card.Body style={{ padding: "3rem 2rem" }}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => editTextHandler("firstName", e)}
                    placeholder="Enter First Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => editTextHandler("lastName", e)}
                    placeholder="Enter Last Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => editTextHandler("email", e)}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => editTextHandler("password", e)}
                    placeholder="Password"
                  />
                  {/* <Form.Text className="text-muted">
                    Password must not be less than 8 characters
                  </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={(e) => editTextHandler("confirmPassword", e)}
                    placeholder="Confirm Password"
                  />
                  <Form.Text className="text-muted">
                    {}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={() => submitFormHandler()}>
                  Submit
                </Button>
                <Form.Text className="text-muted">
                  Already have an account?{" "}
                  <NavLink to="/auth/login">Click to login</NavLink>
                </Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
