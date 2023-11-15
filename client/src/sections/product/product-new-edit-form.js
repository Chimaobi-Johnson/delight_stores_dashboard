import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';

// routes
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
} from 'src/_mock';
// components
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
import axios from 'axios';
// import { Button } from '@mui/base';
import { set } from 'lodash';
import { convertCloudinaryImagetoId } from 'src/utils/customFunctions';
import { Input, MenuItem, Select } from '@mui/material';
import Label from 'src/components/label/label';

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  console.log(currentProduct);

  // const confirm = useBoolean();

  // const popover = usePopover();

  const mdUp = useResponsive('up', 'md');

  // const { enqueueSnackbar } = useSnackbar();

  // const [includeTaxes, setIncludeTaxes] = useState(false);

  const [colorDialog, setColorDialog] = useState(false);
  const [sizeDialog, setSizeDialog] = useState(false);
  const [colorInputData, setColorInputData] = useState({
    colorCode: '',
    colorName: '',
    colorPriceType: '+',
    colorPrice: null,
    colorStock: 0
  });
  const [sizeInputData, setSizeInputData] = useState({
    sizeName: '',
    sizePrice: null,
    sizeStock: 0
  });
  const [colorsArray, setColorsArray] = useState([]);
  const [sizesArray, setSizesArray] = useState([]);
  const [publish, setPublish] = useState(true)
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1, 'Images is required'),
    tags: Yup.array().min(2, 'Must have at least 2 tags'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    description: Yup.string().required('Description is required'),
    // not required
    taxes: Yup.number(),
    newLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
    saleLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subheading: currentProduct?.subheading || '',
      images: currentProduct?.imagesUrl || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || '',
      category: currentProduct?.category || '',
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      deliveryStatus: currentProduct?.deliveryStatus || 'ready',
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
      published: currentProduct?.name || true
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
      setColorsArray(currentProduct.colors)
      setSizesArray(currentProduct.sizes)

    }
  }, [currentProduct, defaultValues, reset]);

  const [categories, setCategories] = useState(null);
  const [resData, setResData] = useState(null);

  useEffect(() => {
    const getCategories = () => {
      axios
        .get('/api/categories')
        .then((data) => {
          setCategories(data.data.categories);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCategories();
  }, []);


  const onSubmit = handleSubmit(async (data) => {
    const crudType = currentProduct ? `update/?id=${currentProduct._id}` : 'add';
    console.log(defaultValues);
    setResData(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('subheading', data.subheading);
    formData.append('description', data.description);
    formData.append('code', data.code);
    formData.append('category', data.category);
    formData.append('colors', JSON.stringify(colorsArray));
    formData.append('gender', JSON.stringify(data.gender));
    formData.append('quantity', data.quantity);
    formData.append('priceSale', data.priceSale);
    formData.append('sku', data.sku);
    formData.append('publish', publish);
    formData.append('deliveryStatus', data.deliveryStatus);
    formData.append('newLabel', JSON.stringify(data.newLabel));
    formData.append('saleLabel', JSON.stringify(data.saleLabel));
    formData.append('tags', JSON.stringify(data.tags));
    formData.append('sizes', JSON.stringify(sizesArray));

    if (currentProduct) {
      formData.append('imagesId', data.imagesId);
    }

    for (let i = 0; i < data.images.length; i += 1) {
      formData.append('images', data.images[i]);
    }
    try {
      const result = await axios.post(`/api/product/${crudType}`, formData);
      if (result.status === 201 || result.status === 200) {
        reset();
        setColorsArray([])
        setSizesArray([])
        window.scrollTo(0, 0);
        setResData({
          type: 'info',
          title: `Product - ${result.data.product.name} ${
            currentProduct ? 'updated' : 'created'
          } successfully`,
        });
        if (currentProduct) {
          // enqueueSnackbar('Update success!');
          router.push(`${paths.dashboard.products.root}?status=success`);
        }
        console.log(result);
      }
    } catch (error) {
      window.scrollTo(0, 0);
      setResData({
        type: 'error',
        title: 'Server error. check connection or try again later',
      });
      console.log(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  // const handleRemoveFile = () => {
  //   if(currentProduct) {
  //     confirm.onTrue();
  //  }
  // }

  const [currentImage, setCurrentImage] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const closeConfirmDialog = () => {
    setConfirmDialog(false);
  };

  const deleteImageHandler = () => {
    const imageId = convertCloudinaryImagetoId(currentImage);
    axios
      .post('/api/product/image/delete', {
        cloudinaryId: imageId,
        cloudinaryUrl: currentImage,
        productId: currentProduct._id,
      })
      .then((res) => {
        if (res.status === 200) {
          closeConfirmDialog();
          alert('Image deleted successfully');
          const filtered = values.images && values.images?.filter((file) => file !== currentImage);
          setValue('images', filtered);
        }
      })
      .catch((err) => {
        closeConfirmDialog();
        console.log(err);
        alert('Error deleting image. Check connection or try again later');
      });
  };

  const handleRemoveFile = useCallback(
    (inputFile) => {
      if (currentProduct) {
        setConfirmDialog(true);
        setCurrentImage(inputFile);
      } else {
        const filtered = values.images && values.images?.filter((file) => file !== inputFile);
        setValue('images', filtered);
      }
    },
    [setValue, currentProduct, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  // const handleChangeIncludeTaxes = useCallback((event) => {
  //   setIncludeTaxes(event.target.checked);
  // }, []);

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        {resData ? (
          <Alert severity={resData.type} sx={{ mb: 3 }}>
            {resData.title}
          </Alert>
        ) : null}
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="name" label="Product Name" />

            <RHFTextField name="subheading" label="Sub Description" multiline rows={4} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images (Max 6)</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );
  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="code" label="Product Code" />

              <RHFTextField name="sku" label="Product SKU" />

              <RHFTextField
                name="quantity"
                label="Quantity"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              />

              <RHFSelect native name="category" label="Category" InputLabelProps={{ shrink: true }}>
                {categories
                  ? categories.map((category) => (
                      <option key={Math.random() * 120} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  : 'No categories found. Please refresh page'}
              </RHFSelect>

              {/* <RHFMultiSelect
                checkbox
                name="colors"
                label="Colors"
                options={PRODUCT_COLOR_NAME_OPTIONS}
              /> */}
              <div>
                <Button onClick={() => setColorDialog(true)} variant="outlined">
                  Add color
                </Button>
                <div>
                  <ul>
                    {colorsArray.length !== 0
                      ? colorsArray.map((el) => (
                          <li key={Math.random() * 100}
                          style={{ display: 'flex', alignItems: 'center', fontSize: '.8rem', cursor: 'pointer' }}
                            onClick={() => removeColorFromArray(el.colorCode)}
                          >
                            {el.colorName}:{' '}
                            <span style={{ backgroundColor: el.colorCode, width: '16px', height: '16px', marginLeft: '10px', marginRight: '5px', borderRadius: '100%', display: 'block' }} />
                            <span style={{ fontSize: '.8rem' }}>{el.colorPrice ? ` ${el.colorPriceType ? el.colorPriceType : '+'} ${' '} ${el.colorPrice}` : 'free'}</span>
                          </li>
                        ))
                      : ''}
                  </ul>
                </div>
              </div>

              <div>
                <div>
                  <Button onClick={() => setSizeDialog(true)} variant="outlined">
                    Add size
                  </Button>
                </div>

                <div>
                  <ul>
                    {sizesArray.length !== 0
                      ? sizesArray.map((el) => (
                          <li key={Math.random() * 100}
                          style={{ display: 'flex', alignItems: 'center', fontSize: '.8rem', cursor: 'pointer' }}
                            onClick={() => removeSizeFromArray(el.sizeName)}
                          >
                            {el.sizeName}:{' '}
                            <span style={{ fontSize: '.8rem', marginLeft: '10px' }}>{el.sizePrice ? el.sizePrice : ''}</span>
                          </li>
                        ))
                      : ''}
                  </ul>
                </div>
              </div>
        
              <RHFSelect
                native
                name="deliveryStatus"
                label="Delivery Status"
                InputLabelProps={{ shrink: true }}
              >
                <option value="ready">Ready</option>
                <option value="pick-up">Pick up only</option>
              </RHFSelect>
            </Box>

            <RHFAutocomplete
              name="tags"
              label="Tags"
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <RHFMultiCheckbox row name="gender" spacing={2} options={PRODUCT_GENDER_OPTIONS} />
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="saleLabel.content"
                label="Sale Label"
                fullWidth
                disabled={!values.saleLabel.enabled}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="newLabel.content"
                label="New Label"
                fullWidth
                disabled={!values.newLabel.enabled}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderPricing = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Pricing
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Price related inputs
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Pricing" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField
              name="price"
              label="Regular Price"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      N
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="priceSale"
              label="Sale Price"
              disabled
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      N
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* <FormControlLabel
              control={<Switch checked={includeTaxes} onChange={handleChangeIncludeTaxes} />}
              label="Price includes taxes"
            /> */}
            {/* 
            {!includeTaxes && (
              <RHFTextField
                name="taxes"
                label="Tax (%)"
                placeholder="0.00"
                type="number"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        %
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            )} */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const changePublishMethod = (e) => {
    setPublish(e.target.checked)
  }

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          onChange={changePublishMethod}
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          onClick={onSubmit}
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {!currentProduct ? 'Create Product' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );


  // ADD COLOR LOGIC

  const changeColorHandler = (e, inputData) => {
    setColorInputData({
      ...colorInputData,
      [inputData]: e.target.value,
    });
  };

  const addColorToArray = () => {
    if(!colorInputData.colorCode) {
      alert('Color code not selected')
      return
    }
    const colorsArr = [...colorsArray];
    colorsArr.push(colorInputData);
    setColorsArray(colorsArr);
    setColorDialog(false);
    setColorInputData([])
  };

  const removeColorFromArray = (colorCode) => {
    const colorsArr = [...colorsArray];
    const newColorsArr = colorsArr.filter(item => item.colorCode !== colorCode)
    setColorsArray(newColorsArr)
  }


  const colorDialogFunc = (
    <ConfirmDialog
      open={colorDialog}
      onClose={() => setColorDialog(false)}
      title="Add Color"
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
              onChange={(e) => changeColorHandler(e, 'colorName')}
              value={colorInputData.colorName}
            />
          </div>

          <div>
            <Label>Price Addition/Subtraction</Label>
            <Input
              type="number"
              id="colorprice"
              onChange={(e) => changeColorHandler(e, 'colorPrice')}
              value={colorInputData.colorPrice}
            />
          </div>
          <div>
            <Label>Price Type</Label>
            <Select
              onChange={(e) => changeColorHandler(e, 'colorPriceType')}
              value={colorInputData.colorPriceType}
            >
              <MenuItem value='+'>+</MenuItem>
              <MenuItem value='-'>-</MenuItem>
            </Select>
          </div>
          <div>
            <Label>Available Stock</Label>
            <Input
              type="number"
              id="colorstock"
              onChange={(e) => changeColorHandler(e, 'colorStock')}
              value={colorInputData.colorStock}
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

  
  // ADD SIZE LOGIC

  
  const addSizeToArray = () => {
    const sizesArr = [...sizesArray];
    sizesArr.push(sizeInputData);
    setSizesArray(sizesArr);
    setSizeDialog(false);
    setSizeInputData([]);
  };

  const removeSizeFromArray = (sizeName) => {
    const sizesArr = [...sizesArray];
    const newSizesArr = sizesArr.filter(item => item.sizeName !== sizeName)
    setSizesArray(newSizesArr)
  }


  const changeSizeHandler = (e, inputData) => {
    setSizeInputData({
      ...sizeInputData,
      [inputData]: e.target.value,
    });
  };

  const sizeDialogFunc = (
    <ConfirmDialog
      open={sizeDialog}
      onClose={() => setSizeDialog(false)}
      title="Add Size (e.g MD, LG, 1litre, 2litre)"
      content={
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Label>Size Label</Label>
            <Input
              type="text"
              id="sizename"
              onChange={(e) => changeSizeHandler(e, 'sizeName')}
              value={sizeInputData.sizeName}
            />
          </div>
          <div>
            <Label>Size Price</Label>
            <Input
              type="number"
              id="sizePrice"
              onChange={(e) => changeSizeHandler(e, 'sizePrice')}
              value={sizeInputData.sizePrice}
            />
          </div>
          <div>
            <Label>Available Stock</Label>
            <Input
              type="number"
              id="sizeStock"
              onChange={(e) => changeSizeHandler(e, 'sizeStock')}
              value={sizeInputData.sizeStock}
            />
          </div>
        </div>
      }
      action={
        <Button variant="contained" color="success" onClick={addSizeToArray}>
          Add
        </Button>
      }
    />
  );


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {colorDialogFunc}
      {sizeDialogFunc}
      <ConfirmDialog
        open={confirmDialog}
        onClose={closeConfirmDialog}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={deleteImageHandler}>
            Delete
          </Button>
        }
      />
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderPricing}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
