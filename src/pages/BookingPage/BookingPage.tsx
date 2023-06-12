import React, {useState, useRef,useEffect} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { Paper, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

import Places from '../../components/Places/Places';
import Activities from '../../components/Activities/Activities';
import PlaceList from '../../components/PlaceList/PlaceList';
import PlaceListMobile from '../../components/PlaceList/PlaceListMobile';
import {  restaurantActions } from '../../features/places/restaurantSlice';
import {  attractionActions } from '../../features/places/attractionSlice';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { directionAction } from '../../features/directions/directionSlice';
// import theme from '../../theme/theme';
import OriginCard from '../../components/OriginCard/OriginCard';
import 
  {
    StyledAddedActivityContainer, 
    StyledOptimizeButton, 
    StyledHelperTextContainer, 
    StyledMobileBreadcrumbContainer, 
    StyledOriginBoxContainer,
    StyledSearchBoxContainer,
    StyledSuggestionsContainer,
    StyledMobileSuggestionsContainer,
    StyledLaptopActivity,
    StyledMobileActivity } from './style';
import PlacesWithCarousel from '../../components/Places/PlacesWithCarousel';


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
interface IPlaces {
  restaurants: null | {
    name: string;  
    location_id: string; 
    address: string; 
    distance_string?: string;
    phone: string;
    website?: string;
    rating?: number;
    cuisine?: {key: string; name: string};
    photo?: string;
    
  }[];
  attractions: null | {
    name: string;
    address: string;
    location_id: string;
    distance_string?: string;
    phone: string;
    website?: string;
    rating?: string;
    photo?: string;
    subcategory?: {key: string; name: string}[];

  }[];
}

const BookingPage = () => {

  const dispatch = useAppDispatch();
  const { restaurants, attractions, selectedPlaces: {placesToVisit}, origin} = useAppSelector(state => state);

  
  const [activityAutocomplete, setActivityAutocomplete] = useState<any>(null);
  const [newActivity, setNewActivity] = useState<IActivity | null>(null);

  const [alignment, setAlignment] = useState(() => ['restaurants']);

  const [filter, setFilter] = useState<string>('')
  const [filteredRestaurants, setFilteredRestaurant] = useState<IPlaces["restaurants"]>(null)
  const [filteredAttractions, setFilteredAttraction] = useState<IPlaces["attractions"]>(null)

  const restaurantCarousel = useRef<HTMLDivElement>(null);
  const attractionCarousel = useRef<HTMLDivElement>(null);

  const [restaurantCarouselWidth, setRestaurantCarouselWidth] = useState<number>(0)
  const [attractionCarouselWidth, setAttractionCarouselWidth] = useState<number>(0)

  const [restaurantScrollWidth, setRestaurantScrollWidth] = useState(0)
  const [attractionScrollWidth, setAttractionScrollWidth] = useState(0)
  
  const activityOnLoad = (autoC: google.maps.places.Autocomplete) => setActivityAutocomplete(autoC); 

  useEffect(() => {
    
    if (!restaurants.data || !attractions.data) return
    if (!filter) {
      setFilteredRestaurant(restaurants.data)
      setFilteredAttraction(attractions.data)
      return
    }

    const restaurantsFiltered = restaurants.data?.filter((restaurant: any) => Number(restaurant.rating) > Number(filter))
    const attractionsFiltered = attractions.data?.filter((attraction: any) => Number(attraction.rating) > Number(filter))

    setFilteredRestaurant(restaurantsFiltered)
    setFilteredAttraction(attractionsFiltered)    
  }, [filter, restaurants, attractions])

  const handleFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
   };

  // const handleToggle = (event: React.MouseEvent<HTMLElement>,  newAlignment: string[] ) => {
  //   if (newAlignment?.length) {
  //     setAlignment(newAlignment);
      
  //   }
  // };

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
      // setRestaurantScrollWidth(restaurantScrollWidth - 257);
    }

    if (attraction) {
      dispatch(addPlaceAction.addPlace(attraction));
      dispatch(attractionActions.selectAttraction(id));
      // setAttractionScrollWidth(attractionScrollWidth - 257);
    }
  } 

  const handleRemovePlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const place = placesToVisit?.find(place => place.location_id === id);
    
    dispatch(addPlaceAction.removePlace(id));

    if (place.category) {

      if (place.category.key === 'restaurant') {
        dispatch(restaurantActions.unselectRestaurants(id));
        // setRestaurantScrollWidth(restaurantScrollWidth + 257);
      }
  
      if (place.category.key === 'attraction') {        
        dispatch(attractionActions.unselectAttraction(id));
        // setAttractionScrollWidth(attractionScrollWidth + 257);
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

  

  useEffect(() => {
    if (!restaurantCarousel.current && !attractionCarousel.current) return

    if (!filteredAttractions && !filteredRestaurants) return

    if (restaurantCarousel.current) {
      
      const getRestaurantScrollWidth = restaurantCarousel.current.scrollWidth - restaurantCarousel.current.offsetWidth

      if(getRestaurantScrollWidth > 0){
        setRestaurantCarouselWidth(getRestaurantScrollWidth)
        setRestaurantScrollWidth(getRestaurantScrollWidth)
      }
    }
    
  }, [filteredAttractions, filteredRestaurants, restaurantCarousel, attractionCarousel])

  const handleToggle = (event: React.MouseEvent<HTMLElement>,  newAlignment: string[] ) => {
    if (newAlignment?.length) {
      setAlignment(newAlignment);
    }    
  };

  const attractionRef = useRef<HTMLDivElement>(null);
  const restaurantRef = useRef<HTMLDivElement>(null);

  const showAttractions = () => {
    if (attractionRef.current && restaurantRef.current) {
      attractionRef.current.style.display = "block";
      restaurantRef.current.style.display = "none";
    }

    if(attractionCarousel.current){ 
      
      const getAttractionScrollWidth = attractionCarousel.current.scrollWidth - attractionCarousel.current.offsetWidth
      
      if(attractionScrollWidth === 0){
        
        setAttractionScrollWidth(getAttractionScrollWidth)
        setAttractionCarouselWidth(getAttractionScrollWidth)
      }
      
    //   setAttractionCarouselWidth(attractionScrollWidth)
    }    
  }

  const showRestaurants = () => {
    if (attractionRef.current && restaurantRef.current) {
      attractionRef.current.style.display = "none";
      restaurantRef.current.style.display = "block";
    }

    if(restaurantCarousel.current){
      
      setRestaurantCarouselWidth(restaurantScrollWidth)
    }
  }



  return (
    <>
      
      <div>
        <StyledHelperTextContainer >
          <img src="images/Helper-Text.png" alt="helper-text" style={{marginLeft: "10%"}}/>
        </StyledHelperTextContainer>

        <StyledMobileBreadcrumbContainer>
          <NavLink
          to="/"
          
          >
            <Typography variant="body2" component="div">
              Home
            </Typography>
          </NavLink>

          <Box>
            <Typography variant="body2" component="div">
              {'>'}              
            </Typography>
          </Box>
          <NavLink
          to="/Booking"
          >
            <Typography variant="body2" component="div">
              Add Activities
            </Typography>
          </NavLink>
        </StyledMobileBreadcrumbContainer>
        
        <Box width="100%">
          <Box width="100%">
            <StyledOriginBoxContainer>
              <Paper  elevation={3} sx={{width: "90%"}}>
                <OriginCard {...origin}  />

                { placesToVisit.length > 0 &&
                  <Box sx={{margin: "1rem"}}>
                    <NavLink
                    to="/Optimize"
                    >
                      <StyledOptimizeButton                     
                      onClick={handleOptimize}
                      >
                        <Typography variant="button" sx={{padding: "0.15rem 0.5rem 0.15rem 0.5rem"}}>
                          OPTIMIZE MY ITINERARY
                        </Typography>
                      
                      </StyledOptimizeButton>
                    </NavLink>
                  </Box> 
                }
              </Paper>
            </StyledOriginBoxContainer>
            
            <StyledSearchBoxContainer>
              <Typography variant="h6" component="div" marginTop={2} marginLeft={2}>
                Search for Things to Do
              </Typography>
              <Box>
                <Activities 
                                  
                  handleNewActivity={handleNewActivity} 
                  onLoad={activityOnLoad}
                  onPlaceChanged={onActivityPlaceChanged}
                  newActivity={newActivity}
                  setNewActivity={setNewActivity}
                  Autocomplete={Autocomplete}
                  placeholder='Search local activities' 
                />

              </Box>
            </StyledSearchBoxContainer >

            <StyledAddedActivityContainer>

              <StyledLaptopActivity>
                { placesToVisit.length > 0 &&
                  <div style={{width: "75%", marginBottom: "2rem"}}>
                    <PlaceList placesToVisit={placesToVisit} handleRemovePlace={handleRemovePlace} />                  
                  </div>
                }
              </StyledLaptopActivity>

              <StyledMobileActivity>
                <PlaceListMobile placesToVisit={placesToVisit} handleRemovePlace={handleRemovePlace} />
              </StyledMobileActivity>
              
            </StyledAddedActivityContainer>
            
          </Box>

          <Box>

            <StyledSuggestionsContainer>
              <Places 
              restaurants={filteredRestaurants} 
              attractions={filteredAttractions}
              filter={filter}
              handleSelectPlace={handleSelectPlace}  
              alignment={alignment}
              handleToggle={handleToggle}
              attractionRef={attractionRef}
              restaurantRef={restaurantRef}
              showAttractions={showAttractions}
              showRestaurants={showRestaurants}
              handleFilter={handleFilter}
              />
            </StyledSuggestionsContainer>

            <StyledMobileSuggestionsContainer>
            <PlacesWithCarousel 
              restaurants={filteredRestaurants} 
              attractions={filteredAttractions}
              filter={filter}
              handleSelectPlace={handleSelectPlace}  
              alignment={alignment}
              handleToggle={handleToggle}
              attractionRef={attractionRef}
              restaurantRef={restaurantRef}
              showAttractions={showAttractions}
              showRestaurants={showRestaurants}
              handleFilter={handleFilter}
              restaurantCarousel={restaurantCarousel}
              attractionCarousel={attractionCarousel}
              restaurantCarouselWidth={restaurantCarouselWidth}
              attractionCarouselWidth={attractionCarouselWidth}
              />
            </StyledMobileSuggestionsContainer>
            
            
          </Box>
        </Box>
      </div>      

    </>
  )
}

export default BookingPage
