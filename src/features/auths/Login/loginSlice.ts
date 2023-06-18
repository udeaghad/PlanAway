import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "login/login",
  async (data: { email: string; password: string }, thunkApi) => {
    console.log(data)
    const { email, password } = data;
    const loginOptions = {
      method: "POST",
      url: "https://plan-away-backend.onrender.com/api/v1/auth/login",
      data: {
        email,
        password,
      },
    };

    try {
      const response = await axios.request(loginOptions);
      console.log(response.data);
      localStorage.setItem("user", response.data.data.email);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


interface ILoginState {
  isLoading: boolean;
  error: string | null;
  data: null | any;
}

const initialState: ILoginState = {
  isLoading: false,
  error: null,
  data: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin: (state) => ({...state, isLoading: false, error: null, data: null})
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => ({ ...state, isLoading: true }))
      .addCase(login.fulfilled, (state, action: PayloadAction) => ({...state, isLoading: false, data: action.payload}))
      .addCase(login.rejected, (state, action: PayloadAction<any>) => ({...state, isLoading: false, error: action.payload}));
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice.reducer;