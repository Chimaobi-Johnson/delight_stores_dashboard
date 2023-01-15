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
} from "react-bootstrap";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Categories() {


    const [responseData, setResponseData] = useState({
      loading: false,
      initAlert: false,
      alertType: 'Info',
      alertMessage: ''
    })

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

    const deleteCategoryHandler = (id) => {
      setResponseData(prevState => {
        return {
          ...prevState,
          loading: true
        }
      })
      axios.post(`/api/category/delete/?id=${id}`).then(res => {
        if(res.status === 200) {
          window.location.reload();
          setResponseData(prevState => {
            return {
              ...prevState,
              initAlert: true,
              alertType: 'success',
              alertMessage: 'Category deleted successfully'
            }
          })
        }
      }).catch(err => {
        setResponseData(prevState => {
          return {
            ...prevState,
            initAlert: true,
            alertType: 'warning',
            alertMessage: 'Error deleting category'
          }
        })
      })
    }

    const closeNotification = () => {
      setResponseData(prevState => {
        return {
          ...prevState,
          initAlert: false
        }
      })
    }

  return (
    <>
      <Container fluid>
        <Row>

          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Row>
                  <Col md="6">
                    <Card.Title as="h4">Categories Table</Card.Title>
                    <p className="card-category">
                      This is the list of Categories for products
                    </p>
                    <Alert
                      color={responseData.alertType}
                      isOpen={responseData.initAlert}
                      toggle={closeNotification}
                    >
                        <span>{responseData.alertMessage}</span>
                    </Alert>
                  </Col>
                  <Col md="6">
                          <Button
                              style={{ float: 'right' }} 
                              className="btn-fill pull-right"
                              variant="info"
                              >
                              <NavLink to="/admin/category/new" style={{ color: 'white' }}>
                                  New Category  
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
                      <th className="border-0">Image</th>
                      <th className="border-0">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingData ? <p>Loading Categories....</p> : categories ? categories.length !== 0 ? categories.map((category, index) => {
                        return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td><img style={{ width: '80px', height: '60px' }} src={category.imageUrl} alt="" /></td>
                                    <td>
                                      <NavLink to={"/admin/category/edit/" + category._id}>
                                       Edit
                                      </NavLink> / 
                                      <NavLink to="#" onClick={(id) => deleteCategoryHandler(category._id)} style={{ color: 'red' }}> Delete</NavLink>
                                    </td>
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
