import React, {useEffect,useState} from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";

import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import OriginCard from '../../components/OriginCard/OriginCard';
import { restaurantActions } from '../../features/places/restaurantSlice';
import { attractionActions } from '../../features/places/attractionSlice';
// import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import MapSection from '../../components/MapSection/MapSection';
import PlacesForVisit from '../../components/PlacesForVisit/PlacesForVisit';

const OptimizePage = () => {
  const dispatch = useAppDispatch()
  const { origin, selectedPlaces: {placesToVisit}, directions: { route } } = useAppSelector(state => state);
   
   const [dailyGroups, setDailyGroups] = useState<any>(null)
   const [arrangedPlacesToVisit, setArrangedPlacesToVisit] = useState<any>(new Array(placesToVisit.length).fill(null))

   const [mapToDisplay, setMapToDisplay] = useState<any>(null)

  const [map, setMap] = useState<any>(null)

  
  const handleRemovePlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const groupPlace = dailyGroups.find((group: any) => group.items.find((item: any) => item.location_id === id));
    
    if (!groupPlace) return;
    
    const groupItemIndexInGroup = groupPlace.items.findIndex((item: any) => item.location_id === id);
    const groupIndex = dailyGroups.findIndex((group: any) => group.items.find((item: any) => item.location_id === id));
    
    const newDailyGroups = [...dailyGroups];
    newDailyGroups[groupIndex].items.splice(groupItemIndexInGroup, 1);
    setDailyGroups(newDailyGroups);
    
    
    // const place = placesToVisit?.find(place => place.location_id === id);    

    // if (!place) return;
    
    
    // if (place.category) {
      
    //   if (place.category.key === 'restaurant') {
    //     dispatch(restaurantActions.unselectRestaurants(place));
    //   }
      
    //   if (place.category.key === 'attraction') {        
    //     dispatch(attractionActions.unselectAttraction(place));
    //   }  
    // }

    
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
          Groups.push({id: ulid(), items: arrangedPlacesToVisit.slice(i, i + averageActivityPerDay)});
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
    waypoints: dailyGroups[index].items?.map((place: any) => {
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

  const handleDragAndDrop = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if ( source.droppableId === destination.droppableId && 
      source.index === destination.index) return;

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const groupSourceIndex = dailyGroups.findIndex((group: any) => group.id === source.droppableId);

    const groupDestinationIndex = dailyGroups.findIndex((group: any) => group.id === destination.droppableId);

    const newSourceItems = [...dailyGroups[groupSourceIndex].items];
    
    const newDestinationItems = 
      source.droppableId !== destination.droppableId
      ? [...dailyGroups[groupDestinationIndex].items]
      : newSourceItems;

    const [removedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, removedItem);

    const newDailyGroups = [...dailyGroups];

    newDailyGroups[groupSourceIndex] = {
      ...dailyGroups[groupSourceIndex],
      items: newSourceItems
    };

    newDailyGroups[groupDestinationIndex] = {
      ...dailyGroups[groupDestinationIndex],
      items: newDestinationItems
    };

    setDailyGroups(newDailyGroups);

    
  }
  
  return (
    <div style={{marginTop: "4rem"}}>
      <Grid container>
        <Grid item md={5} >

          <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
            <OriginCard origin={origin} />
          </Box>

          <DragDropContext onDragEnd={handleDragAndDrop}>

            <Box sx={{p: 1, backgroundColor: "#b3b3b3", border: "1px #b3b3b3 solid", borderRadius: 2}}>
              <Typography variant="h5" component="div" sx={{color: "white", textAlign: "center"}}>
                Places to Visit
              </Typography>
            </Box>

            <Droppable droppableId="ROOT" type="group">
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>

                  { dailyGroups && dailyGroups.map((group: any, index: number) => {
      
                    return (
                   
                      <div key={group.id} style={{marginBottom: "1rem"}}>

                        <Typography variant="h5" component="div" sx={{color: "black", textAlign: "center"}}>
                          Day {index + 1}
                        </Typography>

                        <div style={{overflow: "auto", height: "40vh"}}>
                          <PlacesForVisit {...group}  handleRemovePlace={handleRemovePlace} />

                        </div>

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

                      </div>
                  
                  )})}
                  {provided.placeholder}
                </div>
              )}

                
            </Droppable>



          </DragDropContext>

          
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