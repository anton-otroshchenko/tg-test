import { createSlice } from '@reduxjs/toolkit';
import { DataStatus } from "../../enums/data-status";
import { getUser } from "./actions";

type State = {
    currentUser: any;
    dataStatus:  typeof DataStatus[keyof typeof DataStatus];
};

const initialState: State = {
    currentUser: null,
    dataStatus: DataStatus.IDLE,
};

const { reducer } = createSlice({
    initialState,
    name: 'user',
    reducers: {},
    extraReducers(builder){
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.dataStatus = DataStatus.FULFILLED;
        });
        builder.addCase(getUser.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getUser.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    }
});

export { reducer };