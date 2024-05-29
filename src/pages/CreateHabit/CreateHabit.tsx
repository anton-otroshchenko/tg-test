import React, { useState } from 'react';
import { Input, FixedLayout, List, Cell, Radio } from "@xelene/tgui";
import styles from "./CreateHabit.module.css";

const CreateHabit = () => {
    const [selectedRadio, setSelectedRadio] = useState("1");

    return (
        <FixedLayout className={styles.wrapper}>
            <List>
                <Input className={styles.input} placeholder="Title" />
                <Input className={styles.input} placeholder="Description (optional)" />
                <List className={styles.radioWrapper}>
                    <Cell
                        Component="label"
                        className={selectedRadio === "1" ? styles.activeTab : styles.tab}
                        onClick={() => setSelectedRadio("1")}
                        multiline
                    >
                        First radio
                    </Cell>
                    <Cell
                        Component="label"
                        className={selectedRadio === "2" ? styles.activeTab : styles.tab}
                        onClick={() => setSelectedRadio("2")}
                        multiline
                    >
                        Second radio
                    </Cell>
                </List>
            </List>
        </FixedLayout>
    );
};

export { CreateHabit };
