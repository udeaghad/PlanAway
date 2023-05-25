import React, {useEffect,useState} from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api'
import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';

import OriginCard from '../../components/OriginCard/OriginCard';
import PlaceList from '../../components/PlaceList/PlaceList';
import { restaurantActions } from '../../features/places/restaurantSlice';
import { attractionActions } from '../../features/places/attractionSlice';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import MapSection from '../../components/MapSection/MapSection';

const OptimizePage = () => {
  const dispatch = useAppDispatch()
  const { origin, selectedPlaces: {placesToVisit}, directions: { route } } = useAppSelector(state => state);
   
   const [dailyGroups, setDailyGroups] = useState<any>(null)
   const [arrangedPlacesToVisit, setArrangedPlacesToVisit] = useState<any>(new Array(placesToVisit.length).fill(null))

   const [mapToDisplay, setMapToDisplay] = useState<any>(null)

  const [map, setMap] = useState<any>(null)

  
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
  
  useEffect(() => {
    if (route && route.routes[0].legs.length > 0) {    
      setArrangedPlacesToVisit(route.routes[0].waypoint_order.map((index: number) => placesToVisit[index]))
    }
  }, [route, placesToVisit]);

  useEffect(() => {
    
    if (arrangedPlacesToVisit[0]) { 
    
    const averageActivityPerDay = Math.ceil(arrangedPlacesToVisit.length / origin.numberOfDays);
    
        const Groups = [];
        for(let i = 0; i < arrangedPlacesToVisit.length; i += averageActivityPerDay) {
          Groups.push(arrangedPlacesToVisit.slice(i, i + averageActivityPerDay));
        }
        setDailyGroups(Groups)
      }
    
  }, [arrangedPlacesToVisit, origin.numberOfDays, route])

  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async(index:number) => {
    const {details} = origin;
  const result = await DirectionsService.route({
    origin: Number(details.lat) + ',' + Number(details.lng),
    destination: Number(details.lat) + ',' + Number(details.lng),
    travelMode: window.google.maps.TravelMode.DRIVING,
    waypoints: dailyGroups[index]?.map((place: any) => {
      return {
        location: Number(place.latitude) + ',' + Number(place.longitude),
        stopover: true
      }
    }), 
    
  }, (res: any, status: any) => {
    if (status === window.google.maps.DirectionsStatus.OK) {
     
      return res
    } else {
      console.error(`error fetching directions ${res}`);
    }
  })
  setMapToDisplay(result)
}


  const handleShowMap = (index: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    calculateRoute(index)
  }

  
  return (
    <div style={{marginTop: "4rem"}}>
      <Grid container>
        <Grid item md={5} >

          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <OriginCard origin={origin} />
          </Box>

          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>
              Places to Visit
            </Typography>
          </Box>


          { dailyGroups && dailyGroups.map((group: any, index: number) => {

            return (
            <Box key={index} sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
              <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>
                Day {index + 1}
              </Typography>

              <PlaceList placesToVisit={group} handleRemovePlace={handleRemovePlace}/>
              <div>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="small"
                  onClick={handleShowMap(index)}
                >
                  View map
                </Button>
              </div>


            </Box>
          )})}
        </Grid>

        <Grid item md={7}>
          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>
              map
            </Typography>
          </Box>
          
          <Box>
            <MapSection 
              // isLoaded={isLoaded}
              origin={origin}
              GoogleMap={GoogleMap}
              Marker={Marker}
              DirectionsRenderer={DirectionsRenderer}
              setMap={setMap} 
              placesToVisit={placesToVisit} 
              directions={mapToDisplay}
              map={map}
             
            />
          </Box>
        
        </Grid>
      </Grid>
    </div>
  )
}

export default OptimizePage