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

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        let customData = new FormData();
        customData.append('email', email)
        customData.append('password', password)
        const data = {
            email: email,
            password: password
        }
        axios.post('/api/login', customData).then(data => {
            if(data.status === 200) {
           localStorage.setItem('dlight_userId', data.data.user._id);

          // set one hour expiration time
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );
          localStorage.setItem('dlight_expiryDate', expiryDate.toISOString());
          window.location.pathname = '/admin'
          }
        }).catch(err => {
          // alert(err)
            console.log(err)
        })
    }

    const changeTextHandler = (type, e) => {
        if(type === 'email') {
            setEmail(e.target.value)
        } else if(type === 'password') {
            setPassword(e.target.value)
        } else return
    }

  return (
    <>
      <Row className="justify-content-center">
        <Col lg="4" md="8" sm="12">
          <Card>
            <Card.Header>
              <Card.Title as="h2">LOGIN</Card.Title>
              <p className="card-category">Here is a subtitle for this table</p>
            </Card.Header>
            <Card.Body style={{ padding: '3rem 2rem'}}>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" onChange={(e) => changeTextHandler('email', e)} value={email} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={(e) => changeTextHandler('password', e)} value={password} placeholder="Password" />
                  <Form.Text className="text-muted">
                    {/* Password must not be less than 8 characters */}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={() => loginHandler()}>
                  Login
                </Button>
                <Form.Text className="text-muted">
                    Dont have an account? <NavLink to='/auth/register'>Click to register</NavLink>
                </Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
