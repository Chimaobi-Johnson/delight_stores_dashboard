import React from 'react';
import {
    Container,
    Row,
    Col,
    Modal,
    Button
  } from "react-bootstrap";

const ProductDetails = props => {
    const { open, handleProductView, data } = props;
    return (
        <Modal show={open} onHide={handleProductView}>
            <Modal.Header closeButton>
            <Modal.Title>sdsds</Modal.Title>
            </Modal.Header>
            <Modal.Body>sdsd</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleProductView}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

export default ProductDetails