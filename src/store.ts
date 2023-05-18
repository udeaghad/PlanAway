import {configureStore} from '@reduxjs/toolkit';
import  placeReducer  from './features/places/placeSlice';
import addPlaceReducer from './features/selectedPlaces/selectedPlaceSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here
    places: placeReducer,
    selectedPlaces: addPlaceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
