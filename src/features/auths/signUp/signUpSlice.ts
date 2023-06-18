import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk(
  "signUp/signUp",
  async (data: { email: string; password: string }, thunkApi) => {
    const { email, password } = data;
    const signUpOptions = {
      method: "POST",
      url: "https://plan-away-backend.onrender.com/api/v1/auth",
      data: {
        email,
        password,
      },
    };

    try {
      const response = await axios.request(signUpOptions);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface ISignUpState {
  isLoading: boolean;
  error: string | null;
  data: null | any;
}

const initialState: ISignUpState = {
  isLoading: false,
  error: null,
  data: null,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetSignUp: (state) => ({...state, isLoading: false, error: null, data: null})
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(signUp.fulfilled, (state, action: PayloadAction) => ({...state, isLoading: false, data: action.payload}))
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => ({...state, isLoading: false, error: action.payload}));
  },
});

export const signUpActions = signUpSlice.actions;

export default signUpSlice.reducer;
