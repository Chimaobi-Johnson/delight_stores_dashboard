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
  Modal
} from "react-bootstrap";
import axios from 'axios';
import ProductDetails from "components/Product/ProductDetails/ProductDetails";

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

    const deleteProductHandler = () => {
      axios.post(`/api/product/delete/?id=${modalData.id}`).then(res => {
        if(res.status === 200) {
          window.location.reload();
        }
      }).catch(err => {
        console.log(err)
      })
    }

    const [show, showModal] = useState(false)
    const handleProductView = () => {
      showModal(!show)
    }

    const [modalData, setModalData] = useState({
      id: null,
      show: false,
      title: '',
      body: '',
      options: false
    })
  
    const handleModalInit = () => {
      setModalData(prevState => {
          return {
              ...prevState,
              show: !modalData.show
          }
      })
    }

    const handleDelete = (productId) => {
      setModalData(prevState => {
        return {
            ...prevState,
            id: productId,
            show: true,
            title: 'Delete product',
            body: 'Are you sure you want to delete this product',
            options: true
        }
      })
    }

  return (
    <>
      <Container fluid>
        <Row>
        <ProductDetails open={show} handleProductView={handleProductView} data={products} /> 
        <Modal show={modalData.show} onHide={handleModalInit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{modalData.body}</Modal.Body>
                  {modalData.options ? (
                      <Modal.Footer>
                          <Button variant="secondary" onClick={deleteProductHandler}>
                              Yes
                          </Button>
                          <Button variant="primary" onClick={handleModalInit}>
                              No
                          </Button>
                      </Modal.Footer>
                  ) : null}
            </Modal>
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
                                    <td><NavLink to={'/admin/product/edit/' + product._id}>Edit </NavLink>|
                                    <NavLink to='#' style={{ color: 'green' }} onClick={handleProductView}> View </NavLink>|
                                    <NavLink to='#' style={{ color: 'red' }} onClick={(id) => handleDelete(product._id)}> Delete </NavLink></td>
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
