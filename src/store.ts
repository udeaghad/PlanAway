import {configureStore} from '@reduxjs/toolkit';
import  placeReducer  from './features/places/placeSlice';

export const store = configureStore({
  reducer: {
    // Add reducers here
    places: placeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;  
export type AppDispatch = typeof store.dispatch;
