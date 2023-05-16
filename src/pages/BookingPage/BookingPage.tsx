import React from 'react';
import { Grid, Paper } from '@mui/material';
import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';

const BookingPage = () => {
  return (
    <>
      <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Grid item xs={6}>
          <Paper  sx={{width: "100%", height: "100vh"}}>
            <Activities />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{width: "100%", height: "100vh"}}>
            <Places />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default BookingPage