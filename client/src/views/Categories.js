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

function Categories() {

    const [categories, setCategories] = useState(null)
    const [loadingData, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getCategories = () => {
            axios.get('/api/Categories')
            .then(categories => {
                setLoading(false)
                setCategories(categories.data.categories)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
            
        }

        getCategories()
    }, [])

  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Categories Table</Card.Title>
                <p className="card-category">
                  This is the list of registered Categories for Delight stores E-commerce site
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
                    {loadingData ? <p>Loading Categories....</p> : categories ? categories.length !== 0 ? categories.map((Category, index) => {
                        return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{Category.firstName}</td>
                                    <td>{Category.lastName}</td>
                                    <td>{Category.email}</td>
                                    <td>{Category.role}</td>
                                    <td>Edit/Delete</td>
                                </tr>
                        )
                    }) : 'No Categories found' : ''}
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

export default Categories;
