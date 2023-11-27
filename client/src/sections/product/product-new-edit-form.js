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
import SpecificationDetails from './view/specification-details';
import SpecificationDialogBox from './view/specification-dialog';

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  // const confirm = useBoolean();

  // const popover = usePopover();

  const mdUp = useResponsive('up', 'md');

  // const { enqueueSnackbar } = useSnackbar();

  // const [includeTaxes, setIncludeTaxes] = useState(false);

  const [sizeInputData, setSizeInputData] = useState({
    label: '',
    price: 0,
    stock: 0,
    priceType: '+',
    colors: [],
  });
  const [colorsArray, setColorsArray] = useState([]);
  const [sizesArray, setSizesArray] = useState([]);
  const [publish, setPublish] = useState(true);

  const [specifications, setSpecifications] = useState({
    type: '',
    colors: [],
    sizes: [],
  });

  console.log(specifications)

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
      published: currentProduct?.name || true,
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
      setColorsArray(currentProduct.colors);
      setSizesArray(currentProduct.sizes);
    }
  }, [currentProduct, defaultValues, reset]);

  const [categories, setCategories] = useState(null);
  const [resData, setResData] = useState(null);

  const updateSpecifications = (array) => {
    setSpecifications((prevState) => ({
      ...prevState,
      sizes: array,
    }));
  };

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

  const updateQuantity = (val) => {
    setValue('quantity', val);
  };

  // ADD SIZE LOGIC

  const addSizeToArray = () => {
    let totalQty = 0;
    const sizesArr = [...specifications.sizes];
    sizesArr.push(sizeInputData);
    setSpecifications((prevState) => ({
      ...prevState,
      type: values.specificationType,
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
        setColorsArray([]);
        setSizesArray([]);
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

              <RHFSelect native name="category" label="Category" InputLabelProps={{ shrink: true }}>
                {categories
                  ? categories.map((category) => (
                      <option key={Math.random() * 120} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  : 'No categories found. Please refresh page'}
              </RHFSelect>

              <div>
                <RHFSelect
                  native
                  name="specifications"
                  label="Specifications"
                  InputLabelProps={{ shrink: true }}
                >
                  <option value="" />
                  <option value="add-specs">Add Specifications</option>
                  <option value="no-specs">Non available</option>
                </RHFSelect>

              </div>

              <div>
                <RHFTextField
                  name="quantity"
                  label="Quantity"
                  placeholder="0"
                  disabled={values.specifications !== 'no-specs'}
                  type="number"
                  InputLabelProps={{ shrink: true }}
                />

              </div>

              {values.specifications === 'add-specs' ? (
                <>
                  <RHFSelect
                    native
                    name="specificationType"
                    label="Specification Type"
                    InputLabelProps={{ shrink: true }}
                  >
                    <option value="" />
                    <option value="add-size-and-color">Add Size and color</option>
                    <option value="add-sizes-only">Add Sizes only</option>
                    <option value="add-colors-only">Add Colors only</option>
                  </RHFSelect>
                  <SpecificationDetails
                    specifications={specifications}
                    updateSpecifications={updateSpecifications}
                    updateQuantity={updateQuantity}
                  />
                </>
              ) : (
                ''
              )}

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
    setPublish(e.target.checked);
  };

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


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {/* {sizeDialogFunc()} */}
      <SpecificationDialogBox
        setValue={setValue}
        updateQuantity={updateQuantity}
        specificationType={values.specificationType}
        specifications={specifications}
        setSpecifications={setSpecifications}
      />
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
