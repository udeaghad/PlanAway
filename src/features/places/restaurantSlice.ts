import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getRestaurants = createAsyncThunk(
  'restaurant/getRestaurants',
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
      
      return response.data.data.filter((place: any) => place.name && place.address )
        .sort((a: any, b: any) => a.location_id - b.location_id)
        .map((item:any) => {
          const { address, category, cuisine, latitude, longitude, location_id, name, photo, rating, subcategory, web_url, website, phone} = item
          return {
            address, category, cuisine, latitude, longitude, location_id, name, photo, rating, subcategory, web_url, website, phone, selected: false,
          }
        })
      
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
      
      return {
        ...state, 
        data: state.data.map((place: any) => {
          if (place.location_id === action.payload){
            
            return {...place, selected: true }
          }
          return place
        })
      }
    },
    unselectRestaurants: (state, action: PayloadAction<any>) => {
      if (!state.data) return state;
      return {...state, 
        data: state.data.map((place:any) => {
          if (place.location_id === action.payload){
            return {...place, selected: false}
          }
          return place
        })
      };
    },
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
