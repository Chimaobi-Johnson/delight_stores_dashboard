import React, { useEffect, useState } from "react";

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
import axios from 'axios';

function Users() {

    const [users, setUsers] = useState(null)
    const [loadingData, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getUsers = () => {
            axios.get('/api/users')
            .then(users => {
                setLoading(false)
                setUsers(users.data.users)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
            
        }

        getUsers()
    }, [])

  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users Table</Card.Title>
                <p className="card-category">
                  This is the list of registered users for Delight stores E-commerce site
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">First Name</th>
                      <th className="border-0">Last Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingData ? <p>Loading users....</p> : users ? users.length !== 0 ? users.map((user, index) => {
                        return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                        )
                    }) : 'No users found' : ''}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default Users;
