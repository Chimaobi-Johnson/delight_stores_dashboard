import React, { useEffect, useState } from 'react';

// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


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

    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    
      const grey = {
        50: '#F3F6F9',
        100: '#E5EAF2',
        200: '#DAE2ED',
        300: '#C7D0DD',
        400: '#B0B8C4',
        500: '#9DA8B7',
        600: '#6B7A90',
        700: '#434D5B',
        800: '#303740',
        900: '#1C2025',
      };
    
      const Textarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px 12px 0 12px;
        color: ${theme.palette.mode === 'dark' ? '#d1cbcb' : grey[900]};
        background: ${theme.palette.mode === 'dark' ? '#161c24' : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    
        &:hover {
          border-color: '#ffffff';
        }
    
        &:focus {
          outline: 0;
          border-color: '#ffffff';
          box-shadow: 0 0 0 1px ${theme.palette.mode === 'dark' ? '#ffffff' : blue[200]};
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );


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
            <TextField id="location-price" label="Price*" type="number" value={0} />
          </Grid>
          <Grid item xs={2}>
            <Button>Add</Button>
          </Grid>
          </Grid>

          {/* SHIPPING INFO */}
          <Grid container pl={2} pr={2} mt={10}>
            <Textarea aria-label="Shipping information" placeholder="Shipping information" />
            
            <Button>Update</Button>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
            <LocationItem />
        </Grid>
      </Grid>
    </>
  );
}

// color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
// background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
// border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
// box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};