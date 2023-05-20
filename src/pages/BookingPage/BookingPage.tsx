import React, {useState, useEffect} from 'react';
import { Grid, Paper } from '@mui/material';
import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import LocationBar from '../../components/LocationBar/LocationBar';
import { getRestaurants, restaurantActions } from '../../features/places/restaurantSlice';
import { getAttractions, attractionActions } from '../../features/places/attractionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';

interface IRecommendation {
  lat: string | null,
  lng: string | null,
  category: string
}

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const {restaurants, attractions, selectedPlaces: {placesToVisit}} = useAppSelector(state => state);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [recommendation, setRecommendation] = useState<IRecommendation>({
    lat: null,
    lng: null,
    category: ''
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
      dispatch(getRestaurants({lat:recommendation.lat, lng:recommendation.lng, category: 'restaurants'}))
      dispatch(getAttractions({lat:recommendation.lat, lng:recommendation.lng, category: 'attractions'}))
    }
  }, [recommendation.lat, recommendation.lng, dispatch, recommendation.category])

  const handleSelectPlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const restaurant = restaurants.data?.find(place => place.location_id === id);  
    const attraction = attractions.data?.find(place => place.location_id === id);  
    
    if (restaurant) {
      dispatch(addPlaceAction.addPlace(restaurant));
      dispatch(restaurantActions.selectRestaurants(id));
    }

    if (attraction) {
      dispatch(addPlaceAction.addPlace(attraction));
      dispatch(attractionActions.selectAttraction(id));
    }
  } 

  const handleRemovePlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const place = placesToVisit?.find(place => place.location_id === id);
    console.log(place.category.key);
    if (place.category.key === 'restaurant') {
      dispatch(addPlaceAction.removePlace(id));
      dispatch(restaurantActions.unselectRestaurants(place));
    }

    if (place.category.key === 'attraction') {
      dispatch(addPlaceAction.removePlace(id));
      dispatch(attractionActions.unselectAttraction(place));
    }  
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
            <Places restaurants={restaurants.data}  attractions={attractions.data} handleSelectPlace={handleSelectPlace}  />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default BookingPage