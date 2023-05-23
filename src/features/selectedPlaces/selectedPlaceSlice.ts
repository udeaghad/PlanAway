import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISelectedPlaceState {
  placesToVisit: any[];
}

const initialState: ISelectedPlaceState = {
  placesToVisit: [],
};

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    addPlace: (state, action: PayloadAction<any>) => ({
      ...state, placesToVisit: [...state.placesToVisit, action.payload]
    }),
    removePlace: (state, action: PayloadAction<any>) => ({
      ...state, placesToVisit: state.placesToVisit.filter((place) => place.location_id !== action.payload)
    }),
  }
});

export const addPlaceAction = selectedPlaceSlice.actions;

export default selectedPlaceSlice.reducer;