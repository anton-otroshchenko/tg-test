import React from 'react';
import {Text, List} from "@xelene/tgui";
import styles from "./HabitHeader.module.css";

type Props = {
    title: string;
    onEdit?: () => void;
}

const HabitHeader: React.FC<Props> = ({title, onEdit}) => {
    return (
        <List className={styles.habitTitleWrapper}>
            <Text className={styles.habitTitle}>
                {title}
            </Text>
            <List className={styles.habitSubtitle}>
                <Text style={{ color: "#767683", fontSize: '12px', fontWeight: '400' }}>
                    Streak +2 | Overall 71% | 2 friends
                </Text>
                {
                    onEdit &&
                    <Text onClick={onEdit} style={{ color: "#111827", fontSize: '12px', fontWeight: '400' }}>
                        Edit
                    </Text>
                }
            </List>
        </List>
    );
};

export { HabitHeader };