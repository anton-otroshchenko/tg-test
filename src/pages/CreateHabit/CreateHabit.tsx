import React, { useState } from 'react';
import { Input, FixedLayout, List, Cell, Title } from "@xelene/tgui";
import styles from "./CreateHabit.module.css";
import clsx from "clsx";
import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const allActiveDays = [true, true, true, true, true, true, true];

const CreateHabit = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const [activeDays, setActiveDays] = useState(allActiveDays);

    const handleSelectAllDays = () => {
        setSelectedRadio(1);
        setActiveDays(allActiveDays);
    };

    const handleToggleActiveDay = (index: number) => {
        const newActiveDays = activeDays.map((isActive, i) =>
            i === index ? !isActive : isActive
        );
        setActiveDays(newActiveDays);
    };

    return (
        <FixedLayout className={styles.wrapper}>
            <List>
                <Input className={styles.input} placeholder="Title" />
                <Input className={styles.input} placeholder="Description (optional)" />
               <List className={styles.frequency}>
                   <Title className={styles.title}>Frequency</Title>
                   <List className={styles.radioWrapper}>
                       <Cell
                           Component="label"
                           className={selectedRadio === 1 ? styles.activeTab : styles.tab}
                           onClick={handleSelectAllDays}
                           multiline
                       >
                           Daily
                       </Cell>
                       <Cell
                           Component="label"
                           className={selectedRadio === 2 ? styles.activeTab : styles.tab}
                           onClick={() => setSelectedRadio(2)}
                           multiline
                       >
                           Specific days
                       </Cell>
                   </List>
                   {selectedRadio === 2 &&
                       <List className={styles.daysWrapper}>
                           {days.map((day, i) => (
                               <Cell onClick={() => handleToggleActiveDay(i)} key={day} className={clsx(styles.day, activeDays[i] ? styles.activeDay : '')}>{day}</Cell>
                           ))}
                       </List>
                   }
               </List>
                <List className={styles.remindersWrapper}>
                    <Title className={styles.title}>Reminders</Title>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopTimePicker/>
                    </LocalizationProvider>
                </List>
            </List>
        </FixedLayout>
    );
};

export { CreateHabit };
