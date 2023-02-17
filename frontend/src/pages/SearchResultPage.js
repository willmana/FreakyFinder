import React, { useEffect, useState } from 'react';
import styles from './SearchResultPage.module.scss';
import { useSelector } from 'react-redux';
import { getSearchResult, getUser } from '../redux/app';
import AltUserDisplay from '../components/AltUserDisplay';
import { useMessageGetter } from '@messageformat/react';

const SearchResultPage = () => {
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const searchResults = useSelector(getSearchResult);
    const currentUser = useSelector(getUser);
    const msg = useMessageGetter('Results');
    useEffect(() => {
        setDisplayedUsers(
            searchResults.filter(
                (user) => user.username !== currentUser.username
            )
        );
    }, [currentUser.username, searchResults]);
    return (
        <div className={styles.maincontainer}>
            <div className={styles.midbox}>
                <h3 className={styles.title}>{msg('title')}</h3>
                {displayedUsers && displayedUsers.length !== 0 ? (
                    <div className={styles.grid}>
                        {displayedUsers.map((user) => (
                            <AltUserDisplay
                                firstname={user.first_name}
                                lastname={user.last_name}
                                username={user.username}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.text}>{msg('noFindings')}</div>
                )}
            </div>
        </div>
    );
};

export default SearchResultPage;
