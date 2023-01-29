import React, { useEffect, useState } from "react";
import { Alert } from 'reactstrap';

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
  Modal
} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
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

    const [modalData, setModalData] = useState({
      id: null,
      show: false,
      title: '',
      body: '',
      options: false
    })

    const handleDelete = (id) => {
      setModalData(prevState => {
        return {
          ...prevState,
          id: id,
          show: true,
          title: 'Delete User',
          body: 'Are you sure you want to delete user?',
          options: true
        }
      })
    }

    const handleModalInit = () => {
      setModalData(prevState => {
          return {
              ...prevState,
              show: !modalData.show
          }
      })
    }

    const deleteUserHandler = () => {
      axios.post(`/api/user/delete/?id=${modalData.id}`)
      .then(res => {
        if(res.status === 200) {
          setModalData(prevState => {
            return {
              ...prevState,
              id: null,
              show: true,
              title: 'Success',
              body: 'User deleted successfully',
              options: false
            }
          })
          window.location.reload();
        }
      })
      .catch(err => {
        setModalData(prevState => {
          return {
            ...prevState,
            id: null,
            show: true,
            title: 'Fail',
            body: 'Error. Check connection or try again later',
            options: false
          }
        })
        console.log(err)
      })
    }

  return (
    <>
      <Container fluid>
       <Modal show={modalData.show} onHide={handleModalInit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalData.body}</Modal.Body>
                  {modalData.options ? (
                      <Modal.Footer>
                          <Button variant="secondary" onClick={deleteUserHandler}>
                              Yes
                          </Button>
                          <Button variant="primary" onClick={handleModalInit}>
                              No
                          </Button>
                      </Modal.Footer>
                  ) : null}
            </Modal>
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
                      <th className="border-0">Actions</th>
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
                                    <td><NavLink to='#' onClick={(id) => handleDelete(user._id)} style={{ color: 'red' }}>Delete</NavLink></td>
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
