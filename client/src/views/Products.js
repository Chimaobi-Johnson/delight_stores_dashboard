import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

    const [products, setProducts] = useState(null)
    const [loadingData, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getproducts = () => {
            axios.get('/api/products')
            .then(products => {
                setLoading(false)
                console.log(products.data.products)
                setProducts(products.data.products)
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
                <Row>
                    <Col lg="6">
                        <Card.Title as="h4">Products Table</Card.Title>
                        <p className="card-category">
                        This is the list of registered products for Delight stores E-commerce site
                        </p>
                    </Col>
                    <Col lg="6">
                        <Button
                            style={{ float: 'right' }} 
                            className="btn-fill pull-right"
                            variant="info"
                            >
                             <NavLink to="/admin/product/add" style={{ color: 'white' }}>
                                 Add Product  
                             </NavLink>
                        </Button>
                    </Col>
                </Row>

              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Description</th>
                      <th className="border-0">price</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingData ? <p>Loading products....</p> : products ? products.length !== 0 ? products.map((product, index) => {
                        return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>Edit/View/Delete</td>
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
