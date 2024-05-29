import React from 'react';
import {Input, FixedLayout, List, Title} from "@xelene/tgui";
import styles from "./CreateHabit.module.css";

const CreateHabit = () => {
    return (
        <FixedLayout className={styles.wrapper} vertical='top'>
            <List>
                <Input className={styles.input} placeholder="I am usual input, just leave me alone" />
                <Input className={styles.input} placeholder="I am usual input, just leave me alone" />
            </List>
        </FixedLayout>
    );
};

export { CreateHabit };