import axios from 'axios';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { Typography } from '@mui/material';

// components

import CustomPopover, { usePopover } from 'src/components/custom-popover';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import AddDiscountModal from './add-discount-modal';
import DiscountCard from './discountcard';

// ----------------------------------------------------------------------

export default function AddDiscountView() {
  const settings = useSettingsContext();

  const popover = usePopover();

  const quickEdit = useBoolean();

  const confirm = useBoolean();

  const [formEditing, setFormEditing] = useState(false);

  const addDiscountHandler = (type) => {
    if (type === 'new') {
      setFormEditing(false);
      quickEdit.onTrue();
    } else {
      setFormEditing(true);
      quickEdit.onTrue();
    }
  };

  const [ discounts, setDiscounts ] = useState([])
  
  const fetchDiscounts = async () => {
    try {
     const result = await axios.get('/api/discounts')
     if(result.status === 200) {
      setDiscounts(result.data.data)
      console.log(result)
     }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDiscounts()
  }, [])

  const renderDiscounts = () => {
    if(discounts.length !== 0) {
      return discounts.map((el, index) => (
        <DiscountCard key={index + el.title} data={el} fetchDiscounts={fetchDiscounts}  />
      ))
    }
    return(<><p>No discounts added</p></>)
  }

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Actions', href: paths.dashboard.actions.root },
            { name: 'Apply Discount to Product(s)' },
          ]}
          action={
            <Button
              component={RouterLink}
              href="#"
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => addDiscountHandler('new')}
            >
              New Discount
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Box
          sx={{ 
            mt: 5,
            width: 1,
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            *** If a product price is updated while a discount applied on it is active, then a new discount has to be created***
          </Typography>
          {renderDiscounts()}
        </Box>
      </Container>
      <AddDiscountModal
        editing={formEditing}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
    </>
  );
}
