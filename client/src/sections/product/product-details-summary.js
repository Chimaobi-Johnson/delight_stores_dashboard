import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
// import Div_ider from '@mui/material/Div_ider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// utils
import { fShortenNumber, fCurrency } from 'src/utils/format-number';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
// FormProv_ider
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect } from 'src/components/hook-form';

//
import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();

  const {
    _id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    quantity,
    // newLabel,
    available,
    priceSale,
    saleLabel,
    subheading,
    // totalRatings,
    // totalReviews,
    inventoryType,
    description,
    // subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item._id).includes(_id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item._id === _id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    _id,
    name,
    coverUrl,
    available,
    price,
    colors: colors.length !== 0 ? colors[0].colorCode : '',
    size: sizes.length !== 0 ? sizes[0].sizeName : '',
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    // try {
    //   if (!existProduct) {
    //     onAddCart?.({
    //       ...data,
    //       colors: [values.colors],
    //       subTotal: data.price * data.quantity,
    //     });
    //   }
    //   onGotoStep?.(0);
    //   router.push(paths.product.checkout);
    // } catch (error) {
    //   console.error(error);
    // }
  });

  // const handleAddCart = useCallback(() => {
    // try {
    //   onAddCart?.({
    //     ...values,
    //     colors: [values.colors],
    //     subTotal: values.price * values.quantity,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  // }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {priceSale && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {fCurrency(priceSale)}
        </Box>
      )}

      {fCurrency(price)}
    </Box>
  );

  const renderShare = (
    <Stack direction="row" spacing={3} justifyContent="center">
      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="mingcute:add-line" w_idth={16} sx={{ mr: 1 }} />
        Compare
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:heart-bold" w_idth={16} sx={{ mr: 1 }} />
        Favorite
      </Link>

      <Link
        variant="subtitle2"
        sx={{
          color: 'text.secondary',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <Iconify icon="solar:share-bold" w_idth={16} sx={{ mr: 1 }} />
        Share
      </Link>
    </Stack>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Colors
      </Typography>

      {/* <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color)}
            limit={4}
          />
        )}
      />  */}
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxW_idth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={Math.random() * 10} value={size.sizeName}>
            {size.sizeName} - {size.sizePrice}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        {/* <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        /> */}

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography>
      </Stack>
    </Stack>
  );

  // const renderActions = (
  //   <Stack direction="row" spacing={2}>
  //     <Button
  //       fullW_idth
  //       disabled={isMaxQuantity || disabledActions}
  //       size="large"
  //       color="warning"
  //       variant="contained"
  //       startIcon={<Iconify icon="solar:cart-plus-bold" w_idth={24} />}
  //       onClick={handleAddCart}
  //       sx={{ whiteSpace: 'nowrap' }}
  //     >
  //       Add to Cart
  //     </Button>

  //     <Button fullW_idth size="large" type="submit" variant="contained" disabled={disabledActions}>
  //       Buy Now
  //     </Button>
  //   </Stack>
  // );

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subheading}
    </Typography>
  );

  // const renderRating = (
  //   <Stack
  //     direction="row"
  //     alignItems="center"
  //     sx={{
  //       color: 'text.disabled',
  //       typography: 'body2',
  //     }}
  //   >
  //     <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
  //     {`(${fShortenNumber(totalReviews)} reviews)`}
  //   </Stack>
  // );

  // const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
  //   <Stack direction="row" alignItems="center" spacing={1}>
  //     {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
  //     {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
  //   </Stack>
  // );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (inventoryType === 'out of stock' && 'error.main') ||
          (inventoryType === 'low stock' && 'warning.main') ||
          'success.main',
      }}
    >
      {inventoryType}
    </Box>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {/* {renderLabels} */}

          {renderInventoryType}

          <Typography variant="h5">{name}</Typography>

          {/* {renderRating} */}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        {/* <Div_ider sx={{ borderStyle: 'dashed' }} /> */}

        {renderColorOptions}

        {renderSizeOptions}

        {renderQuantity}

        {/* <Div_ider sx={{ borderStyle: 'dashed' }} /> */}

        {/* {renderActions} */}

        {renderShare}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  items: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
