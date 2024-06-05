import React, { useEffect, useState } from 'react';
import { FixedLayout, Title, Text, IconButton, Spinner, List } from "@xelene/tgui";

import { ReactComponent as PlusIcon } from '../../assets/img/Plus.svg';
import { ReactComponent as SmallPlus } from '../../assets/img/small-plus.svg';
import { ReactComponent as Settings } from '../../assets/img/settings.svg';
import { ReactComponent as Friends } from '../../assets/img/friends.svg';
import { ReactComponent as Statistics } from '../../assets/img/statistics.svg';
import { ReactComponent as WhiteCheck } from '../../assets/img/check-white.svg';
import { ReactComponent as CrossIcon } from '../../assets/img/cross.svg';
import { ReactComponent as MissIcon } from '../../assets/img/miss.svg';

import styles from './Habits.module.css';
import { useAppSelector } from '../../hooks';
import { store } from '../../store/store';
import { getHabits } from '../../store/habitsSlice';
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";
import { days } from "../../constants/constants";
import { HabitHeader } from "../../components/HabitHeader/HabitHeader";
import StatusPicker from "../../components/StatusPicker/StatusPicker";

type DayStatus = 'completed' | 'not_completed' | 'miss';

const dayStatusToClassName: Record<DayStatus, string> = {
  completed: styles.checkIcon,
  not_completed: styles.crossIcon,
  miss: styles.missIcon,
};

