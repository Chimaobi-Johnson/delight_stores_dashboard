import PropTypes from 'prop-types';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { fData } from 'src/utils/format-number';
import { styled } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddDiscountModal({ editing, open, onClose }) {
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <DialogTitle>Add/Edit Discount</DialogTitle>

      <DialogContent>
        {/* <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          component="form"
          mt={2}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        > */}
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={5} lg={4}>
              <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={10}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value="" />
                  <MenuItem value="all">All Products</MenuItem>
                  <MenuItem value="category">Select by Category</MenuItem>
                  <MenuItem value="single">Select Single Product</MenuItem>
                </Select>
                <FormHelperText>Which products do you want to apply discounts on?</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={10}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value="" />
                  <MenuItem value="all">All Products</MenuItem>
                  <MenuItem value="category">Select by Category</MenuItem>
                  <MenuItem value="single">Select Single Product</MenuItem>
                </Select>
                <FormHelperText>Which category of products do you want to apply discounts on?</FormHelperText>
              </FormControl>
              <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={10}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value="" />
                  <MenuItem value="all">All Products</MenuItem>
                  <MenuItem value="category">Select by Category</MenuItem>
                  <MenuItem value="single">Select Single Product</MenuItem>
                </Select>
                <FormHelperText>Select product you want to apply a discount on</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Discount Title"
                    defaultValue=""
                  />
                  <TextField
                    id="outlined-number"
                    label="Percentage (0 - 100)"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder='e.g 10% dicount of N2000 is leaves the price at N1800'
                  />
                  <div style={{ overflow: 'hidden', width: 'fit-content'}}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Runs From" />
                      <DatePicker label="End date" />
                    </DemoContainer>
                  </LocalizationProvider>
                  </div>
     
                  {/* <TextField id="outlined-search" label="Search field" type="search" /> */}
                </div>
              </Box>
            </Grid>
          </Grid>
        {/* </Box> */}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" variant="contained">
          Add
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

const imageStyles = {
  width: '200px',
  height: '170px',
  marginRight: '2rem',
  marginBottom: '2rem',
  marginTop: '2rem',
};

AddDiscountModal.propTypes = {
  //   category: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  editing: PropTypes.bool,
};
