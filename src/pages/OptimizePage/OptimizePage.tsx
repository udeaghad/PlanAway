import React, {useEffect,useState} from 'react';
import { Grid, Box, Typography, Button, Paper, Stack, InputBase, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { DragDropContext, Droppable, DroppableProvided, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import OriginCard from '../../components/OriginCard/OriginCard';
import { restaurantActions } from '../../features/places/restaurantSlice';
import { attractionActions } from '../../features/places/attractionSlice';
// import { addPlaceAction } from '../../features/selectedPlaces/selectedPlaceSlice';
import MapSection from '../../components/MapSection/MapSection';
import PlacesForVisit from '../../components/PlacesForVisit/PlacesForVisit';
import theme from '../../theme/theme';
import SuggestedResultAccordion from '../../components/Accordion/SuggestedResultAccordion';
import {StyledSaveItineraryButton, StyledViewMapButton, StyledRemoveButton} from './Style';
import JumpButton from '../../components/JumpButton/JumpButton';
import Activities from '../../components/Activities/Activities';
import RemoveIcon from '@mui/icons-material/Remove';
import { optimizedPlacesAction } from '../../features/optimizedPlaces/optimizedPlaceSlice';
import SaveItineraryPopButton from '../../components/SaveItineraryPopup/SaveItineraryPopButton';


interface IActivity {
  id: string;
  items: {
    name: string;
    location_id: string;
    address: string;
    phone?: string;
    photo?: {images:{medium: {url: string}}};
    latitude: number;
    longitude: number; 
    rating?: string; 

  }[]
}

const OptimizePage = () => {
  const dispatch = useAppDispatch()
  const { origin, selectedPlaces: {placesToVisit}, directions: { route }, optimizedPlaces } = useAppSelector(state => state);
   
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

    if (source.droppableId === "ADD-ACTIVITY") {
      
      const itemSourceIndex = source.index;
      
      const itemDestinationIndex = destination.index;
     
      const groupSourceIndex = dailyGroups.findIndex((group: any) => group.id === source.droppableId);
      
      const groupDestinationIndex = dailyGroups.findIndex((group: any) => group.id === destination.droppableId);
      
      let newSourceItems 
      
      if(!newActivity) return;
      newSourceItems =  [...newActivity.items]
    
      const newDestinationItems = 
      source.droppableId !== destination.droppableId
      ? [...dailyGroups[groupDestinationIndex].items]
      : newSourceItems;

    const [removedItem] = newSourceItems.splice(itemSourceIndex, 1);
   
    newDestinationItems.splice(itemDestinationIndex, 0, removedItem);
    
    const newDailyGroups = [...dailyGroups];

    newDailyGroups[groupDestinationIndex] = {
      ...dailyGroups[groupDestinationIndex],
      items: newDestinationItems
    };
   
    setDailyGroups(newDailyGroups);
    setNewActivity(null)
    return;
  }

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

  const [activityAutocomplete, setActivityAutocomplete] = useState<any>(null);
  const [newActivity, setNewActivity] = useState<IActivity | null>(null);

  const onLoad = (autoC: google.maps.places.Autocomplete) => setActivityAutocomplete(autoC); 
  
  const onPlaceChanged = () => {
    if(activityAutocomplete === null) return;

      const activity = {
        id: ulid(),
        items: [{ 
          name: activityAutocomplete.getPlace().name,
          location_id: ulid(),
          address: activityAutocomplete.getPlace().formatted_address,
          phone: activityAutocomplete.getPlace().formatted_phone_number,
          photo: {images: {medium:  {url: activityAutocomplete.getPlace().icon}}},
          latitude: activityAutocomplete.getPlace().geometry.location.lat(),
          longitude: activityAutocomplete.getPlace().geometry.location.lng(),
          rating: activityAutocomplete.getPlace().rating  
        }]

      }
      setNewActivity( activity)
     
  }

 useEffect(() => {
  console.log(dailyGroups)
  }, [dailyGroups])
  
  return (
    <div style={{marginTop: "4rem"}}>
      <Box sx={{height: "2rem", width: "100%", backgroundColor: theme.palette.primary.variant}}>
        <img src="images/Helper-Text-2.png" alt="helper-text" style={{marginLeft: "10%"}}/>
      </Box>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <SuggestedResultAccordion />
      </Box>

      <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: "0.5rem"}}>
        <img src="/images/Progress-3.png" alt="loading-bar" />
      </Box>

      <DragDropContext onDragEnd={handleDragAndDrop}>
        <Grid container>
          <Grid item laptop={6} sx={{paddingLeft: "5%"}} >

            <Paper  elevation={3} sx={{width: "95%", marginBottom: "2rem", marginTop: "2rem", p: "1rem"}}>
              <OriginCard {...origin} />

              <SaveItineraryPopButton />
              
            </Paper>

            <div style={{marginBottom: "1rem"}}>
              { dailyGroups && 
                <JumpButton dailyGroups={dailyGroups} />
              }
            </div>

            <Droppable droppableId="ROOT" type="group">
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} >

                  { dailyGroups && dailyGroups.map((group: any, index: number) => {
      
                    return (
                  
                      <div key={group.id} style={{marginBottom: "1rem"}} id={`${group.id}`}>

                        <Stack 
                          justifyContent="space-between" 
                          alignItems="center" 
                          direction="row" 
                          sx={{
                            backgroundColor: theme.palette.primary.variant, 
                            p: "0.25rem 2rem 0.25rem 2rem", 
                            mr: "1rem"
                            }}
                        >
                          <Typography variant="h6" component="div" sx={{color: "black"}}>
                            Day {index + 1}
                          </Typography>

                          <div>
                            <StyledViewMapButton 
                              onClick={handleShowMap(index)}
                              
                            >
                              <Typography variant="h6" component="div" sx={{fontWeight: "bolder"}}>
                                View on Map
                              </Typography>
                            </StyledViewMapButton>
                          </div>

                        </Stack>


                        <div style={{overflow: "auto", height: "20vh", width: "98%"}}>
                          <PlacesForVisit {...group}  handleRemovePlace={handleRemovePlace} />

                        </div>
                      </div>
                  
                  )})}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Grid>

          <Grid item laptop={6}>
            
            <Box sx={{mt: "2rem"}}>
              <Typography variant="h6" component="div" sx={{mb: "1rem"}}>
                Add More Activities
              </Typography>
              <Stack spacing={2} direction="row" sx={{border: "2px black solid", borderRadius: 99, padding: "0.5rem", mb:"1rem"}} width={"90%"}>
                  <div>
                    <SearchIcon sx={{color: "gray", marginTop: "0.3rem"}}/>
                  </div>
                  <div style={{width: "100%"}}>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                      <InputBase type="search" placeholder="Search restaurants, attractions and more" sx={{width: "95%"}}/>
                    </Autocomplete>
                  </div>
                                        
              </Stack>

              {newActivity && 
                <Droppable droppableId="ADD-ACTIVITY">
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} style={{height: "15vh", marginBottom: "1rem"}}>

                    {newActivity.items.length > 0 && newActivity.items.map((item: any, index: number) => {
                    
                    return (
                      <div> 
                      <Draggable draggableId={item.location_id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Grid container spacing={2} sx={{display: "flex", justifyContent: "baseline", alignItems: "center"}}>
                              <Grid item laptop={10} >
                                <Card sx={{width: "95%", mt: "0.5rem", px: "0.5rem" }} >                        
                                  <CardContent>
                                    <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                                      <Typography  variant="body1" component="div">
                                        {item.name}
                                      </Typography>

                                      {item.address && <Typography variant="caption">
                                        <span style={{fontWeight: "bold"}}>Address:</span> {" "} {item.address}
                                      </Typography>}
                                    </Box>
                                  </CardContent> 
                                </Card>
                              </Grid>
                              <Grid item laptop={2}>
                                <Box>
                                  <StyledRemoveButton 
                                    aria-label="remove"
                                    onClick={() => setNewActivity(null)}
                                  >
                                    <RemoveIcon fontSize="small"/>
                                  </StyledRemoveButton>
                                </Box>
                              </Grid>
                            </Grid>
 
                          </div>
                        
                        )}
                      </Draggable>
                      </div>
                        
                        ) })}
                    {provided.placeholder}
                  </div>
                )}
                </Droppable>
          
              }
              
            </Box>
            
            <Box sx={{width: "100%"}}>
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
      </DragDropContext>
    </div>
  )
}

export default OptimizePage