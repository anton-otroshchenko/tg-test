import React from 'react';
import { FixedLayout } from '@xelene/tgui';
import { HabitHeader } from "../../components/HabitHeader/HabitHeader";
import styles from './Habit.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar, PickersDayProps, PickerValidDate} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';

const dayOfWeekFormatter = (date: PickerValidDate): string => {
    if (date === null) return '';
    const day = dayjs(date).day()
    const dayMap: { [key: number]: string } = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
    };
    return dayMap[day];
};

const CustomDay = (props: PickersDayProps<Dayjs>) => {
    const { selected } = props;
    return (
        <div onClick={()=> console.log(123)}  style={{ border: selected ? '1px solid blue' : '1px solid transparent' }}>
            <div style={{
                color: '#000000'
            }}>Custom Content</div>
        </div>
    );
};

const renderDay = (
    day: Dayjs,
    selectedDates: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
) => {
    return <CustomDay {...pickersDayProps} day={day} />;
};

const Habit = () => {
    const habit = {
        id: 1,
        title: 'Drink 50 litres of water',
        description: 'I want to drink 50 litres of water',
        updateDays: [true, true, true, true, false, true, false],
        reminderDays: [true, true, true, true, false, true, false],
        reminderTime: "2024-06-03T06:53:28.888Z",
        isArchived: false,
        days: ['completed', 'not_completed', '', '', '', '', '']
    };

    return (
        <FixedLayout vertical='top' className={styles.habitWrapper}>
            <HabitHeader title={habit.title} />
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar
                    dayOfWeekFormatter={dayOfWeekFormatter}
                    slots={{
                        //@ts-ignore
                        day: (day: any, selectedDates: any, pickersDayProps: any) =>
                            renderDay(day, selectedDates, pickersDayProps),
                    }}
                />
            </LocalizationProvider>
        </FixedLayout>
    );
};

export { Habit };
