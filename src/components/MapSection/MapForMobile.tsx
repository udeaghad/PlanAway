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
  directions: any;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  map: any;
   
}


const MapForMobile = (
  { origin: {details}, 
    DirectionsRenderer, 
    GoogleMap, 
    directions, 
    setMap
  }: IMapSectionProps) => {
    
  return (
    <div id="goToMap" data-testid="Map">
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <GoogleMap
            mapContainerStyle={{ width: '90%', height: '50vh' }}
            zoom={12}
            center={{ lat: Number(details.lat), lng: Number(details.lng) }}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
            
            
            onLoad={(map: any) => setMap(map)}
          >            
              

            {directions && 
            
              <DirectionsRenderer 
                directions={directions} 
                options={{
                  polylineOptions: {
                    strokeColor: 'red',
                    strokeOpacity: 0.8,
                    strokeWeight: 5,
                  },
                  
                }}
              />
            }

          </GoogleMap>
        </Box>
    </div>
  )
}

export default MapForMobile