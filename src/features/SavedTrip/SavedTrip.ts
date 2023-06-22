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
        console.log(response.data.data)
        if (response.data.status === 'success'){
          const { createdAt, id, origin, places } = response.data.data
          return {trip: id, date: createdAt, place: places, origin}
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