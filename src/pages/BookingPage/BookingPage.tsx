import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { Grid, Paper, Button, Typography, Box } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { NavLink } from 'react-router-dom';


import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import PlaceList from '../../components/PlaceList/PlaceList';
import {  restaurantActions } from '../../features/places/restaurantSlice';
import {  attractionActions } from '../../features/places/attractionSlice';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { directionAction } from '../../features/directions/directionSlice';
import theme from '../../theme/theme';
import OriginCard from '../../components/OriginCard/OriginCard';

interface IActivity {
  name: string;
  location_id: string;
  address: string;
  phone?: string;
  photo?: {images:{medium: {url: string}}};
  latitude: number;
  longitude: number; 
  rating?: string; 
}

const BookingPage = () => {

  const dispatch = useAppDispatch();
  const { restaurants, attractions, selectedPlaces: {placesToVisit}, origin} = useAppSelector(state => state);

  
  const [activityAutocomplete, setActivityAutocomplete] = useState<any>(null);
  const [newActivity, setNewActivity] = useState<IActivity | null>(null);
  
  const activityOnLoad = (autoC: google.maps.places.Autocomplete) => setActivityAutocomplete(autoC); 


  const onActivityPlaceChanged = () => {
    if(activityAutocomplete === null) return;

      const activity = {
        name: activityAutocomplete.getPlace().name,
        location_id: ulid(),
        address: activityAutocomplete.getPlace().formatted_address,
        phone: activityAutocomplete.getPlace().formatted_phone_number,
        photo: {images: {medium:  {url: activityAutocomplete.getPlace().icon}}},
        latitude: activityAutocomplete.getPlace().geometry.location.lat(),
        longitude: activityAutocomplete.getPlace().geometry.location.lng(),
        rating: activityAutocomplete.getPlace().rating  

      }
      setNewActivity(activity)
     
  }

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
    
    dispatch(addPlaceAction.removePlace(id));

    if (place.category) {

      if (place.category.key === 'restaurant') {
        dispatch(restaurantActions.unselectRestaurants(place));
      }
  
      if (place.category.key === 'attraction') {        
        dispatch(attractionActions.unselectAttraction(place));
      }  
    }

  }

  const handleNewActivity = ( newActivity: IActivity) => {    
    dispatch(addPlaceAction.addPlace(newActivity));
    setNewActivity(null);
  }

  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async() => {
    const {details} = origin;
    const result = await DirectionsService.route({
    origin: Number(details.lat) + ',' + Number(details.lng),
    destination: Number(details.lat) + ',' + Number(details.lng),
    travelMode: window.google.maps.TravelMode.DRIVING,
    waypoints: placesToVisit?.map((place: any) => {
      return {
        location: Number(place.latitude) + ',' + Number(place.longitude),
        stopover: true
      }
    }), 
    optimizeWaypoints: true,
  }, (res: any, status: any) => {
    if (status === window.google.maps.DirectionsStatus.OK) {
     
      return res
    } else {
      console.error(`error fetching directions ${res}`);
    }
  })
  dispatch(directionAction.setRoutes(result))
}


  const handleOptimize = () => {
    calculateRoute();    
  }

  return (
    <>
      
      <div>
        <Box sx={{height: "2rem", width: "100%", backgroundColor: theme.palette.primary.variant}}>
          <img src="images/Helper-Text.png" alt="helper-text" style={{marginLeft: "10%"}}/>
        </Box>
        <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <img src="/images/Progress-1.png" alt="loading-bar" />
        </div>
        
        <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid item xs={6}>
            <div>
              <OriginCard {...origin} />
            </div>
            <Paper  sx={{width: "100%", height: "100vh"}}>
            <div>
              <Typography variant="h6" gutterBottom textAlign="start" margin="1rem">
                Search for Things to Do
              </Typography>
              <Box sx={{margin:"1rem"}}>
                <Activities 
                                  
                  handleNewActivity={handleNewActivity} 
                  onLoad={activityOnLoad}
                  onPlaceChanged={onActivityPlaceChanged}
                  newActivity={newActivity}
                  setNewActivity={setNewActivity}
                  Autocomplete={Autocomplete}
                  placeholder='Search restaurants, attractions, and more' 
                />

              </Box>
            </div>

              <Typography variant="h4" gutterBottom textAlign="start" margin="1rem">
                Places to Visit
              </Typography>

              <div>
                <PlaceList placesToVisit={placesToVisit} handleRemovePlace={handleRemovePlace} />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper sx={{width: "100%", height: "100vh"}}>
              <Places restaurants={restaurants.data}  attractions={attractions.data} handleSelectPlace={handleSelectPlace}  />
            </Paper>
          </Grid>
        </Grid>
      </div>

      { placesToVisit.length > 0 &&
      
        <Grid justifyContent="center" alignItems="center" width="100%" display="flex" >  
          <NavLink
          to="/optimizePage"
          >
            <Button 
            variant="contained"
            onClick={handleOptimize}
            >
              Optimize
              <NearMeIcon sx={{ml: 1}} />
            </Button>
          </NavLink>
        </Grid>
      }

    </>
  )
}

export default BookingPage