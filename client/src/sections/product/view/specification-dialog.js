import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { Input, MenuItem, Select } from '@mui/material';
import Label from 'src/components/label/label';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { color } from 'framer-motion';

export default function SpecificationDialogBox({
  specificationType,
  setValue,
  specifications,
  setSpecifications,
  updateQuantity,
}) {

  const [sizeInputData, setSizeInputData] = useState({
    label: '',
    price: 0,
    stock: 0,
    priceType: '+',
    colors: [],
  });

  const [colorInputData, setColorInputData] = useState({
    code: '#000000',
    label: '',
    priceType: '+',
    price: 0,
    stock: 0,
  });


  const changeColorHandler = (e, inputData) => {
    setColorInputData({
      ...colorInputData,
      [inputData]: e.target.value,
    });
  };

  // ADD SIZE LOGIC

  const addSizeToArray = () => {
    let totalQty = 0;
    const sizesArr = [...specifications.sizes];
    sizesArr.push(sizeInputData);
    setSpecifications((prevState) => ({
      ...prevState,
      type: specificationType,
      sizes: sizesArr,
    }));
    // Update quantity
    for (let index = 0; index < sizesArr.length; index += 1) {
      totalQty += Number(sizesArr[index].stock);
    }
    updateQuantity(totalQty);
    setSizeInputData((prevState) => ({
      ...prevState,
      label: '',
      price: 0,
      stock: 0,
      priceType: '+',
      colors: [],
    }));
    setValue('specificationType', '');
  };

  const changeSizeHandler = (e, inputData) => {
    setSizeInputData({
      ...sizeInputData,
      [inputData]: e.target.value,
    });
  };

  const addColorOnlyToArray = () => {
    let totalQty = 0;
    const colorsArr = specifications.colors;
    colorsArr.push(colorInputData);
    setSpecifications((prevState) => ({
      ...prevState,
      type: specificationType,
      colors: colorsArr,
    }));
    // Update quantity
    for (let index = 0; index < colorsArr.length; index += 1) {
      totalQty += Number(colorsArr[index].stock);
    }
    updateQuantity(totalQty);
    setColorInputData((prevState) => ({
      ...prevState,
      code: '',
      label: '',
      priceType: '+',
      price: null,
      stock: 0,
    }));
    setValue('specificationType', '');
  };

  const renderComponent = () => {
    if (specificationType === 'add-size-and-color' || specificationType === 'add-sizes-only') {
      return (
        <ConfirmDialog
          open
          onClose={() => setValue('specificationType', '')}
          title="Add Size Specifications"
          content={
            <Grid container spacing={3} style={{ overflow: 'hidden' }}>
              <Grid container mt={4}>
                <Grid sm={6}>
                  <Label>Size Label</Label>
                  <Input
                    type="text"
                    id="sizename"
                    onChange={(e) => changeSizeHandler(e, 'label')}
                    value={sizeInputData.label}
                  />
                </Grid>
                <Grid sm={6}>
                  <Label>Price Addition/Subtraction</Label>
                  <Input
                    type="number"
                    id="sizePrice"
                    onChange={(e) => changeSizeHandler(e, 'price')}
                    value={sizeInputData.price}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid sm={6}>
                  <Label>Price Type</Label>
                  <Select
                    onChange={(e) => changeSizeHandler(e, 'priceType')}
                    value={sizeInputData.priceType}
                  >
                    <MenuItem value="+">+</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                  </Select>
                </Grid>
                <Grid sm={6}>
                  <Label>Available Stock</Label>
                  <Input
                    type="number"
                    id="sizeStock"
                    onChange={(e) => changeSizeHandler(e, 'stock')}
                    value={sizeInputData.stock}
                  />
                </Grid>
              </Grid>
            </Grid>
          }
          action={
            <Button variant="contained" color="success" onClick={addSizeToArray}>
              Add
            </Button>
          }
        />
      );
    }
    if (specificationType === 'add-colors-only') {
      return (
        <ConfirmDialog
          open
          onClose={() => setValue('specificationType', '')}
          title="Add Colors"
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <Label>Color Picker</Label>
                <Input
                  style={{ width: '20%' }}
                  type="color"
                  onChange={(e) => changeColorHandler(e, 'code')}
                  id="favcolor"
                  value={colorInputData.code}
                />
              </div>
              <div>
                <Label>Color Name</Label>
                <Input
                  type="text"
                  id="colorname"
                  onChange={(e) => changeColorHandler(e, 'label')}
                  value={colorInputData.label}
                />
              </div>

              <div>
                <Label>Price Addition/Subtraction</Label>
                <Input
                  type="number"
                  id="colorprice"
                  onChange={(e) => changeColorHandler(e, 'price')}
                  value={colorInputData.price}
                />
              </div>
              <div>
                <Label>Price Type</Label>
                <Select
                  onChange={(e) => changeColorHandler(e, 'priceType')}
                  value={colorInputData.priceType}
                >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                </Select>
              </div>
              <div>
                <Label>Available Stock</Label>
                <Input
                  type="number"
                  id="colorstock"
                  onChange={(e) => changeColorHandler(e, 'stock')}
                  value={colorInputData.stock}
                />
              </div>
            </div>
          }
          action={
            <Button variant="contained" color="success" onClick={addColorOnlyToArray}>
              Add
            </Button>
          }
        />
      );
    }
    return <></>;
  };

  return <>{renderComponent()}</>;
}

SpecificationDialogBox.propTypes = {
  specificationType: PropTypes.string,
  setValue: PropTypes.func,
  updateQuantity: PropTypes.func,
  specifications: PropTypes.object,
  setSpecifications: PropTypes.func,
};
