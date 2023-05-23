import React from 'react';
// import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { Box } from '@mui/material';

interface IMapSectionProps {
  isLoaded: boolean;
  GoogleMap: any;
  Marker: any;
  DirectionsRenderer: any;
  origin: {
    details: {
      lat: string;
      lng: string;
    }
  };
  setMap: React.Dispatch<React.SetStateAction<any>>;
}

const MapSection = ({origin: {details}, isLoaded, GoogleMap, DirectionsRenderer, Marker, setMap}: IMapSectionProps) => {

  return (
    <div>
      { isLoaded &&
        <Box>
          <GoogleMap
            mapContainerStyle={{ width: '58vw', height: '90vh' }}
            zoom={15}
            center={{ lat: Number(details.lat), lng: Number(details.lng) }}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
            onLoad={(map:any) => setMap(map)}
          >
            <Marker position={{ lat: Number(details.lat), lng: Number(details.lng) }}  />              
          </GoogleMap>
        </Box>
    }
    </div>
  )
}

export default MapSection;