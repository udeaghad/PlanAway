import React, { useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { StyledMobileMap } from './Style';
import MapForMobile from '../MapSection/MapForMobile';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';

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
  places: any[];
}

const DisplaySelectedSavedTrip = ({...tripToOpen}:IDisplaySelectedSavedTripProps) => {
  const [map, setMap] = useState<any>(null);
  const [mapToDisplay, setMapToDisplay] = useState<any>(null)
  const {origin} = tripToOpen;
  useEffect(() => {
    console.log(tripToOpen.places)
  })

  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async(index:number) => {
    if (!tripToOpen.places) return;
    const {details} = origin;
    

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
    <Box>
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
    </Box>
  )
}

export default DisplaySelectedSavedTrip