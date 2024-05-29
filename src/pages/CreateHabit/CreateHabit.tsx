import React from 'react';
import {Input, FixedLayout, List} from "@xelene/tgui";
import styles from "./CreateHabit.module.css";

const CreateHabit = () => {
    return (
        <FixedLayout className={styles.wrapper}>
            <List>
                <Input className={styles.input} placeholder="Title" />
                <Input className={styles.input} placeholder="Description (optional)" />
            </List>
        </FixedLayout>
    );
};

export { CreateHabit };