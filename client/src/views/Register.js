import React, { Component, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
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
import { Input } from "reactstrap";

function Register() {


  const { control, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });


  const submitFormHandler = async (data) => {
    console.log(data)
    if (data.password !== data.confirmPassword) {
      alert("Password and confirm password does not match!");
      return;
    } else {
      // validateData(inputData)
      // if(errorMessages.length === 0) {
      //     console.log('Form submitted')
      // }
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await axios.post("/api/register", formData);
      if (result.data.status === 200 || result.data.status === 201) {
        alert("User created successfully");
      } else {
        alert("Error");
        console.log(result);
      }
    }
  };


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
                  <Controller
                    name="firstName"
                    control={control}
                     rules={{ required: true, minLength: 3 }}
                    render={({ field }) => (
                      <Form.Control {...field} type="text" placeholder="Enter First Name" />
                    )}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Controller
                    name="lastName"
                    control={control}
                     rules={{ required: true, minLength: 3 }}
                    render={({ field }) => (
                      <Form.Control {...field} type="text" placeholder="Enter Last Name" />
                    )}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Controller
                    name="email"
                    control={control}
                     rules={{ required: true }}
                    render={({ field }) => (
                      <Form.Control {...field} type="email" placeholder="Enter Email" />
                    )}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Controller
                    name="password"
                    control={control}
                     rules={{ required: true, minLength: 8 }}
                    render={({ field }) => (
                      <Form.Control {...field} type="password" placeholder="Enter Password" />
                    )}
                  />
                  <Form.Text className="text-muted">
                      Password must not be less than 8 characters
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  className="mb-4"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                     rules={{ required: true, minLength: 8 }}
                    render={({ field }) => (
                      <Form.Control {...field} type="password" placeholder="Confirm Password" />
                    )}
                  />
                  <Form.Text className="text-muted">{}</Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit(submitFormHandler)}>
                  Register
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
