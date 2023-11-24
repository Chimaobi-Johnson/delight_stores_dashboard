import PropTypes from 'prop-types';

import React, { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Input, MenuItem, Select } from '@mui/material';
import Label from 'src/components/label/label';

import { ConfirmDialog } from 'src/components/custom-dialog';

const SizeListContainer = styled(Grid)({
    '> div > p': {
        display: 'none',
        position: 'absolute',
        width: '100%',
        backgroundColor: '#0000004a',
        color: '#ffabab', 
        top: '10%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        fontSize: '.7rem'
    },
    '> div': {
        position: 'relative',
        paddingLeft: '1rem',
        transition: 'all 1s',
        cursor: 'pointer'
    },
    '> div:hover': {
        backgroundColor: '#000000a6',
        '> p': {
            display: 'block'
        }
    }
  });
export default function SpecificationDetails({ specifications, updateSpecifications, updateQuantity }) {

    const [colorDialog, setColorDialog] = useState(false);
    const [colorInputData, setColorInputData] = useState({
        code: '',
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
    if (!colorInputData.code) {
      alert('Color code not selected');
      return
    }
    const sizesArr = specifications.sizes;
    sizesArr.map(el => el.label === currentSize ? el.colors.push(colorInputData) : '')
    updateSpecifications(sizesArr)
    setColorInputData((prevState) => ({
        ...prevState,
        code: '',
        label: '',
        priceType: '+',
        price: null,
        stock: 0,
    }))
    setColorDialog(false);

    console.log(sizesArr)
  };

  const deleteSizeHandler = (size) => {
    let totalQty = 0;
    const sizesArr = specifications.sizes;
    const newSizeArr = sizesArr.filter((item) => item.label !== size);
    // Update quantity
    for (let index = 0; index < newSizeArr.length; index+= 1) {
        totalQty += Number(newSizeArr[index].stock)       
        }
    updateQuantity(totalQty)
    updateSpecifications(newSizeArr)

  }

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
            <SizeListContainer container>
                {specifications.sizes !== 0 ? specifications.sizes.map(size => (
                    <Grid key={Math.random() * 5} container>
                        <p onClick={() => deleteSizeHandler(size.label)}>Click to delete</p>
                        <Grid sm={12}>
                            <p style={{border: '1px solid #eaeaea', width: 'fit-content', padding: '3px 8px'}}>{size.label}</p>
                        </Grid>
                        <Grid sm={12}>
                            <p style={{ fontSize: '.8rem', color: 'greenyellow', cursor: 'pointer' }} onClick={() => initAddColorDialog(size.label)}>add colors</p>
                            <ul>
                              {size.colors.length !== 0
                            ? size.colors.map((el) => (
                                <li key={Math.random() * 100}
                                style={{ display: 'flex', alignItems: 'center', fontSize: '.8rem', cursor: 'pointer' }}
                                >
                                    {el.label}:{' '}
                                    <span style={{ backgroundColor: el.code, width: '16px', height: '16px', marginLeft: '10px', marginRight: '5px', borderRadius: '100%', display: 'block' }} />
                                    <span style={{ fontSize: '.8rem' }}>{el.price ? ` ${el.priceType ? el.priceType : '+'} ${' '} ${el.price}` : 'free'}</span>

                                </li>
                                ))
                            : ''}
                            </ul>
                        </Grid>
                    </Grid>
                )) : ''}
            </SizeListContainer>
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
    updateQuantity: PropTypes.func
  };
  