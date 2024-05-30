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
    const response = await fetch('https://ac99-93-170-66-83.ngrok-free.app/api/user', {
        headers: {
            "Content-Type": "text/plain",
            Authorization: `tma ${initDataRaw}`,
        },
        method: 'GET'
    });

    return await response.json();
});

export {
    getUser,
};