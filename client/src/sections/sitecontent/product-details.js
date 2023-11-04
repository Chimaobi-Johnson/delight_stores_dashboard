import React, { useEffect, useState } from 'react';

// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

// hooks
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import LocationItem from './components/LocationItems';

export default function SiteProductDetailsView() {
  const settings = useSettingsContext();

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Site Product Details"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Site Content', href: paths.dashboard.site.root },
            { name: 'Product Details' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
      </Container>
      <Grid container>
        <Grid item lg={6} xs={12}>
        <Grid container pl={2} pr={2}>

          <Grid item xs={5}>
            <TextField required id="location-name" value="" label="Location" defaultValue="" />
          </Grid>
          <Grid item xs={5}>
            <TextField id="location-price" label="Price" type="number" value={0} />
          </Grid>
          <Grid item xs={2}>
            <Button>Add</Button>
          </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
            <LocationItem />
        </Grid>
      </Grid>
    </>
  );
}
