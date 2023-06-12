import React, {useEffect,useState} from 'react';
import { Grid, Box, Typography, Paper, Stack, InputBase, Card, CardContent } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { DragDropContext, Droppable, DroppableProvided, Draggable } from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Remove';


import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import OriginCard from '../../components/OriginCard/OriginCard';
import MapSection from '../../components/MapSection/MapSection';
import PlacesForVisit from '../../components/PlacesForVisit/PlacesForVisit';
import theme from '../../theme/theme';
import SuggestedResultAccordion from '../../components/Accordion/SuggestedResultAccordion';
import {StyledViewMapButton, StyledOriginCard} from './Style';
import JumpButton from '../../components/JumpButton/JumpButton';
import { optimizedPlacesAction } from '../../features/optimizedPlaces/optimizedPlaceSlice';
import SaveItineraryPopButton from '../../components/SaveItineraryPopup/SaveItineraryPopButton';
import AddMoreActivitiesCard from '../../components/AddMoreActivities/AddMoreActivitiesCard'


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
    order: number;

  }[]
}

const OptimizePage = () => {
  
  const { origin, selectedPlaces: {placesToVisit}, directions: { route } } = useAppSelector(state => state);
   const dispatch = useAppDispatch();
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
    
  }
  
  useEffect(() => {
    if (route && route.routes[0].legs.length > 0) {    
      
      const places = route.routes[0].waypoint_order.map((index: number) => placesToVisit[index])
      const placesWithIndex = places.map((place: any, index: number) => ({...place, order: index}))
      setArrangedPlacesToVisit(placesWithIndex)
      
    }
  }, [route, placesToVisit]);


  useEffect(() => {
    
       
    if (arrangedPlacesToVisit[0]){

      const averageActivityPerDay = Math.ceil(arrangedPlacesToVisit.length / origin.numberOfDays);
      
      let groups: IActivity[] = [...Array(origin.numberOfDays)].map(() => ({id: ulid(), items: []}));
    
      const groupsRecursion = (grps: IActivity[], inputs: any[],  days: number) => {
        for (let i = 0; i < days; i++) {
          grps[i].items = [...grps[i].items, inputs[i]].filter(item => item !== undefined)
        }
        inputs.splice(0, days)
      }
    
      for(let i = 0; i < averageActivityPerDay; i++) {
        groupsRecursion(groups, arrangedPlacesToVisit, origin.numberOfDays)
      }
      
    
      for(let i = 0; i < groups.length; i++) {
        for(let j = i+1; j < groups.length; j++) {
          for(let k = 0; k < groups[i].items.length; k++){
            for(let l=0; l < Math.min(groups[i].items.length, groups[j].items.length ); l++){
              
                if(groups[i].items[k].order > groups[j].items[l].order){
                  [groups[i].items[k], groups[j].items[l]] = [groups[j].items[l], groups[i].items[k]]
                }
              
            }
          }
        }
      } 
         
    
    const sortedLastSubArrayOfGroups = [
      ...groups.slice(0, groups.length-1), 
      {
        ...groups[groups.length-1], 
        items: groups[groups.length-1].items.sort((a,b) => a.order - b.order)
      }
    ]
    setDailyGroups(sortedLastSubArrayOfGroups)
    
    };
    
  }, [arrangedPlacesToVisit, origin.numberOfDays, route])

  useEffect(() => {
    dispatch(optimizedPlacesAction.addOptimizedPlaces(dailyGroups))
  }, [dailyGroups, dispatch])


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
          rating: activityAutocomplete.getPlace().rating,
          order: 0,  
        }]

      }
      setNewActivity( activity)
     
  }
  
  return (
    <div>
      {/* <Box sx={{height: "2rem", width: "100%", backgroundColor: theme.palette.primary.variant}}>
        <img src="images/Helper-Text-2.png" alt="helper-text" style={{marginLeft: "10%"}}/>
      </Box> */}

      {/* <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", mt: "0.5rem"}}>
        <img src="/images/Progress-3.png" alt="loading-bar" />
      </Box> */}

      <DragDropContext onDragEnd={handleDragAndDrop}>
        {/* <Box> */}
          {/* <Box> */}

            <StyledOriginCard>
              <OriginCard {...origin} />

              <SaveItineraryPopButton />
              
            </StyledOriginCard>

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
          {/* </Box> */}

          {/* <Box> */}
            <Box>
              <AddMoreActivitiesCard 
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              newActivity={newActivity}
              setNewActivity={setNewActivity}
              Autocomplete={Autocomplete}
              />
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
          
          {/* </Box> */}
        {/* </Box> */}
      </DragDropContext>
    </div>
  )
}

export default OptimizePage
