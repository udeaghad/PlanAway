import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IMessageState {
  successMsg: any | null;
  errorMsg: any | null;
}

const initialState: IMessageState = {
  successMsg: null,
  errorMsg: null,
}

const msgSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getSuccessMsg: (state, action: PayloadAction<string>) => ({...state, successMsg: action.payload, errorMsg: null}),
    getErrorMsg: (state, action: PayloadAction<string>) => ({...state, successMsg: null, errorMsg: action.payload}),
    resetMsg: (state) => ({...state, successMsg: null, errorMsg: null})
  }
})

export const msgAction = msgSlice.actions;

export default msgSlice.reducer;