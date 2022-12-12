import React from 'react';
import styles from './FriendSearchPage.module.scss';

const FriendSearchPage = () => {
    return (
        <div className={styles.maincontainer}>
            <div>
                <h3>Ihmiset joita seuraat, seuraavat myös:</h3>
            </div>
            <div>
                <h3>Ihmiset jotka seuraavat sinua, seuraavat myös:</h3>
            </div>
        </div>
    );
};

export default FriendSearchPage;
