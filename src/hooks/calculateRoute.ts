import React, {useState, useEffect} from 'react';

interface IOrigin {
  startDate: string;
  endDate: string;
  details: {
    lat: string;
    lng: string;
    name: string;
    photo: {images: { medium: {url: string}}};
    address: string;      
  },
  numberOfDays: number;

}


const useCalculateRoute = () => {
  const DirectionsService = new window.google.maps.DirectionsService();

  const calculateRoute = async(origin: IOrigin, placesToVisit: any[], optimizeWaypoints: boolean) => {
    
    const {details} = origin;
    const result = await DirectionsService.route({
      origin: Number(details.lat) + ',' + Number(details.lng),
      destination: Number(details.lat) + ',' + Number(details.lng),
      travelMode: window.google.maps.TravelMode.DRIVING,
      waypoints: placesToVisit?.map((place: any) => {
        return {
          location: Number(place.latitude) + ',' + Number(place.longitude),
          stopover: true
        }
      }), 
      optimizeWaypoints,
    }, (res: any, status: any) => {
      if (status === window.google.maps.DirectionsStatus.OK) { 
                 
        return res
      } else {
        console.error(`error fetching directions ${res}`);
      }
    }); 

    
    return  result;
    
  }  
  
  return {calculateRoute};

}

export default useCalculateRoute;
