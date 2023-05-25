import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialState: IOrigin = {   
  startDate: '',
  endDate: '',
  details: {
    lat: '',
    lng: '',
    name: '',
    photo: {images: { medium: {url: ''}}},
    address: ''
  },
  numberOfDays: 0,

};

const originSlice = createSlice({
  name: 'origin',
  initialState,
  reducers: {
    addOriginDetails: (state, action: PayloadAction<any>) => ({
      ...state, details: action.payload
    }),
    addOriginDates: (state, action: PayloadAction<any>) => ({
      ...state, startDate: action.payload.startDate, endDate: action.payload.endDate, numberOfDays: action.payload.numberOfDays
    }),
  }
});

export const addOriginAction = originSlice.actions;

export default originSlice.reducer;