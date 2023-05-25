import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOptimizedPlaceState {
  optimizedPlaces: null | any[];
}

const initialState: IOptimizedPlaceState = {
  optimizedPlaces: null,
};

const optimizedPlaceSlice = createSlice({
  name: 'optimizedPlace',
  initialState,
  reducers: {
    addOptimizedPlaces: (state, action: PayloadAction<any>) => ({
      ...state, optimizedPlaces: action.payload
    }),
  }, 
});

export const optimizedPlacesAction = optimizedPlaceSlice.actions;

export default optimizedPlaceSlice.reducer;