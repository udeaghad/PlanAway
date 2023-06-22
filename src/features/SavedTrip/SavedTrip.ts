import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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

interface ITripData {
  trip: string;
  date: string;
  place: any[] | null;
  token?: string;
  origin: IOrigin;
}

interface ITripState {
  isLoading: boolean;
  error: string | null,
  successful: boolean;
  data: {
    trip: string;
    date: string;
    place: any[] | null;
    origin: IOrigin;
  }[];
}


export const postTrip = createAsyncThunk(
  'trip/postTrip',
  async (data: ITripData, thunkApi) => {
    
    const { trip, date, place, origin, token } = data;

    const tripOptions = {
      method: 'POST',
      url: `https://plan-away-backend.onrender.com/api/v1/place`,
      data: {
        trip,
        date,
        place,
        origin
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

      try {
        const response = await axios.request(tripOptions);
        
        if (response.data.status === 'success'){
          return {trip, date, place, origin}
        }
        
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }

  }
)


const initialState:ITripState = {
  isLoading: false,
  error: null,
  successful: false,
  data: []
}



const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(postTrip.pending, (state) => ({...state, isLoading: true}))
    .addCase(postTrip.fulfilled, (state, action: PayloadAction<any>) => (
      {...state, isLoading: false, data: [...state.data, action.payload], successful: true}
    ))
    .addCase(postTrip.rejected, (state, action: PayloadAction<any>) => (
      {...state, isLoading: false, error: action.payload}
    ))
  },
})

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;