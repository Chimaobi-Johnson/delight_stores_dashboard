import PropTypes from 'prop-types';
import dayjs from 'dayjs';
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
  const [productType, setProductType] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQueries, setProductQueries] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(false);


  const [inputData, setInputData] = useState({
    title: '',
    percentage: null,
    dateFrom: null,
    dateTo: null,
  });

  const fetchProducts = (value) => {
    axios
      .get('/api/products')
      .then((res) => {
        const result = res.data.products.filter(
          (product) =>
            value && product && product.name && product.name.toLowerCase().includes(value)
        ); // filter products only when user types on input
        setProductQueries(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchCategories = () => {
      axios
        .get('/api/categories')
        .then((res) => {
          if (res.status === 200) {
            setCategories(res.data.categories);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (productType === 'category') {
      fetchCategories();
    }
  }, [productType]);

  const changeProductType = (e) => {
    setProductType(e.target.value);
    setSelectedProductId(null);
    setSelectedCategory(null);
  };

  const changeProductCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const changeProductHandler = (e) => {
    setSelectedProduct(e.target.value);
    fetchProducts(e.target.value);
  };

  const addProductasValue = (name, id) => {
    setSelectedProduct(name);
    setSelectedProductId(id);
    setProductQueries(null);
  };

  const changeInputDataHandler = (e, type) => {
    setInputData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const setDateHandler = (value, type) => {
    setInputData((prevState) => ({
        ...prevState,
        [type]: new Date(value)
      }));
  }

  const renderProductsQuery = () => {
    if (productType === 'single') {
      return (
        <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
          <TextField
            id="outlined-search"
            value={selectedProduct}
            onChange={changeProductHandler}
            label="Search field"
            type="search"
          />
          <ul>
            {productQueries
              ? productQueries.map((el, index) => (
                  <li
                    style={{ fontSize: '.8rem', cursor: 'pointer' }}
                    key={index}
                    onClick={() => addProductasValue(el.name, el._id)}
                  >
                    {el.name}
                  </li>
                ))
              : ''}
          </ul>
          <FormHelperText>Select product you want to apply a discount on</FormHelperText>
        </FormControl>
      );
    }

    return <></>;
  };

  const renderProductCategories = () => {
    if (categories !== null && productType === 'category') {
      return (
        <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Product Categories</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedCategory}
            label="Product Categories"
            onChange={changeProductCategory}
          >
            {categories.map((el, i) => (
              <MenuItem key={i} value={el._id}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Which category of products do you want to apply discounts on?
          </FormHelperText>
        </FormControl>
      );
    }
    return <></>;
  };

  const renderDiscountForm = () => {
    if (
      productType === 'all' ||
      selectedCategory !== null ||
      (productType === 'single' && selectedProductId !== null)
    ) {
      return (
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
              value={inputData.title}
              onChange={(e) => changeInputDataHandler(e, 'title')}
              label="Discount Title"
              defaultValue=""
            />
            <TextField
              id="outlined-number"
              label="Percentage (0 - 100)"
              type="number"
              value={inputData.percentage}
              onChange={(e) => changeInputDataHandler(e, 'percentage')}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="e.g 10% dicount of N2000 is leaves the price at N1800"
            />
            <div style={{ overflow: 'hidden', width: 'fit-content' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={inputData.dateFrom}
                    onChange={(value) => setDateHandler(value, 'dateFrom')}
                    label="Runs From"
                  />
                  <DatePicker
                    value={inputData.dateTo}
                    onChange={(value) => setDateHandler(value, 'dateTo')}
                    label="End date"
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </div>
        </Box>
      );
    }
    return <></>;
  };

  const submitDiscountForm = () => {
    if(!inputData.title || !inputData.percentage || !inputData.dateFrom || !inputData.dateTo) {
        alert('Please fill in all fields')
        return
    }
    if(inputData.percentage > 100 || inputData.percentage < 0) {
        alert('Percentage value must be between 0 and 100')
        return
    }

    setLoading(true)
    const formData = new FormData()

    formData.append('product', productType)
    formData.append('productCategory', selectedCategory)
    formData.append('selectedProductId', selectedProductId)
    formData.append('title', inputData.title)
    formData.append('percentage', inputData.percentage)
    formData.append('dateFrom', JSON.stringify(inputData.dateFrom))
    formData.append('dateTo', JSON.stringify(inputData.dateTo))

    axios.post('/api/discount/apply', formData).then(res => {
        if(res.status === 200) {
            console.log(res)
        }
    }).catch(err => {
        console.log(err)
    })



  }


  console.log(inputData)

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
      <DialogTitle>Apply Discount</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={5} lg={4}>
            <FormControl sx={{ m: 1, mt: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={productType}
                label="Product"
                onChange={changeProductType}
              >
                <MenuItem value="" />
                <MenuItem value="all">All Products</MenuItem>
                <MenuItem value="category">Select by Category</MenuItem>
                <MenuItem value="single">Select Single Product</MenuItem>
              </Select>
              <FormHelperText>Which products do you want to apply discounts on?</FormHelperText>
            </FormControl>
            {renderProductCategories()}
            {renderProductsQuery()}
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            {renderDiscountForm()}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <LoadingButton type="submit" onClick={submitDiscountForm} variant="contained" loading={loading}>
          Activate Discount
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
