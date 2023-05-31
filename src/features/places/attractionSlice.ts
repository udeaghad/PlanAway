import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getAttractions = createAsyncThunk(
  'attraction/getAttractions',
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
      
      return response.data.data.filter((place: any) => place.name && place.address).sort((a: any, b: any) => a.location_id - b.location_id);
      
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

const attractionSlice = createSlice({
  name: 'attraction',
  initialState,  
  reducers: {
    selectAttraction: (state, action: PayloadAction<string>) => {
      if (!state.data) return state;
      const filteredData = state.data?.filter((place: any) => {
        
        return place.location_id !== action.payload;
      });
      return {...state, data: filteredData};
    },
    unselectAttraction: (state, action: PayloadAction<any>) => {
      if (!state.data) return state;
      return {...state, data: [...state.data, action.payload].sort((a, b) => a.location_id - b.location_id) };
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAttractions.pending, (state) => ({...state, isLoading: true}))
      .addCase(getAttractions.fulfilled, (state, action: PayloadAction<any[]>) => (
        {...state, isLoading: false, data: action.payload}
      ))
      .addCase(getAttractions.rejected, (state, action: PayloadAction<any>) => (
        {...state, isLoading: false, error: action.payload}
      ));
  }
});

export const attractionActions = attractionSlice.actions;

export default attractionSlice.reducer;
