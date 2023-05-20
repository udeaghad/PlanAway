import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
  async (data : {lat: string; lng: string;  category: string}, thunkApi) => {
    console.log(data)
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
      
      return response.data.data.filter((place: any) => place.name).sort((a: any, b: any) => a.location_id - b.location_id);
      
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

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,  
  reducers: {
    selectRestaurants: (state, action: PayloadAction<string>) => {
      if (!state.data) return state;
      const filteredData = state.data?.filter((place: any) => {
        
        return place.location_id !== action.payload;
      });
      return {...state, data: filteredData};
    },
    unselectRestaurants: (state, action: PayloadAction<any>) => {
      if (!state.data) return state;
      return {...state, data: [...state.data, action.payload].sort((a, b) => a.location_id - b.location_id) };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getRestaurants.pending, (state) => ({...state, isLoading: true}))
      .addCase(getRestaurants.fulfilled, (state, action: PayloadAction<any[]>) => (
        {...state, isLoading: false, data: action.payload}
      ))
      .addCase(getRestaurants.rejected, (state, action: PayloadAction<any>) => (
        {...state, isLoading: false, error: action.payload}
      ));
  }
});

export const restaurantActions = restaurantSlice.actions;

export default restaurantSlice.reducer;
