import React from 'react';
import { FixedLayout, Title, Text, Button } from "@xelene/tgui";

import { ReactComponent as PlusIcon} from '../../assets/img/Plus.svg';

import styles from './Habits.module.css';

const Habits = () => {
    const handleAddHabit = () => {
        window.location.href = '/create-habit';
    }

    return (
        <FixedLayout className={styles.habits} vertical='top'>
            <Title style={{ color: "var(--tgui--black)", fontSize: '24px' }} weight="1">
                👋🏻 Welcome to Name
            </Title>
            <Text style={{color: "#767683"}}>
                Add a habit to get started
            </Text>
            <Button onClick={handleAddHabit} className={styles.button} before={<PlusIcon/>}/>
        </FixedLayout>
    );
};

export { Habits };