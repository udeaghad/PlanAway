import React, {useEffect,useState} from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { ulid } from 'ulid';
import { DragDropContext, Droppable, DroppableProvided} from "react-beautiful-dnd";
import { Autocomplete } from '@react-google-maps/api';
import UpgradeIcon from '@mui/icons-material/Upgrade';

import { useAppSelector, useAppDispatch } from '../../hooks/storeHooks';
import OriginCard from '../../components/OriginCard/OriginCard';
import MapSection from '../../components/MapSection/MapSection';
import PlacesForVisit from '../../components/PlacesForVisit/PlacesForVisit';
import theme from '../../theme/theme';
import useCalculateRoute from '../../hooks/calculateRoute';

import {
  StyledOriginCard, 
  StyledMobileMap, 
  StyledAddActivityCard, 
  StyledMap,
  StyledContainer,
  StyledOriginActivityContainer,
  StyledDragDropText,
  StyledDragDropContainer,
  StyledDesktopMap,
  StyledViewMapButton,
  StyledViewMapBtnUpTab,
  StyledTopButton,
  StyledActivityAndMapCont,
  StyledJumpCont,
  StyledSavedTripText
  
} from './Style';
import { optimizedPlacesAction } from '../../features/optimizedPlaces/optimizedPlaceSlice';
import SaveItineraryPopButton from '../../components/SaveItineraryPopup/SaveItineraryPopButton';
import AddMoreActivitiesCard from '../../components/AddMoreActivities/AddMoreActivitiesCard'
import MapForMobile from '../../components/MapSection/MapForMobile';
import JumpButtonMobile from '../../components/JumpButton/JumpButtonMobile';


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
  
  const { origin, selectedPlaces: {placesToVisit}, directions: { route }, trips } = useAppSelector(state => state);
   const dispatch = useAppDispatch();
   const [dailyGroups, setDailyGroups] = useState<IActivity[] | null>(null)
   const [arrangedPlacesToVisit, setArrangedPlacesToVisit] = useState<any>(new Array(placesToVisit.length).fill(null))

   const [mapToDisplay, setMapToDisplay] = useState<any>(null)

  const [map, setMap] = useState<any>(null)
  
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

  const handleRemovePlace = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!dailyGroups) return;

    const newDailyGroups = dailyGroups.map((group: any) => {
      
      if(group.items.find((item: any) => item.location_id === id)){
        return {
          ...group,
          items: group.items.filter((item: any) => item.location_id !== id)
        }
      }
      
      return group
    })

    setDailyGroups(newDailyGroups)
  }

  const optimizeWaypoints = false

  const { calculateRoute } = useCalculateRoute()

  
  const handleShowMap = (index: number) => { 
    if (!dailyGroups) return;
    calculateRoute(origin, dailyGroups[index].items, optimizeWaypoints).then(res => setMapToDisplay(res))
  }
  

  const handleDragAndDrop = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;
    if (!dailyGroups) return;

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
    <Box>
      
      <DragDropContext onDragEnd={handleDragAndDrop}>
        <StyledContainer>
          <StyledOriginActivityContainer>

            <StyledOriginCard>
              <OriginCard {...origin} />

              {!trips.successful ?
                <Box>
                  <SaveItineraryPopButton />
                </Box>
                :
                <Box>
                  <StyledSavedTripText>Trip Saved! See My Trips for all itineraries</StyledSavedTripText>
                </Box>
              
            }

              
            </StyledOriginCard>

            <StyledMobileMap sx={{width: "100%"}}>
              <MapForMobile
                origin={origin}
                GoogleMap={GoogleMap}
                Marker={Marker}
                DirectionsRenderer={DirectionsRenderer}
                setMap={setMap} 
                // placesToVisit={placesToVisit} 
                directions={mapToDisplay}
                map={map}
                
              />
            </StyledMobileMap> 
          

          

            <StyledAddActivityCard>
              <AddMoreActivitiesCard 
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              newActivity={newActivity}
              setNewActivity={setNewActivity}
              Autocomplete={Autocomplete}
              />
              
            </StyledAddActivityCard>
          </StyledOriginActivityContainer>

          <StyledJumpCont id="top">
            <StyledDragDropText>
              Drag and drop activities to any day
            </StyledDragDropText>

            <JumpButtonMobile dailyGroups={dailyGroups} />
          </StyledJumpCont>

          <StyledActivityAndMapCont>

            <StyledDragDropContainer>

              <Droppable droppableId="ROOT" type="group">
                {(provided: DroppableProvided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} >
                    { dailyGroups && dailyGroups.map((group: any, index: number) => {
        
                      return (
                    
                        <div key={group.id} style={{marginBottom: "1rem"}} id={`${group.id}`}>

                          <Box                            
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: theme.palette.primary.variant, 
                              px: "1rem", 
                              }}
                          >
                            <Typography variant="h6" component="div" sx={{color: "black"}}>
                              Day {index + 1}
                            </Typography>

                            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <StyledViewMapButton 
                                href='#goToMap'                              
                                onClick={() => handleShowMap(index) }
                              >
                                View on Map

                              </StyledViewMapButton>
                                
                              <StyledViewMapBtnUpTab 
                                href='#map'
                                onClick={() => handleShowMap(index) }
                              >
                                View on Map

                              </StyledViewMapBtnUpTab>
                                

                              <IconButton sx={{color: theme.palette.secondary.variant}} aria-label="top" href='#top'>
                                <Box 
                                  sx={{
                                    display: "flex", 
                                    flexDirection: "column", 
                                    justifyContent: "center", 
                                    alignItems: "center"
                                  }}
                                >
                                  <UpgradeIcon sx={{fontSize: "1.5rem"}} />
                                  <Typography variant="caption" component="span">TOP</Typography>                                
                                </Box>
                              </IconButton>
                            </Box>

                          </Box>


                          <div style={{overflow: "scroll", height: "30vh", width: "98%"}}>
                            <PlacesForVisit {...group}  handleRemovePlace={handleRemovePlace} />

                          </div>
                        </div>
                    
                    )})}
                    {provided.placeholder}
                    
                  </div>
                )}
              </Droppable>

            </StyledDragDropContainer>

            <StyledDesktopMap>
              <StyledMap>
                <MapSection 
                  origin={origin}
                  GoogleMap={GoogleMap}
                  Marker={Marker}
                  DirectionsRenderer={DirectionsRenderer}
                  setMap={setMap} 
                  // placesToVisit={placesToVisit} 
                  directions={mapToDisplay}
                  map={map}
                  
                />
              </StyledMap>
            </StyledDesktopMap>
          </StyledActivityAndMapCont>

        </StyledContainer>
        <StyledTopButton>
          <IconButton sx={{color: theme.palette.secondary.variant}} aria-label="top" href='#top'>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <UpgradeIcon sx={{fontSize: "1.5rem"}} />
              <Typography variant="caption" component="span">TOP</Typography>                                
            </Box>
          </IconButton>
        </StyledTopButton>
      </DragDropContext>

    </Box>
  )
}

export default OptimizePage
