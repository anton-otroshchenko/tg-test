import React from 'react';
import {Text, List} from "@xelene/tgui";
import styles from "./HabitHeader.module.css";

type Props = {
    title: string
}

const HabitHeader: React.FC<Props> = ({title}) => {
    return (
        <List className={styles.habitTitleWrapper}>
            <Text className={styles.habitTitle}>
                {title}
            </Text>
            <Text style={{ color: "#767683", fontSize: '12px', fontWeight: '400' }}>
                Streak +2 | Overall 71% | 2 friends
            </Text>
        </List>
    );
};

export { HabitHeader };