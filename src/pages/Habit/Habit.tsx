import React from 'react';

import {FixedLayout} from '@xelene/tgui'
import {HabitHeader} from "../../components/HabitHeader/HabitHeader";
import styles from './Habit.module.css'

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
        </FixedLayout>
    );
};

export { Habit };