import React from 'react';

import { Box } from '@mui/material';

interface IMapSectionProps {
  Marker: any;
  GoogleMap: any;
  DirectionsRenderer: any;
  origin: {
    details: {
      lat: string;
      lng: string;
      name: string;
    }
  };
  placesToVisit: any;
  directions: any;
  
}

const MapSection = ({origin: {details}, placesToVisit, DirectionsRenderer, GoogleMap, directions, Marker}: IMapSectionProps) => {
  
  return (
    <div>
      
        <Box>
          <GoogleMap
            mapContainerStyle={{ width: '58vw', height: '100vh' }}
            zoom={15}
            center={{ lat: Number(details.lat), lng: Number(details.lng) }}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
            // onLoad={(map:any) => setMap(map)}
          >            
              {/* <Marker position={{ lat: Number(details.lat), lng: Number(details.lng) }} />

              {placesToVisit.map((place: any) => {
               
                return <Marker key={place.location_id} position={{ lat: Number(place.latitude), lng: Number(place.longitude) }} />
              })} */}

            {directions && <DirectionsRenderer directions={directions} />}

          </GoogleMap>
        </Box>
    
    </div>
  )
}

export default MapSection;