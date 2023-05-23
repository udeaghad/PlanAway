import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DirectionState {
  route: any | null;
}

const initialState: DirectionState = {
  route: null,
};

const directionSlice = createSlice({
  name: 'direction',
  initialState,
  reducers: {
    setRoutes: (state, action: PayloadAction<any>) => {
      state.route = action.payload;
    }
  },
});

export const directionAction = directionSlice.actions;

export default directionSlice.reducer;