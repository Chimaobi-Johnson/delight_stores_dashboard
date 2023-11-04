import React, { useEffect, useState } from 'react';
import axios from 'axios';

// @mui
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
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
import { LoadingButton } from '@mui/lab';

import LocationItem from './components/LocationItems';

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


export default function SiteProductDetailsView() {

const [ inputData, setInputData] = useState({
    locationName: '',
    locationPrice: '',
    shippingInfo: ''
    })
    const [loading, setLoading] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [loadingShipping, setLoadingShipping] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [shippingLocations, setShippingLocations] = useState([])

  useEffect(() => {
    getShippingLocations()
  }, [])

  const getShippingLocations = async () => {
    setLoadingShipping(true)
    try {
        const result = await axios.get('/api/site-content')
        if(result.status === 200) {
            setLoadingShipping(false)
            setInputData((prevState) => ({
                ...prevState,
                shippingInfo: result.data.document.shippingInfo,
              }));
            setShippingLocations(result.data.document.shippingLocations)
        }
    } catch (error) {
        console.log(error)
        setLoadingShipping(false)
        setErrorMessage('Error loading shipping locations. Check connection or refresh page')
    }
  }



  const settings = useSettingsContext();

  const changeInputHandler = (e, type) => {
    setInputData((prevState) => ({
        ...prevState,
        [type]: e.target.value,
      }));
  }

  const addLocation = async () => {
    if(inputData.locationName === '' || inputData.locationPrice === '') {
        alert('Fields cannot be empty')
        return
    }
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')
    const data = {
        locationName: inputData.locationName,
        locationPrice: Number(inputData.locationPrice)
    }
    try {
        const result = await axios.post('/api/site-content/add/location', data)
        if(result.status === 200) {
            setLoading(false)
            setInputData((prevState) => ({
                ...prevState,
                locationName: '',
                locationPrice: ''
              }));
              getShippingLocations()
        }
    } catch (error) {
        setLoading(false)
        if(error.response.status === 409) {
            alert('Item already exist!')
        } else {
            alert('Error adding location. Check connection or try again later')
        }
        console.log(error.response)


    }
}

  const updateShippingInfo = async () => {
    if(inputData.shippingInfo === '') {
        alert('Shipping field cannot be empty')
        return
    }
    setLoadingUpdate(true)
    setSuccessMessage('')
    setErrorMessage('')
    const data = {
        data: inputData.shippingInfo
    }
    try {
        const result = await axios.post('/api/site-content/add/shipping', data)
        if(result.status === 200) {
            setLoadingUpdate(false)
            setInputData((prevState) => ({
                ...prevState,
                shippingInfo: ''
              }));
            setSuccessMessage('Shipping Info updated successfully')
        }
    } catch (error) {
        setLoadingUpdate(false)
        setErrorMessage('Error. Check connection settings')
        console.log(error)
    }


  }

  const renderAlert = () => {
    if(successMessage !== '') { 
        return (
            <Alert severity="success" sx={{ ml: 2, mr: 2, mb: 3 }}>
                {successMessage}
           </Alert>
        )
    }
    if(errorMessage !== '') {
        return (
            <Alert severity="error" sx={{ ml: 2, mr: 2, mb: 3 }}>
                {errorMessage}
           </Alert>
        )
    }
    return (<></>)
  }

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
        {renderAlert()}

        <Grid container pl={2} pr={2}>

          <Grid item xs={5}>
            <TextField required id="location-name" value={inputData.locationName} onChange={(e) => changeInputHandler(e, 'locationName')} label="Location" defaultValue="" />
          </Grid>
          <Grid item xs={5}>
            <TextField id="location-price" label="Price*" type="number" value={inputData.locationPrice} onChange={(e) => changeInputHandler(e, 'locationPrice')} />
          </Grid>
          <Grid item xs={2}>
            <LoadingButton loading={loading} variant='contained' onClick={addLocation}>Add</LoadingButton>
          </Grid>
          </Grid>

          {/* SHIPPING INFO */}
          <Grid container pl={2} pr={2} mt={10}>
          <Grid item xs={10}>
            <Textarea aria-label="Shipping information" onChange={(e) => changeInputHandler(e, 'shippingInfo')} value={inputData.shippingInfo} placeholder="Shipping information" />
            </Grid>
            <Grid item xs={2}>
              <LoadingButton loading={loadingUpdate} variant='contained' onClick={updateShippingInfo}>Update</LoadingButton>
           </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12}>
            {loadingShipping ? 'Loading shipping locations...' : <LocationItem shippingLocations={shippingLocations} />}
        </Grid>
      </Grid>
    </>
  );
}

// color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
// background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
// border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
// box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};