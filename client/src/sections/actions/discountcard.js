import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';


export default function DiscountCard() {
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
                    First Discount
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Type: Discount on all products
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Percentage: 12
                </Typography>
                
                <Grid container>
                   <Grid item xs={6}>
                   <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                   Starts: 23/01/2024
                </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                   Ends: 29/01/2024
                </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                   <Grid item xs={6}>
                     <LoadingButton variant="outlined">Deactivate</LoadingButton>
                     <LoadingButton sx={{ ml: 2 }} variant='outlined' color='error'>Delete</LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Typography sx={{ fontSize: 14, float: 'right' }} color="text.secondary" gutterBottom>
                    Status: <Typography component="span" color="#1de9b6">active</Typography>
                </Typography>
            </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}