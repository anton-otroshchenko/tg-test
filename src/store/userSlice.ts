import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as any | null,
  },
  reducers: {
    userReturned: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userReturned } = userSlice.actions;

export function getUser() {
  return async function getUserThunk(dispatch: AppDispatch) {
    try {
      const response = (await axios.get('/user')).data;
      dispatch(userReturned(response));
    } catch (e) {
      dispatch(userReturned(null));
    }
  };
}

export default userSlice.reducer;