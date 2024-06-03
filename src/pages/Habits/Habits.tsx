import React, { useEffect } from 'react';
import { FixedLayout, Title, Text, IconButton, Spinner, List } from "@xelene/tgui";

import { ReactComponent as PlusIcon } from '../../assets/img/Plus.svg';
import { ReactComponent as SmallPlus } from '../../assets/img/small-plus.svg';
import { ReactComponent as Settings } from '../../assets/img/settings.svg';
import { ReactComponent as Friends } from '../../assets/img/friends.svg';
import { ReactComponent as Statistics } from '../../assets/img/statistics.svg';

import styles from './Habits.module.css';
import { useAppSelector } from '../../hooks';
import { store } from '../../store/store';
import { getHabits } from '../../store/habitsSlice';
import { useNavigate } from 'react-router-dom';
import clsx from "clsx";

const Habits = () => {
  const user = useAppSelector(state => state.user.user);
  console.log(user)

  useEffect(() => {
    store.dispatch(getHabits());
  }, []);

  const habits = useAppSelector(state => state.habits.items);
  console.log(habits);

  const habitsToDisplay = [
    {
      id: 1,
      title: 'Drink 50 litres of water',
      description: 'I want to drink 50 litres of water',
      updateDays: [true,true,true,true,false,true,false],
      reminderDays: [true,true,true,true,false,true,false],
      reminderTime: "2024-06-03T06:53:28.888Z",
      isArchived: false,
    }
  ];

  const navigate = useNavigate();
  const handleAddHabit = () => {
    navigate('/create-habit');
  };

  return (
    <FixedLayout>
      {1
        ?
        habitsToDisplay ?
          <FixedLayout className={clsx(styles.habits, styles.habitsList)} vertical='top'>
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
                <IconButton className={clsx(styles.button,styles.plusIcon)}>
                  <SmallPlus/>
                </IconButton>
                <Text style={{ color: "#000000", fontSize: '12px' }}>New habit</Text>
              </List>
              <List className={styles.commandMenuItem}>
                <IconButton className={clsx(styles.button,styles.friendsIcon)}>
                  <Friends/>
                </IconButton>
                <Text style={{ color: "#000000", fontSize: '12px' }}>Friends</Text>
              </List>
              <List className={styles.commandMenuItem}>
                <IconButton className={clsx(styles.button,styles.statisticsIcon)}>
                  <Statistics/>
                </IconButton>
                <Text style={{ color: "#000000", fontSize: '12px' }}>Statistics</Text>
              </List>
              <List className={styles.commandMenuItem}>
                <IconButton className={clsx(styles.button,styles.settingIcon)}>
                  <Settings/>
                </IconButton>
                <Text style={{ color: "#000000", fontSize: '12px' }}>Settings</Text>
              </List>
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
        
        :  <Spinner size="l" />
      }
    </FixedLayout>
  );
};

export { Habits };