import React, { useState } from 'react';
import { Input, FixedLayout, List, Cell, Title } from "@xelene/tgui";
import styles from "./CreateHabit.module.css";
import clsx from "clsx";

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const CreateHabit = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const [activeDays, setActiveDays] = useState([true, true, true, true, true, true, true]);

    const handleSelectAllDays = () => {
        setSelectedRadio(1);
        setActiveDays([true, true, true, true, true, true, true]);
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
                <Title className={styles.title}>Frequency</Title>
               <List className={styles.frequency}>
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
            </List>
        </FixedLayout>
    );
};

export { CreateHabit };
