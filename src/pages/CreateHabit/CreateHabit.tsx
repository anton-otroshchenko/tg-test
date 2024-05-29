import React from 'react';
import {Input, FixedLayout, List} from "@xelene/tgui";
import styles from "./CreateHabit.module.css";

const CreateHabit = () => {
    return (
        <section className={styles.wrapper}>
            <List>
                <Input className={styles.input} placeholder="I am usual input, just leave me alone" />
                <Input className={styles.input} placeholder="I am usual input, just leave me alone" />
            </List>
        </section>
    );
};

export { CreateHabit };