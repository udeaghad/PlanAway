import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (data : {lat: string; lng: string;  category: string}, thunkApi) => {
    
    const { lat, lng, category } = data;
    const placeOptions = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${category}/list-by-latlng`,
      params: {
        latitude: lat,
        longitude: lng,    
        lunit: 'km',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(placeOptions);
      
      return response.data.data.filter((place: any) => place.name);
      
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  } 
);
interface IPlaceState {
  isLoading: boolean;
  error: string | null;
  data: null | any[];
}
const initialState: IPlaceState = {
  isLoading: false,
  error: null,
  data: null,
};

const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    selectPlace: (state, action: PayloadAction<string>) => {
      if (!state.data) return state;
      const filteredData = state.data?.filter((place: any) => place.location_id !== action.payload);
      return {...state, data: filteredData};
    },
    unselectPlace: (state, action: PayloadAction<any>) => {
      if (!state.data) return state;
      return {...state, data: [...state.data, action.payload]};
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPlaces.pending, (state) => ({...state, isLoading: true}))
      .addCase(getPlaces.fulfilled, (state, action: PayloadAction<any[]>) => (
        {...state, isLoading: false, data: action.payload}
      ))
      .addCase(getPlaces.rejected, (state, action: PayloadAction<any>) => (
        {...state, isLoading: false, error: action.payload}
      ));
  }
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
