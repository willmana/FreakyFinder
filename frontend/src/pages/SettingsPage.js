import React from 'react';
import InfoEditor from '../components/InfoEditor';
import styles from './SettingsPage.module.scss';
import { useSelector } from 'react-redux';
import { getUser } from './../redux/app';
import PasswordUpdater from '../components/PasswordUpdater';
import UserDeletor from './../components/UserDeletor';
import { useMessageGetter } from '@messageformat/react';

const SettingsPage = () => {
    const user = useSelector(getUser);
    const msg = useMessageGetter('Settings');
    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.midbox}>
                    <h3 className={styles.title}>{msg('personal.title')}</h3>
                    <InfoEditor
                        fieldName={'first_name'}
                        fieldValue={user.first_name}
                        userId={user.id}
                        fieldText={msg('personal.firstName')}
                    />
                    <InfoEditor
                        fieldName={'last_name'}
                        fieldValue={user.last_name}
                        userId={user.id}
                        fieldText={msg('personal.lastName')}
                    />
                    <InfoEditor
                        fieldName={'username'}
                        fieldValue={user.username}
                        userId={user.id}
                        fieldText={msg('personal.username')}
                    />
                    <InfoEditor
                        fieldName={'country'}
                        fieldValue={user.country}
                        userId={user.id}
                        fieldText={msg('personal.country')}
                    />
                    <InfoEditor
                        fieldName={'city'}
                        fieldValue={user.city}
                        userId={user.id}
                        fieldText={msg('personal.city')}
                    />
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>{msg('password.title')}</h3>
                    <PasswordUpdater
                        username={user.username}
                        userId={user.id}
                    />
                    <div className={styles.divider}></div>
                    <h3 className={styles.title}>{msg('delete.title')}</h3>
                    <UserDeletor userId={user.id} />
                </div>
            </div>
        </>
    );
};

export default SettingsPage;
