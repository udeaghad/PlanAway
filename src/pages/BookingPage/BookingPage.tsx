import React, {useState, useEffect} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { Grid, Paper, Button } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { NavLink } from 'react-router-dom';


import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import LocationBar from '../../components/LocationBar/LocationBar';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getRestaurants, restaurantActions } from '../../features/places/restaurantSlice';
import { getAttractions, attractionActions } from '../../features/places/attractionSlice';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addOriginAction } from '../../features/origin/originSlice';
import { directionAction } from '../../features/directions/directionSlice';

interface IRecommendation {
  lat: string | null,
  lng: string | null,
  category: string
}

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


interface IDate {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}

const BookingPage = () => {
  const dispatch = useAppDispatch();
  const { restaurants, attractions, selectedPlaces: {placesToVisit}, origin} = useAppSelector(state => state);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [recommendation, setRecommendation] = useState<IRecommendation>({
    lat: null,
    lng: null,
    category: ''
  })
  const [activityAutocomplete, setActivityAutocomplete] = useState<any>(null);
  const [newActivity, setNewActivity] = useState<IActivity | null>(null);
  const [date, setDate] = useState<IDate>({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    numberOfDays: 1,
  });

  const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);
  const activityOnLoad = (autoC: google.maps.places.Autocomplete) => setActivityAutocomplete(autoC); 

  const calculateNoOfDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const totalNoDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const today = 1
    return totalNoDays + today;
  }
  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate({...date, [event.target.id]: event.target.value})    
    // setDate({...date, numberOfDays: calculateNoOfDays(date.startDate, date.endDate)})
 
  }
  
  useEffect(() => {
    dispatch(addOriginAction.addOriginDates(date)) 
    console.log(date)
  }, [date, dispatch])
  

  const onPlaceChanged = () => { 
    
    if(autocomplete === null) return;
    const lat = autocomplete?.getPlace().geometry?.location?.lat().toString();
    const lng = autocomplete?.getPlace().geometry?.location?.lng().toString();
    
    if(lat && lng){
      setRecommendation({...recommendation, lat: lat, lng: lng })                                                       
      
      dispatch(addOriginAction.addOriginDetails({
        name: autocomplete?.getPlace().name,
        address: autocomplete?.getPlace().formatted_address,
        photo: {images: {medium:  {url: autocomplete?.getPlace().icon}}},
        lat,
        lng,
      }))
    }

  };

  const handleDateSubmit = () => {
    setDate({...date, numberOfDays: calculateNoOfDays(date.startDate, date.endDate)})
  }

  const onActivityPlaceChanged = () => {
    if(autocomplete === null) return;

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
      <div style={{width: "100%"}}>
        <LocationBar 
          onLoad={onLoad} 
          onPlaceChanged={onPlaceChanged}  
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit}        
        />
      </div>

      <div>

        <Grid container spacing={2} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Grid item xs={6}>
            <Paper  sx={{width: "100%", height: "100vh"}}>
              <div>
                <Activities 
                                  
                  handleNewActivity={handleNewActivity} 
                  onLoad={activityOnLoad}
                  onPlaceChanged={onActivityPlaceChanged}
                  newActivity={newActivity}
                  setNewActivity={setNewActivity}
                  Autocomplete={Autocomplete}  
                />
              </div>

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