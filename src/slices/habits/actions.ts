import { createAsyncThunk } from '@reduxjs/toolkit';

const sliceName = 'habits';

const getHabits = createAsyncThunk(`${sliceName}/get-habits`, async () => {
    const response = await fetch('https://b021-93-170-66-83.ngrok-free.app/api/habits', {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await response.json();
});

export {
    getHabits,
};