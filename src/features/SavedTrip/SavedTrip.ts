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

interface ITripFetchData {
  token: string;
}

interface ITripState {
  isLoading: boolean;
  error: string | null,
  successful: boolean;
  data: {
    id: string;
    createdAt: string;
    places: any[] | null;
    origin: IOrigin;
  }[];
}


export const postTrip = createAsyncThunk(
  'trip/postTrip',
  async (data: ITripData, thunkApi) => {

    const tripOptions = {
      method: 'POST',
      url: `https://plan-away-backend.onrender.com/api/v1/place`,
      data: {
        place: data.place,
        origin: data.origin
      },
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    }

      try {
        const response = await axios.request(tripOptions);
        
        if (response.data.status === 'success'){          
          return response.data.data
        }
        
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }

  }
)
export const getAllTrips = createAsyncThunk(
  'trip/getAllTrips',
  async (data:  ITripFetchData, thunkApi) => {
    

    const tripOptions = {
      method: 'GET',
      url: `https://plan-away-backend.onrender.com/api/v1/trip`,
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    }

      try {
        const response = await axios.request(tripOptions);
     
        return response.data.data.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : -1);

        
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
      {...state, isLoading: false, data: [action.payload, ...state.data], successful: true}
    ))
    .addCase(postTrip.rejected, (state, action: PayloadAction<any>) => (
      {...state, isLoading: false, error: action.payload}
    ))
    .addCase(getAllTrips.pending, (state) => ({...state, isLoading: true}))
    .addCase(getAllTrips.fulfilled, (state, action: PayloadAction<any>) =>(
      {...state, isLoading: false, data: action.payload}
    ))
    .addCase(getAllTrips.rejected, (state, action: PayloadAction<any>) => (
      {...state, isLoading: false, error: action.payload}
    ))
  },
})

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;