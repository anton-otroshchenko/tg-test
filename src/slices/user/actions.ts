import { createAsyncThunk} from '@reduxjs/toolkit';
import { retrieveLaunchParams } from "@tma.js/sdk";
import axios from "axios";

const sliceName = 'user';

const getUser = createAsyncThunk(`${sliceName}/get-user`, async () => {
    let initDataRaw;
    try {
        initDataRaw = retrieveLaunchParams().initDataRaw;
    } catch (e) {
        console.error(e);
        initDataRaw = window.Telegram?.WebApp.initData;
    }
    const response = await axios.get('https://9836-93-170-66-83.ngrok-free.app/api/user', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `tma ${initDataRaw}`,
        },
        method: 'GET'
    });

    return response.data;
});

export {
    getUser,
};