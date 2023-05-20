import React, {useState, useEffect} from 'react';
import { Grid, Paper } from '@mui/material';
import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import LocationBar from '../../components/LocationBar/LocationBar';
import { getPlaces, placeActions } from '../../features/places/placeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';

interface IRecommendation {
  lat: string | null,
  lng: string | null,
  category: string
}

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const {places: {data}, selectedPlaces: {placesToVisit}} = useAppSelector(state => state);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [recommendation, setRecommendation] = useState<IRecommendation>({
    lat: null,
    lng: null,
    category: 'restaurants'
  })


  const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);


  const onPlaceChanged = () => {    
    const lat = autocomplete?.getPlace().geometry?.location?.lat().toString();
    const lng = autocomplete?.getPlace().geometry?.location?.lng().toString();
    
    if(lat && lng){
      setRecommendation({...recommendation, lat: lat, lng: lng })                                                       
    }
  };

  useEffect(() => {
    
    if(recommendation.lat && recommendation.lng) {
      dispatch(getPlaces({lat:recommendation.lat, lng:recommendation.lng, category: recommendation.category}))
    }
  }, [recommendation, dispatch])

  const handleSelectPlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const place = data?.find(place => place.location_id === id);    
    dispatch(addPlaceAction.addPlace(place));
    dispatch(placeActions.selectPlace(id));
  }  

  const handleRemovePlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const place = placesToVisit?.find(place => place.location_id === id);
    dispatch(addPlaceAction.removePlace(id));
    dispatch(placeActions.unselectPlace(place));
  }

  return (
    <>
      <div>
        <LocationBar onLoad={onLoad} onPlaceChanged={onPlaceChanged}/>
      </div>
      <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Grid item xs={6}>
          <Paper  sx={{width: "100%", height: "100vh"}}>
            <Activities placesToVisit={placesToVisit} handleRemovePlace={handleRemovePlace} />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper sx={{width: "100%", height: "100vh"}}>
            <Places places={data} handleSelectPlace={handleSelectPlace}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default BookingPage