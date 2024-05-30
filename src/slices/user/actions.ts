import { createAsyncThunk} from '@reduxjs/toolkit';
import { retrieveLaunchParams } from "@tma.js/sdk";

const sliceName = 'user';

const getUser = createAsyncThunk(`${sliceName}/get-user`, async () => {
    let initDataRaw;
    try {
        initDataRaw = retrieveLaunchParams().initDataRaw;
    } catch (e) {
        console.error(e);
        initDataRaw = window.Telegram?.WebApp.initData;
    }
    const response = await fetch('https://b021-93-170-66-83.ngrok-free.app/api/user', {
        headers: {
            "Content-Type": "application/json",
            Authorization: `tma ${initDataRaw}`,
        },
    });

    return await response.json();
});

export {
    getUser,
};