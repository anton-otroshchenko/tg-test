import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "./store";

export const userSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [] as any[],
  },
  reducers: {
    habitsReturned: (state, action) => {
      state.items = action.payload;
    },
    habitCreated: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { habitsReturned, habitCreated } = userSlice.actions;

export const getHabits = () => async (dispatch: AppDispatch) => {
  try {
    const response = (await axios.get('/habits')).data;
    dispatch(habitsReturned(response));
  } catch (e) {

  }
};

export const createHabit = (habit: any) => async (dispatch: AppDispatch) => {
  try {
    const response = (await axios.post('/habits', habit)).data;
    dispatch(habitCreated(response));
  } catch (e) {

  }
};

export default userSlice.reducer;