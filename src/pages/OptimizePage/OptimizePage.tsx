import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';

import OriginCard from '../../components/OriginCard/OriginCard';
import PlaceList from '../../components/PlaceList/PlaceList';
import { restaurantActions } from '../../features/places/restaurantSlice';
import { attractionActions } from '../../features/places/attractionSlice';
import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import MapSection from '../../components/MapSection/MapSection';

const OptimizePage = () => {
  const dispatch = useAppDispatch()
  const { origin, selectedPlaces: {placesToVisit} } = useAppSelector(state => state);

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

          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <PlaceList placesToVisit={placesToVisit} handleRemovePlace={handleRemovePlace}/>
          </Box>

        </Grid>

        <Grid item md={7}>
          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>
              map
            </Typography>
          </Box>

          <Box>
            <MapSection />
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default OptimizePage