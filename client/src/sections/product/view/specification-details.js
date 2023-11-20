import PropTypes from 'prop-types';

import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Input, MenuItem, Select } from '@mui/material';
import Label from 'src/components/label/label';

import { ConfirmDialog } from 'src/components/custom-dialog';

export default function SpecificationDetails({ specifications, updateSpecifications }) {
    console.log(specifications)

    const [colorDialog, setColorDialog] = useState(false);
    const [colorInputData, setColorInputData] = useState({
        label: '',
        priceType: '+',
        price: null,
        stock: 0,
      });

      const [currentSize, setCurrentSize] = useState(null)

      const changeColorHandler = (e, inputData) => {
        setColorInputData({
          ...colorInputData,
          [inputData]: e.target.value,
        });
      };

    const initAddColorDialog = (label) => {
    setColorDialog(true)
    setCurrentSize(label)
}
  const addColorToArray = () => {
    if (!colorInputData.colorCode) {
      alert('Color code not selected');
      return
    }
    const sizesArr = specifications.sizes;
    sizesArr.map(el => el.label === currentSize ? el.colors.push(colorInputData) : '')
    console.log(sizesArr)
    updateSpecifications(sizesArr)
    setColorInputData((prevState) => ({
        ...prevState,
        label: '',
        priceType: '+',
        price: null,
        stock: 0,
    }))
    setColorDialog(false);

    console.log(sizesArr)
  };

    const colorDialogFunc = (
        <ConfirmDialog
          open={colorDialog}
          onClose={() => setColorDialog(false)}
          title={`Add Colors to ${currentSize}`}
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>
                <Label>Color Picker</Label>
                <Input
                  style={{ width: '20%' }}
                  type="color"
                  onChange={(e) => changeColorHandler(e, 'colorCode')}
                  id="favcolor"
                  value={colorInputData.colorCode}
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
            <Button variant="contained" color="success" onClick={addColorToArray}>
              Add
            </Button>
          }
        />
      );



    const renderSpecifications = () => {
        if(specifications.type === 'colors-only') {
            return (
                <>
                </>
            )
        }
        return (
            <Grid container>
                {specifications.sizes !== 0 ? specifications.sizes.map(size => (
                    <Grid container>
                        <Grid sm={6}>
                            <p>{size.label}</p>
                        </Grid>
                        <Grid sm={6}>
                            <p onClick={() => initAddColorDialog(size.label)}>add colors to {size.label}</p>
                            <ul>
                              {size.colors.length !== 0
                            ? size.colors.map((el) => (
                                <li key={Math.random() * 100}
                                style={{ display: 'flex', alignItems: 'center', fontSize: '.8rem', cursor: 'pointer' }}
                                >
                                    {el.colorName}:{' '}
                                    <span style={{ backgroundColor: el.code, width: '16px', height: '16px', marginLeft: '10px', marginRight: '5px', borderRadius: '100%', display: 'block' }} />
                                    <span style={{ fontSize: '.8rem' }}>{el.price ? ` ${el.priceType ? el.priceType : '+'} ${' '} ${el.price}` : 'free'}</span>
                                </li>
                                ))
                            : ''}
                            </ul>
                        </Grid>
                    </Grid>
                )) : ''}
            </Grid>
        )
    }

    return (
        <div>
            {renderSpecifications()}
            {colorDialogFunc}
        </div>
    )
}

SpecificationDetails.propTypes = {
    specifications: PropTypes.object,
    updateSpecifications: PropTypes.func,
  };
  