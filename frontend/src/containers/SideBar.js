import { useMessageGetter } from '@messageformat/react';
import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './SideBar.module.scss';

const SideBar = (props) => {
    const msg = useMessageGetter('SideBar');
    return (
        <div className={styles.buttoncontainer}>
            <button className={styles.button}>
                <AccountBoxIcon /> <p>{msg('profile')}</p>
            </button>
            <div className={styles.divider}></div>
            <button className={styles.button}>
                <NewspaperIcon /> <p>{msg('feed')}</p>
            </button>
            <div className={styles.divider}></div>
            <button className={styles.button}>
                <PeopleIcon /> <p>{msg('friends')}</p>
            </button>
            <div className={styles.divider}></div>
            <button className={styles.button}>
                <MessageIcon /> <p>{msg('messages')}</p>
            </button>
            <div className={styles.divider}></div>
            <button className={styles.button}>
                <PersonSearchIcon /> <p>{msg('findContacts')}</p>
            </button>
            <div className={styles.divider}></div>
            <button className={styles.button}>
                <SettingsIcon /> <p>{msg('settings')}</p>
            </button>
        </div>
    );
};

SideBar.propTypes = {};

export default SideBar;
