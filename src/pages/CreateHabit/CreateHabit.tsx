import React, { useState } from 'react';
import { Input, FixedLayout, List, Cell, Title, Button, IconButton } from "@xelene/tgui";
import styles from "./CreateHabit.module.css";
import clsx from "clsx";
import {
  DesktopTimePicker,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useForm } from "react-hook-form";

import { ReactComponent as NotificationIcon } from '../../assets/img/notification.svg';
import { ReactComponent as PlusIcon } from '../../assets/img/Plus.svg';
import { allActiveDays, days, reminderDaysOptions } from "../../constants/constants";
import DayPicker from "./components/DayPicker";
import { store } from '../../store/store';
import { createHabit } from '../../store/habitsSlice';

type FormFields = "title" | "description" | "updateDays" | "reminderDays" | "isArchived" | "reminderTime" | "friends";
  // | `updateDays.${number}` | `reminderDays.${number}` | `friends.${number}` | `friends.${number}.friendTgId`; doesn't work for some reason

const CreateHabit = () => {
  const [selectedRadio, setSelectedRadio] = useState(1);
  const [activeDays, setActiveDays] = useState(allActiveDays);
  const [isReminderDaysPickerOpened, setIsReminderDaysPickerOpened] = useState(false);
  const [reminderDaysPicked, setReminderDaysPicked] = useState(allActiveDays);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: '',
      description: '',
      updateDays: allActiveDays,
      reminderDays: allActiveDays,
      reminderTime: new Date().toISOString(),
      isArchived: false,
      friends: [],
    }
  });

  const handleSelectAllDays = () => {
    setSelectedRadio(1);
    setActiveDays(allActiveDays);
    setValue('updateDays', allActiveDays);
  };

  const handleToggleActiveDay = (index: number) => {
    const newActiveDays = activeDays.map((isActive, i) =>
      i === index ? !isActive : isActive
    );
    setActiveDays(newActiveDays);
    setValue('updateDays', newActiveDays);
  };

  const handleReminderDaysPickerOpen = () => {
    setIsReminderDaysPickerOpened(true);
  };

  const handleReminderDaysPickerClose = () => {
    if (!reminderDaysPicked.some(isPicked => isPicked)) {
      setReminderDaysPicked(allActiveDays);
    }
    setIsReminderDaysPickerOpened(false);
    setValue('reminderDays', reminderDaysPicked);
  };

  const handleReminderDayPick = (index: number) => {
    const newReminderDaysPicker = reminderDaysPicked.map((isActive, i) =>
      i === index ? !isActive : isActive
    );
    setReminderDaysPicked(newReminderDaysPicker);
  };

  const handleGetReminderDaysText = () => {
    if (reminderDaysPicked.every(isPicked => isPicked)) {
      return 'Every day';
    }
    const selectedDays = reminderDaysOptions.filter((day, index) => reminderDaysPicked[index]);
    return selectedDays.join(', ');
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    store.dispatch(createHabit(data));
  };

  const handleTimeChange = (newTime: Date | null) => {
    setValue('reminderTime', newTime?.toISOString() as string);
  };

  const handleInputChange = (field: FormFields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value);
  };


  if (isReminderDaysPickerOpened) {
    return (
      <DayPicker reminderDaysPicked={reminderDaysPicked} handleReminderDayPick={handleReminderDayPick} handleReminderDaysPickerClose={handleReminderDaysPickerClose} />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FixedLayout className={styles.wrapper}>
        <List>
          <Input
            className={styles.input}
            placeholder="Title"
            {...register("title")}
            onChange={handleInputChange('title')}
          />

          <Input
            className={styles.input}
            placeholder="Description (optional)"
            {...register("description")}
            onChange={handleInputChange('description')}
          />

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
                  onChange={handleTimeChange}
                  ampm={false}
                  views={['hours', 'minutes']}
                />
              </LocalizationProvider>
              <Button onClick={handleReminderDaysPickerOpen} className={styles.button} before={<NotificationIcon />}>
                {handleGetReminderDaysText()}
              </Button>
            </List>
          </List>

          <List className={styles.friendsWrapper}>
            <Title className={styles.title}>Share with friends</Title>
            <IconButton type='button' className={styles.plusButton}><PlusIcon /></IconButton>
          </List>
        </List>

        <Button type="submit" className={styles.saveButton}>
          Create
        </Button>
      </FixedLayout>
    </form>
  );
};

export { CreateHabit };
