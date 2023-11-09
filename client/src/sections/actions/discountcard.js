import PropTypes from 'prop-types';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { LoadingButton } from '@mui/lab';
import { ConfirmDialog } from 'src/components/custom-dialog';

import axios from 'axios';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useState } from 'react';



export default function DiscountCard(props) {

    const confirm = useBoolean();

    const { data, fetchDiscounts } = props;

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [currentId, setCurrentId] = useState(null)

    console.log(data)

    const renderType = () => {
        if(data.type === 'single') {
            return 'Discount on single product'
        }
        if(data.type === 'category') {
            return `Discount on "${data.productCategory}" category`
        }
        return 'Discount on all products'
    }

    // DATE FORMATTING
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dateFrom = new Date(data.dateFrom).toLocaleDateString("en-GB", options)
    const dateTo = new Date(data.dateTo).toLocaleDateString("en-GB", options)

    const updateDiscountStatus = async (id) => {
        try {
            const result = await axios.post(`/api/discount/status?id=${id}`)
            if(result.status === 200) {
                fetchDiscounts()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const initDeleteHandler = (id) => {
        setCurrentId(id)
        confirm.onTrue();
    }

    const deleteDiscount = async () => {
        setLoadingDelete(true)
        try {
            const result = await axios.post(`/api/discount/delete?id=${currentId}`)
            if(result.status === 200) {
                setLoadingDelete(false)
                confirm.onFalse()
                fetchDiscounts()
            }
        } catch (error) {
            console.log(error)
            setLoadingDelete(false)
            alert('Error. Check connection or try again later.')
        }
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
        },
      }}
    >
      <Paper square={false} sx={{ p: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Type: {renderType()}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Percentage: {data.percentage}
                </Typography>
                
                <Grid container>
                   <Grid item xs={6}>
                   <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                   Starts: {dateFrom}
                </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                   Ends: {dateTo}
                </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                   <Grid item xs={6}>
                     <LoadingButton variant="outlined" onClick={(id) => updateDiscountStatus(data._id)}>{data.active ? 'Deactivate' : 'Activate'}</LoadingButton>
                     <LoadingButton sx={{ ml: 2 }} variant='outlined' color='error' onClick={() => initDeleteHandler(data._id)}>Delete</LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, float: 'right' }} color="text.secondary" gutterBottom>
                    Status: <Typography component="span" color={data.active ? "#1de9b6" : "#e57373"}>{data.active ? 'active' : 'Deactivated'}</Typography>
                </Typography>
            </Grid>
        </Grid>
      </Paper>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete this discount?"
        action={
          <LoadingButton
            loading={loadingDelete}
            variant="contained"
            type='submit'
            onClick={() => deleteDiscount()}
            color="error"
          >
            Delete
          </LoadingButton>
        }
      />
    </Box>
  );
}

DiscountCard.propTypes = {
    data: PropTypes.array, 
    fetchDiscounts: PropTypes.func,
}