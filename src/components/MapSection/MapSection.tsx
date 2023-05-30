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
  setMap: React.Dispatch<React.SetStateAction<any>>;
  map: any;
   
}

const MapSection = ({origin: {details}, DirectionsRenderer, GoogleMap, directions, setMap}: IMapSectionProps) => {
  
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
                  // markerOptions: {
                  //   icon: {
                  //     url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                  //     scaledSize: new window.google.maps.Size(50, 50),
                  //   },
                  // },
                }}
              />
            }

          </GoogleMap>
        </Box>
    
    </div>
  )
}

export default MapSection;