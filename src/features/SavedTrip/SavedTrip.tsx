import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface ITripData {
  trip: string;
  date: string;
  place: any[];
  token?: string;
}

interface ITripState {
  isLoading: boolean;
  error: string | null
  data: any[]
}


export const postTrip = createAsyncThunk(
  'trip/postTrip',
  async (data: ITripData, thunkApi) => {
    const { trip, date, place, token } = data;

    const tripOptions = {
      method: 'POST',
      url: `https://plan-away-backend.onrender.com/api/v1/place`,
      params: {
        trip,
        date,
        place
      },
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }

      try {
        const response = await axios.request(tripOptions);
        
        if (response.data.status === 'success'){
          return data
        }
        
      } catch (error: any) {
        return thunkApi.rejectWithValue(error);
      }

  }
)


const initialState:ITripState = {
  isLoading: false,
  error: null,
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
      {...state, isLoading: false, data: [...state.data, action.payload]}
    ))
    .addCase(postTrip.rejected, (state, action: PayloadAction<any>) => (
      {...state, isLoading: false, error: action.payload}
    ))
  },
})

export const tripActions = tripSlice.actions;

export default tripSlice.reducer;