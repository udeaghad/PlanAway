import {configureStore} from '@reduxjs/toolkit';
import  restaurantReducer  from './features/places/restaurantSlice';
import addPlaceReducer from './features/selectedPlaces/selectedPlaceSlice';
import attractionReducer from './features/places/attractionSlice';
import originReducer from './features/origin/originSlice';
import directionReducer from './features/directions/directionSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here
    restaurants: restaurantReducer,
    selectedPlaces: addPlaceReducer,
    attractions: attractionReducer,
    origin: originReducer,
    directions: directionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
