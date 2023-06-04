import React, {useState, useEffect} from 'react';
import { Autocomplete } from '@react-google-maps/api';

import LocationBar from '../../components/LocationBar/LocationBar';

import { getRestaurants } from '../../features/places/restaurantSlice';
import { getAttractions } from '../../features/places/attractionSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { addOriginAction } from '../../features/origin/originSlice';
import { useNavigate } from 'react-router-dom';
import LandingSection from '../../components/LandingSection/LandingSection';
import { StyledContainer } from './style'; 
import LocationMainBar from '../../components/LocationBar/LocationMainBar';


const LandingPage = () => {

  return (
    <StyledContainer>
      <div>
        <LocationMainBar />
      </div>

      <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img src="/images/Progress-0.png" alt="loading-bar" />
      </div>

      <div style={{width: "100%"}}> 
        <LandingSection />

      </div>

      
    </StyledContainer>
  )
}

export default LandingPage