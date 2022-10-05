import { useMessageGetter } from '@messageformat/react';
import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';
import MessageIcon from '@mui/icons-material/Message';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './LeftBar.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import { Path } from '../constants';

const LeftBar = (props) => {
    const user = useSelector(getUser);
    const msg = useMessageGetter('LeftBar');
    return (
        <div className={styles.buttoncontainer}>
            <Link
                className={styles.button}
                to={`${Path.profile}/${user.username}`}
            >
                <AccountBoxIcon /> <p>{msg('profile')}</p>
            </Link>
            <div className={styles.divider}></div>
            <Link className={styles.button} to={Path.front}>
                <NewspaperIcon /> <p>{msg('feed')}</p>
            </Link>
            <div className={styles.divider}></div>
            <Link className={styles.button} to={Path.friends}>
                <PeopleIcon /> <p>{msg('friends')}</p>
            </Link>
            <div className={styles.divider}></div>
            <Link className={styles.button} to={Path.messages}>
                <MessageIcon /> <p>{msg('messages')}</p>
            </Link>
            <div className={styles.divider}></div>
            <Link className={styles.button} to={Path.finder}>
                <PersonSearchIcon /> <p>{msg('findContacts')}</p>
            </Link>
            <div className={styles.divider}></div>
            <Link className={styles.button} to={Path.settings}>
                <SettingsIcon /> <p>{msg('settings')}</p>
            </Link>
        </div>
    );
};

LeftBar.propTypes = {};

export default LeftBar;