const Habits = () => {
  const user = useAppSelector(state => state.user.user);
  console.log(user);

  useEffect(() => {
    store.dispatch(getHabits());
  }, []);

  // const habits = useAppSelector(state => state.habits.items);

  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [pickerPosition, setPickerPosition] = useState<{ top: number, left: number } | null>(null);

  const handleClickOutside = () => {
    setSelectedHabitId(null);
    setSelectedDayId(null);
    setPickerPosition(null);
  };

  console.log(selectedDayId);

  const handleRenderIcon = (icon: string) => {
    switch (icon) {
      case "completed": {
        return <WhiteCheck />;
      }
      case "not_completed": {
        return <CrossIcon />;
      }
      case "miss": {
        return <MissIcon />;
      }
    }
  };

  const [habitsToDisplay, setHabitsToDisplay] = useState([
    {
      id: 1,
      title: 'Drink 50 litres of water',
      description: 'I want to drink 50 litres of water',
      updateDays: [true, true, true, true, false, true, false],
      reminderDays: [true, true, true, true, false, true, false],
      reminderTime: "2024-06-03T06:53:28.888Z",
      isArchived: false,
      days: ['completed', 'not_completed', '', '', '', '', '']
    },
    {
      id: 2,
      title: 'Drink 52 litres of water',
      description: 'I want to drink 50 litres of water',
      updateDays: [true, true, true, true, false, true, false],
      reminderDays: [true, true, true, true, false, true, false],
      reminderTime: "2024-06-03T06:53:28.888Z",
      isArchived: false,
      days: ['', 'miss', '', '', '', '', '']
    },
  ]);

  const navigate = useNavigate();
  const handleAddHabit = () => {
    navigate('/create-habit');
  };

  const navigateToHabit = (id: number) => {
    navigate(`/habit/${id}`);
  };

  const handleDayClick = (habitId: number, dayIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedHabitId(habitId);
    setSelectedDayId(dayIndex);

    const rect = event.currentTarget.getBoundingClientRect();
    const pickerWidth = 160; // Adjust this value based on the actual width of the StatusPicker
    let left = rect.left - 20;

    // Check if the picker will overflow the window
    if (rect.left + pickerWidth > window.innerWidth) {
      left = window.innerWidth - pickerWidth - 10; // Adjust the value for padding/margin
    }

    setPickerPosition({ top: rect.bottom + 15, left });
  };

  const handleStatusChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, status: string) => {
    event.stopPropagation();
    const newHabits = [...habitsToDisplay];
    if (selectedHabitId !== null && selectedDayId !== null) {
      const habitIndex = newHabits.findIndex(habit => habit.id === selectedHabitId);
      if (habitIndex !== -1) {
        newHabits[habitIndex].days[selectedDayId] = status;
        setHabitsToDisplay(newHabits);
        setSelectedDayId(null);
        setSelectedHabitId(null);
        setPickerPosition(null);
      }
    }
  };

  return (
      <FixedLayout>
        {1
            ?
            habitsToDisplay ?
                <FixedLayout className={clsx(styles.habits, styles.habitsDashboard)} vertical='top'>
                  <List className={styles.progress}>
                    <Text style={{ color: "#000000", fontSize: '12px', fontWeight: '600' }}>
                      Your Progress
                    </Text>
                    <Text className={styles.percent}>
                      50%
                    </Text>
                  </List>
                  <List className={styles.commandMenu}>
                    <List className={styles.commandMenuItem}>
                      <IconButton className={clsx(styles.button, styles.plusIcon)} onClick={handleAddHabit}>
                        <SmallPlus />
                      </IconButton>
                      <Text style={{ color: "#000000", fontSize: '12px' }}>New habit</Text>
                    </List>
                    <List className={styles.commandMenuItem}>
                      <IconButton className={clsx(styles.button, styles.friendsIcon)}>
                        <Friends />
                      </IconButton>
                      <Text style={{ color: "#000000", fontSize: '12px' }}>Friends</Text>
                    </List>
                    <List className={styles.commandMenuItem}>
                      <IconButton className={clsx(styles.button, styles.statisticsIcon)}>
                        <Statistics />
                      </IconButton>
                      <Text style={{ color: "#000000", fontSize: '12px' }}>Statistics</Text>
                    </List>
                    <List className={styles.commandMenuItem}>
                      <IconButton className={clsx(styles.button, styles.settingIcon)}>
                        <Settings />
                      </IconButton>
                      <Text style={{ color: "#000000", fontSize: '12px' }}>Settings</Text>
                    </List>
                  </List>
                  <List className={styles.habitsList}>
                    {habitsToDisplay.map((habit) => (
                        <List onClick={() => navigateToHabit(habit.id)} className={styles.habitsListItem} key={habit.id}>
                          <HabitHeader title={habit.title} />
                          <List className={styles.daysWrapper}>
                            <List className={styles.daysList}>
                              {habit.days.map((day, index) => (
                                  <List className={styles.day} onClick={(event) => handleDayClick(habit.id, index, event)} key={index}>
                                    {
                                      day ?
                                          <IconButton className={clsx(styles.button, dayStatusToClassName[day as DayStatus])}>
                                            {handleRenderIcon(day)}
                                          </IconButton>
                                          :
                                          <div className={styles.emptyDay} />
                                    }
                                    <Text style={{
                                      color: "#767683",
                                      fontSize: '14px',
                                    }}>
                                      {days[index]}
                                    </Text>
                                  </List>
                              ))}
                            </List>
                            {selectedHabitId === habit.id && selectedDayId !== null && pickerPosition && (
                                <div style={{ position: 'absolute', top: pickerPosition.top, left: pickerPosition.left }}>
                                  <StatusPicker onClick={handleStatusChange} onClickOutside={handleClickOutside} />
                                </div>
                            )}
                          </List>
                        </List>
                    ))}
                  </List>
                </FixedLayout>
                :
                <FixedLayout className={clsx(styles.habits, styles.createHabit)} vertical='top'>
                  <Title style={{ color: "var(--tgui--black)", fontSize: '24px' }} weight="1">
                    👋🏻 Welcome to w
                  </Title>
                  <Text style={{ color: "#767683" }}>
                    Add a habit to get started
                  </Text>
                  <IconButton className={styles.button} onClick={handleAddHabit}>
                    <PlusIcon />
                  </IconButton>
                </FixedLayout>
            : <Spinner size="l" />
        }
      </FixedLayout>
  );
};

export { Habits };
