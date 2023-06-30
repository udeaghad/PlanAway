import React, {useState} from 'react';
import { useAppSelector } from '../../hooks/storeHooks'
import SavedTripsList from '../../components/SavedTripsList/SavedTripsList';
import DisplaySelectedSavedTrip from '../../components/DisplaySelectedSavedTrip/DisplaySelectedSavedTrip';
import OriginCard from '../../components/OriginCard/OriginCard';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { StyledOriginCard, StyledSavedTripsListCont, StyledContainer, StyledMobileMap, StyledJumpCont, StyledActivityAndMapCont, StyledDesktopMap, StyledMap, StyledTopButton } from './Style';
import MapForMobile from '../../components/MapSection/MapForMobile';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import JumpButtonMobile from '../../components/JumpButton/JumpButtonMobile';
import MapSection from '../../components/MapSection/MapSection';
import theme from '../../theme/theme';
import UpgradeIcon from '@mui/icons-material/Upgrade';


const MyTrips = () => {
  const {trips} = useAppSelector(state => state)

  const [map, setMap] = useState<any>(null);
  const [mapToDisplay, setMapToDisplay] = useState<any>(null)
  

  const [tripToOpen, setTripToOpen] = React.useState<any>(null)

  const handleOpenTrip = (tripId: string) => {
    const selectedTrip = trips.data.find(trip => trip.id === tripId)
    setTripToOpen(selectedTrip)
  }

  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async(index:number) => {
    if (!tripToOpen.places) return;
    if (!tripToOpen.origin) return;

    const {details} = tripToOpen.origin;
    

    const result = await DirectionsService.route({
    origin: Number(details.lat) + ',' + Number(details.lng),
    destination: Number(details.lat) + ',' + Number(details.lng),
    travelMode: window.google.maps.TravelMode.DRIVING,
    waypoints: tripToOpen.places[index].items?.map((place: any) => {
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
    <div>
      <StyledSavedTripsListCont>
          <SavedTripsList {...trips} handleOpenTrip={handleOpenTrip} />
      </StyledSavedTripsListCont>

      <Divider />
      
      { tripToOpen && 
        <Box>
          <StyledOriginCard>          
              <OriginCard {...tripToOpen.origin} />          
          </StyledOriginCard>
          
          <StyledContainer>
            <StyledMobileMap sx={{width: "100%"}}>
              <MapForMobile
                origin={tripToOpen.origin}
                GoogleMap={GoogleMap}
                Marker={Marker}
                DirectionsRenderer={DirectionsRenderer}
                setMap={setMap}  
                directions={mapToDisplay}
                map={map}            
                />
          </StyledMobileMap> 

          <StyledJumpCont id="top">
            <JumpButtonMobile dailyGroups={tripToOpen.places} />
          </StyledJumpCont>

          <StyledActivityAndMapCont>
            <div>
              <DisplaySelectedSavedTrip tripToOpen={tripToOpen}  handleShowMap={handleShowMap}/>
            </div>

            <StyledDesktopMap>
              <StyledMap>
                <MapSection 
                  origin={tripToOpen.origin}
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
        
      }


    </div>
  )
}

export default MyTrips