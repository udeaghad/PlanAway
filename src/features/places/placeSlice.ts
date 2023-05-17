import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (data : {place: string; category: string}, thunkApi) => {
    const { place, category } = data;
    const placeOptions = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete',
      params: {
        query: place,
        lang: 'en_US',
        units: 'km'
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };

    const categoryOptions = {
      method: 'POST',
      url: `https://travel-advisor.p.rapidapi.com/${category}-filters/v2/list`,
      params: {
        currency: 'USD',
        units: 'km',
        lang: 'en_US'
      },
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      },
      data: {
        geoId: '',
      }
    };
    
    try {
      const response = await axios.request(placeOptions);
      console.log(response.data);
      categoryOptions.data.geoId = response.data.data[0].result_object.geo_id;
      
      const categoryResponse = await axios.request(categoryOptions);
      return categoryResponse.data.data;
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
  reducers: {},
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


