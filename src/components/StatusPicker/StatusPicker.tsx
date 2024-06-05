import React from 'react';
import styles from "../../pages/Habits/Habits.module.css";
import {IconButton, List, Text} from "@xelene/tgui";
import clsx from "clsx";
import {dayStatus} from "../../constants/constants";

import { ReactComponent as WhiteCheck } from '../../assets/img/check-white.svg';
import { ReactComponent as CrossIcon } from '../../assets/img/cross.svg';
import { ReactComponent as MissIcon } from '../../assets/img/miss.svg';
import {useOutsideClick} from "../../hooks/hooks";

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> , status: string) => void
    onClickOutside: () => void;
}

const StatusPicker: React.FC<Props> = ({
    onClick,
    onClickOutside
                                       }) => {

    const ref = useOutsideClick(onClickOutside)

    return (
        <div ref={ref} className={styles.statusModal}>
            <List className={styles.statusModalItem}>
                <IconButton onClick={(event) => onClick(event, 'completed')} className={clsx(styles.button, styles.checkIconBig)}>
                    <WhiteCheck/>
                </IconButton>
                <Text style={{
                    color: '#767683',
                    fontSize: '11px',
                }}>{dayStatus.SUCCESS}</Text>
            </List>
            <List className={styles.statusModalItem}>
                <IconButton onClick={(event) => onClick(event, 'not_completed')}  className={clsx(styles.button, styles.crossIconBig)}>
                    <CrossIcon/>
                </IconButton>
                <Text style={{
                    color: '#767683',
                    fontSize: '11px',
                }}>{dayStatus.FAIL}</Text>
            </List>
            <List className={styles.statusModalItem}>
                <IconButton onClick={(event) => onClick(event, 'miss')}  className={clsx(styles.button, styles.missIconBig)}>
                    <MissIcon/>
                </IconButton>
                <Text style={{
                    color: '#767683',
                    fontSize: '11px',
                }}>{dayStatus.SKIP}</Text>
            </List>
        </div>
    );
};

export default StatusPicker;