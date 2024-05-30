import React from 'react';
import styles from "../CreateHabit.module.css";
import {Button, Cell, FixedLayout, List, Text} from "@xelene/tgui";
import {reminderDaysOptions} from "../contants";
import { ReactComponent as CheckIcon } from '../../../assets/img/check.svg'

type Props = {
    reminderDaysPicked: boolean[];
    handleReminderDayPick: (index: number) => void;
    handleReminderDaysPickerClose: () => void;
}

const DayPicker: React.FC<Props> = ({
    reminderDaysPicked,
    handleReminderDayPick, handleReminderDaysPickerClose
                                    }) => {
    return (
        <FixedLayout className={styles.wrapper}>
            <List className={styles.reminderDays}>
                {
                    reminderDaysOptions.map((option, index) => (
                        <Cell onClick={() => handleReminderDayPick(index)} className={styles.reminderDay} key={option}>
                            <Text>{option}</Text>
                            {reminderDaysPicked[index] &&
                                <CheckIcon />
                            }
                        </Cell>
                    ))
                }
            </List>
            <Button className={styles.saveButton} onClick={handleReminderDaysPickerClose}>
                Save
            </Button>
        </FixedLayout>
    );
};

export default DayPicker;