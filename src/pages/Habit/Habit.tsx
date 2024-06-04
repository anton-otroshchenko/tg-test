import React from 'react';

import {FixedLayout} from '@xelene/tgui'
import {HabitHeader} from "../../components/HabitHeader/HabitHeader";
import styles from './Habit.module.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Habit = () => {

    const habit = {
            id: 1,
            title: 'Drink 50 litres of water',
            description: 'I want to drink 50 litres of water',
            updateDays: [true,true,true,true,false,true,false],
            reminderDays: [true,true,true,true,false,true,false],
            reminderTime: "2024-06-03T06:53:28.888Z",
            isArchived: false,
            days: ['completed', 'not_completed', '', '', '', '', '']
        };

    return (
        <FixedLayout vertical='top' className={styles.habitWrapper}>
            <HabitHeader title={habit.title}/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar/>
            </LocalizationProvider>
        </FixedLayout>
    );
};

export { Habit };