import React from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Card,
  Table,
} from "react-bootstrap";

const ProductDetails = (props) => {
  const { open, handleProductView, data } = props;
  console.log(data)
  return (
    <Modal
      show={open}
      onHide={handleProductView}
      size="lg"   
      style={{ top: '-20%' }}   
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="card-plain table-plain-bg">
          {/* <Card.Header>
            <Card.Title as="h4">Table on Plain Background</Card.Title>
            <p className="card-category">Here is a subtitle for this table</p>
          </Card.Header> */}
          <Card.Body className="table-full-width table-responsive px-0">
            <Table className="table-hover">
              <tbody>
                <tc>
                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>SubHeading</th>
                  <td>{data.subheading}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{data.description}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{data.price}</td>
                </tr>
                <tr>
                  <th>PurchasedBy</th>
                  <td>{data.purchasedBy.length} customers</td>
                </tr>
                </tc>
                <tc>
                
                </tc>
                <tc style={{ marginLeft: '4.5rem' }}>
                <tr>
                  <th>Delivery Status</th>
                  <td>{data.deliveryStatus}</td>
                </tr>
                <tr>
                  <th>Sizes</th>
                  <td>{data.sizes.map(size => size)}</td>
                </tr>
                <tr>
                  <th>Tags</th>
                  <td>{data.tags.map(tag => tag)}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{data.status}</td>
                </tr>
                </tc>
                <tc>
                  <th>Images</th>
                  <td>
                    <div style={{ width: '20%', display: 'flex' }}>{data.imagesUrl.map(image => {
                    return <img src={image} alt="" style={{ width: '100%', height: '100%', marginLeft: '1rem' }} />
                     })}</div>
                  </td>
                </tc>
                
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleProductView}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
