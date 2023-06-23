
import React, {useState, useEffect} from 'react';
import { Autocomplete } from '@react-google-maps/api';

import LocationBar from './LocationBar';
import { getRestaurants } from '../../features/places/restaurantSlice';
import { getAttractions } from '../../features/places/attractionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addOriginAction } from '../../features/origin/originSlice';
import { useNavigate } from 'react-router-dom';


interface IRecommendation {
  lat: string | null,
  lng: string | null,
  category: string
}


interface IDate {
  startDate: string;
  endDate: string;
  numberOfDays: number;
}



const LocationMainBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { origin} = useAppSelector(state => state);

  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [recommendation, setRecommendation] = useState<IRecommendation>({
    lat: null,
    lng: null,
    category: ''
  })

  const [date, setDate] = useState<IDate>({
    startDate: origin.startDate,
    endDate: origin.endDate,
    numberOfDays: origin.numberOfDays,
  });

  

  const onLoad = (autoC: google.maps.places.Autocomplete) => setAutocomplete(autoC);
  

  const calculateNoOfDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const totalNoDays = Math.ceil(timeDiff / (1000 * 3600 * 24));    
    const today = 1
    return totalNoDays + today;
  }
  const handleDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDate({...date, [event.target.id]: event.target.value})   
  }
  

  const onPlaceChanged = () => { 
    
    if(autocomplete === null) return;
    const lat = autocomplete?.getPlace().geometry?.location?.lat().toString();
    const lng = autocomplete?.getPlace().geometry?.location?.lng().toString();
    
    if(lat && lng){
      setRecommendation({...recommendation, lat: lat, lng: lng })                                                       
      
      dispatch(addOriginAction.addOriginDetails({
        name: autocomplete?.getPlace().name,
        address: autocomplete?.getPlace().formatted_address,
        photo: {images: {medium:  {url: autocomplete?.getPlace().icon}}},
        lat,
        lng,
      }))
    }

  };

  const handleDateSubmit = () => {
    const totalDays = calculateNoOfDays(date.startDate, date.endDate);
    dispatch(addOriginAction.addOriginDates({...date, numberOfDays: totalDays}))
    navigate('/Add-Activities')
  }
 

  useEffect(() => {
    
    if(recommendation.lat && recommendation.lng) {
      dispatch(getRestaurants({lat:recommendation.lat, lng:recommendation.lng, category: 'restaurants'}))
      dispatch(getAttractions({lat:recommendation.lat, lng:recommendation.lng, category: 'attractions'}))
    }
  }, [recommendation.lat, recommendation.lng, dispatch, recommendation.category])

  return (
    <div>
        <LocationBar 
          onLoad={onLoad} 
          onPlaceChanged={onPlaceChanged}  
          Autocomplete={Autocomplete}
          handleDateOnChange={handleDateOnChange}
          handleDateSubmit={handleDateSubmit} 
          date={date}       
        />
      </div>
  )
}

export default LocationMainBar