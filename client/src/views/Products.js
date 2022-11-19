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

function Products() {

    const [products, setproducts] = useState(null)
    const [loadingData, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getproducts = () => {
            axios.get('/api/products')
            .then(products => {
                setLoading(false)
                setproducts(products.data.products)
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
            
        }

        getproducts()
    }, [])

  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Products Table</Card.Title>
                <p className="card-category">
                  This is the list of registered products for Delight stores E-commerce site
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
                    {loadingData ? <p>Loading products....</p> : products ? products.length !== 0 ? products.map((product, index) => {
                        return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.firstName}</td>
                                    <td>{product.lastName}</td>
                                    <td>{product.email}</td>
                                    <td>{product.role}</td>
                                    <td>Edit/Delete</td>
                                </tr>
                        )
                    }) : 'No products found' : ''}
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

export default Products;
