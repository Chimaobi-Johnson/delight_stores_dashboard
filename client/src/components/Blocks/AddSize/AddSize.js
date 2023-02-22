import React, { useState } from "react";
// react-bootstrap components
import {
    Button,
    Form,
  } from "react-bootstrap";
  import { Input } from "reactstrap";


const AddSize = props => {

    const { addSizeToArray } = props

    const [size, setSize] = useState({
        name: '',
        price: null,
        availability: ''
    });
    
    const changeSizeHandler = (input, e) => {
        console.log(e.target.value)
        setSize((prevState) => {
          return {
            ...prevState,
            [input]: e.target.value
          }
        })
      };
    
    console.log(size)

    return (
      <div>
         {/* <Form.Group>
            <label>Size Name (e.g SM, MD, LG)</label>
            <Form.Control
              type="text"
              value={size.name}
              onChange={(e) => changeSizeHandler('name', e)}
            ></Form.Control>
          </Form.Group>
         <Form.Group>
            <label>Price</label>
            <Form.Control
              type="number"
              value={size.price}
              onChange={(e) => changeSizeHandler('price', e)}
            ></Form.Control>
          </Form.Group>
        <Form.Group controlId="formControlsSelectMultiple">
          <label>Availability</label>
          <Input
            type="select"
            value={size.availability}
            onChange={(e) => changeSizeHandler('availability', e)}
          >
            <option value=''>
            </option>
            <option value='in-stock'>
              In stock
            </option>
            <option value='not-in-stock'>
              Not in stock
            </option>
          </Input>
        </Form.Group>
        <Button onClick={(size) => addSizeToArray(size)} style={{ marginTop: '2rem' }} size="md">Add Size</Button> */}
      </div>
    );
  };

  export default AddSize