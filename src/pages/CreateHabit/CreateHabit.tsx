import React, { useState } from 'react';
import {Input, FixedLayout, List, Cell, Title, Button, Text, IconButton} from "@xelene/tgui";
import styles from "./CreateHabit.module.css";
import clsx from "clsx";
import {
    DesktopTimePicker,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { ReactComponent as NotificationIcon } from '../../assets/img/notification.svg'
import { ReactComponent as CheckIcon } from '../../assets/img/check.svg'
import { ReactComponent as PlusIcon } from '../../assets/img/Plus.svg'

const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const allActiveDays = [true, true, true, true, true, true, true];
const reminderDaysOptions= ['Every Monday', 'Every Tuesday', 'Every Wednesday', 'Every Thursday', 'Every Friday', 'Every Saturday', 'Every Sunday'];

const CreateHabit = () => {
    const [selectedRadio, setSelectedRadio] = useState(1);
    const [activeDays, setActiveDays] = useState(allActiveDays);
    const [isReminderDaysPickerOpened, setIsReminderDaysPickerOpened] = useState(false);
    const [reminderDaysPicked, setReminderDaysPicked] = useState(allActiveDays);

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

    const handleReminderDaysPickerOpen = () => {
        setIsReminderDaysPickerOpened(true);
    }

    const handleReminderDaysPickerClose = () => {
        if (!reminderDaysPicked.some(isPicked => isPicked)) {
            setReminderDaysPicked(allActiveDays);
        }
        setIsReminderDaysPickerOpened(false);
    }

    const handleReminderDayPick = (index: number) => {
        const newReminderDaysPicker = reminderDaysPicked.map((isActive, i) =>
            i === index ? !isActive : isActive
        );
        setReminderDaysPicked(newReminderDaysPicker);
    }

    const handleGetReminderDaysText = () => {
        if (reminderDaysPicked.every(isPicked => isPicked)) {
            return 'Every day';
        }
        const selectedDays = reminderDaysOptions.filter((day, index) => reminderDaysPicked[index]);
        return selectedDays.join(', ');
    };


    if(isReminderDaysPickerOpened){
        return (
            <FixedLayout className={styles.wrapper}>
                <List className={styles.reminderDays}>
                    {
                        reminderDaysOptions.map((option, index) => (
                            <Cell onClick={()=>handleReminderDayPick(index)} className={styles.reminderDay} key={option}>
                                <Text>{option}</Text>
                                {reminderDaysPicked[index]&&
                                    <CheckIcon/>
                                }
                            </Cell>
                        ))
                    }
                </List>
                <Button className={styles.saveButton} onClick={handleReminderDaysPickerClose}>
                    Save
                </Button>
            </FixedLayout>
        )
    }

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
                    <List className={styles.reminders}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopTimePicker
                                value={new Date()}
                                ampm={false}
                                views={['hours', 'minutes']}
                            />
                        </LocalizationProvider>
                        <Button onClick={()=>handleReminderDaysPickerOpen()} className={styles.button} before={<NotificationIcon/>}>
                            {
                                handleGetReminderDaysText()
                            }
                        </Button>
                    </List>
                </List>
                <List className={styles.friendsWrapper}>
                    <Title className={styles.title}>Share with friends</Title>
                    <IconButton className={styles.plusButton}><PlusIcon/></IconButton>
                </List>
            </List>
            <Button className={styles.saveButton}>
                Create
            </Button>
        </FixedLayout>
    );
};

export { CreateHabit };
