import PropTypes from 'prop-types';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';


export default function DiscountCard(props) {

    const { data, fetchDiscounts } = props;

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
                    Type: 
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
                     <LoadingButton sx={{ ml: 2 }} variant='outlined' color='error'>Delete</LoadingButton>
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
    </Box>
  );
}

DiscountCard.propTypes = {
    data: PropTypes.array, 
    fetchDiscounts: PropTypes.func,
}