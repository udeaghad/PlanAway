import React, { useEffect, useState} from 'react';
import { Box,Typography,IconButton, Card, CardContent } from '@mui/material';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import UpgradeIcon from '@mui/icons-material/Upgrade';

import { 
  StyledMobileMap, 
  StyledJumpCont, 
  StyledViewMapButton, 
  StyledViewMapBtnUpTab, 
  StyledDesktopMap, 
  StyledMap, 
  StyledActivityAndMapCont,
  StyledContainer,
  StyledTopButton } from './Style';
import MapForMobile from '../MapSection/MapForMobile';
import MapSection from '../MapSection/MapSection';
import JumpButtonMobile from '../JumpButton/JumpButtonMobile';
import theme from '../../theme/theme'

interface IDisplaySelectedSavedTripProps {
  trip: string;
  date: string;
  origin: {
    details: {
      name: string;
      address?: string;
      lat: string;
      lng: string;
    },
    startDate: string;
    endDate: string;
    numberOfDays: number;
  },
  place: any[];
}

const DisplaySelectedSavedTrip = ({...tripToOpen}:IDisplaySelectedSavedTripProps) => {
  const [map, setMap] = useState<any>(null);
  const [mapToDisplay, setMapToDisplay] = useState<any>(null)
  const {origin} = tripToOpen;
  useEffect(() => {
    console.log(tripToOpen.place)
  })

  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async(index:number) => {
    if (!tripToOpen.place) return;
    const {details} = origin;
    

    const result = await DirectionsService.route({
    origin: Number(details.lat) + ',' + Number(details.lng),
    destination: Number(details.lat) + ',' + Number(details.lng),
    travelMode: window.google.maps.TravelMode.DRIVING,
    waypoints: tripToOpen.place[index].items?.map((place: any) => {
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


  const handleShowMap = (index: number) => {
    calculateRoute(index)
  }
  return (
    <Box>
      <StyledContainer>

        <StyledMobileMap sx={{width: "100%"}}>
          <MapForMobile
            origin={origin}
            GoogleMap={GoogleMap}
            Marker={Marker}
            DirectionsRenderer={DirectionsRenderer}
            setMap={setMap}  
            directions={mapToDisplay}
            map={map}
            
            />
        </StyledMobileMap> 

        <StyledJumpCont id="top">
          <JumpButtonMobile dailyGroups={tripToOpen.place} />
        </StyledJumpCont>

        <StyledActivityAndMapCont>
          <Box>
            { tripToOpen.place && tripToOpen.place.map((eachPlace: any, index: number) => (
              <div key={eachPlace.id} style={{marginBottom: "1rem"}} id={`${eachPlace.id}`}>
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

                <div style={{width: "98%"}}>
                  { eachPlace.items.map((item: any) => (
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap:"3%"}} key={item.location_id}>
                      <Card sx={{width: "80%", mt: "0.5rem", px: "0.5rem" }} >                        
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
                    </Box>
                  ))}
                </div>
              </div>
            ))}
          </Box>
          <StyledDesktopMap>
            <StyledMap>
              <MapSection 
                origin={origin}
                GoogleMap={GoogleMap}
                Marker={Marker}
                DirectionsRenderer={DirectionsRenderer}
                setMap={setMap}  
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
    </Box>
  )
}

export default DisplaySelectedSavedTrip