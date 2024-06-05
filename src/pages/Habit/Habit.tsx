import React, { useState } from 'react';
import { FixedLayout } from '@xelene/tgui';
import { HabitHeader } from "../../components/HabitHeader/HabitHeader";
import styles from './Habit.module.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, PickersDayProps, PickerValidDate } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import StatusPicker from '../../components/StatusPicker/StatusPicker';

const dayOfWeekFormatter = (date: PickerValidDate): string => {
    if (date === null) return '';
    const day = dayjs(date).day();
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

const habitDays: { id: string; date: string; status: string; }[] = [];
const startDate = new Date('2024-06-01T06:42:52.640Z');

for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    habitDays.push({
        id: (i + 1).toString(),
        date: currentDate.toISOString(),
        status: 'not_completed',
    });
}

const CustomDay: React.FC<PickersDayProps<Dayjs> & { currentMonth: number, onDayClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Dayjs) => void }> = (props) => {
    const { day, currentMonth, onDayClick } = props;
    const validDay = dayjs(day);
    const isCurrentMonth = validDay.month() === currentMonth;
    const dayOfMonth = isCurrentMonth && validDay.isValid() ? validDay.date() : '';

    const habitDay = habitDays.find(d => dayjs(d.date).isSame(validDay, 'day'));
    const status = habitDay ? habitDay.status : '';

    let backgroundColor;
    switch (status) {
        case 'completed':
            backgroundColor = '#111827';
            break;
        case 'not_completed':
            backgroundColor = '#7D8391';
            break;
        case 'miss':
        default:
            backgroundColor = '#D4D9E9';
            break;
    }

    return (
        <div onClick={(event) => onDayClick(event, validDay)} style={{ border: props.selected ? '1px solid blue' : '1px solid transparent' }}>
            <div style={{
                color: '#ffffff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `${isCurrentMonth ? backgroundColor : 'transparent'}`
            }}>
                {dayOfMonth || ''}
            </div>
        </div>
    );
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

    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
    const [pickerPosition, setPickerPosition] = useState<{ top: number, left: number } | null>(null);

    const handleMonthChange = (date: Dayjs) => {
        setCurrentMonth(date.month());
    };

    const handleDayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, date: Dayjs) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const pickerWidth = 160;
        let left = rect.left - 20;

        if (rect.left + pickerWidth > window.innerWidth) {
            left = window.innerWidth - pickerWidth - 10;
        }

        setSelectedDay(date);
        setPickerPosition({ top: rect.bottom + 15, left });
    };

    const handleClickOutside = () => {
        setSelectedDay(null);
        setPickerPosition(null);
    };

    const handleStatusChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, status: string) => {
        if (selectedDay) {
            const index = habitDays.findIndex(d => dayjs(d.date).isSame(selectedDay, 'day'));
            if (index !== -1) {
                habitDays[index].status = status;
                setSelectedDay(null);
            }
        }
    };

    return (
        <FixedLayout vertical='top' className={styles.habitWrapper}>
            <HabitHeader title={habit.title} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    dayOfWeekFormatter={dayOfWeekFormatter}
                    onMonthChange={handleMonthChange}
                    slots={{
                        day: (props) => <CustomDay {...props} currentMonth={currentMonth} onDayClick={handleDayClick} />
                    }}
                />
            </LocalizationProvider>
            {selectedDay && pickerPosition && (
                <div style={{ position: 'absolute', top: pickerPosition.top, left: pickerPosition.left }}>
                    <StatusPicker onClick={handleStatusChange} onClickOutside={handleClickOutside} />
                </div>
            )}
        </FixedLayout>
    );
};

export { Habit };
