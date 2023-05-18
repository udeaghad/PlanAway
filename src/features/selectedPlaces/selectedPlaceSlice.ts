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
    })
  }
});

export const addPlaceAction = selectedPlaceSlice.actions;

export default selectedPlaceSlice.reducer;