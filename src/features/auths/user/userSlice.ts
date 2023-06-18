import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: any | null;
}

const initialState: IUserState = {
  user:  null,
}

const userSlice = createSlice({ 
  name: 'user',
  initialState,
  reducers: {
    setUser:(state, action: PayloadAction<any>) => ({...state, user: action.payload}),
    removeUser: (state) => ({...state, user: null}),
  }
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
