import React, {useState} from 'react';
import { Grid, Paper } from '@mui/material';
import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import LocationBar from '../../components/LocationBar/LocationBar';

const BookingPage = () => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);


  const onPlaceChanged = () => {
    // return  autocomplete?.getPlace().geometry?.location?.lat();
    console.log('lng', autocomplete?.getPlace());
    
  };
  
  return (
    <>
      <div>
        <LocationBar onLoad={onLoad} onPlaceChanged={onPlaceChanged}/>
      </div>
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