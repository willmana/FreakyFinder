import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AltUserDisplay from '../components/AltUserDisplay';
import { getUser } from '../redux/app';
import userApi from './../api/user';
import styles from './FriendsPage.module.scss';
import { useMessageGetter } from '@messageformat/react';

const FriendsPage = () => {
    const currentUser = useSelector(getUser);
    const [section, setSection] = useState('1');
    const [followers, setFollowers] = useState([]);
    const [youFollow, setYouFollow] = useState([]);
    const msg = useMessageGetter('Friends');

    useEffect(() => {
        async function fetchFriends() {
            const res = await userApi.getFriends(currentUser.id);
            setFollowers(res.followers);
            setYouFollow(res.youFollow);
        }
        fetchFriends();
    }, [currentUser.id]);

    return (
        <div className={styles.maincontainer}>
            <h3 className={styles.title}>{msg('title')}</h3>
            <div className={styles.buttoncontainer}>
                <button
                    className={classNames(styles.button, {
                        [styles.buttonselected]: section.match('1')
                    })}
                    disabled={section.match('1')}
                    onClick={() => setSection('1')}
                >
                    {msg('follow')}
                </button>
                <button
                    className={classNames(styles.button, {
                        [styles.buttonselected]: section.match('2')
                    })}
                    disabled={section.match('2')}
                    onClick={() => setSection('2')}
                >
                    {msg('followers')}
                </button>
            </div>
            <div className={styles.uppercontainer}>
                {section.match('1')
                    ? youFollow.map((follower, i) => (
                          <div className={styles.card} key={i}>
                              <AltUserDisplay
                                  firstname={follower.first_name}
                                  lastname={follower.last_name}
                                  username={follower.username}
                                  key={i}
                              />
                          </div>
                      ))
                    : followers.map((follower, i) => (
                          <div className={styles.card} key={i}>
                              <AltUserDisplay
                                  firstname={follower.first_name}
                                  lastname={follower.last_name}
                                  username={follower.username}
                                  key={i}
                                  id={follower.id}
                                  thisUserId={currentUser.id}
                                  showFollowButton={currentUser.following.includes(
                                      follower.id
                                  )}
                              />
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default FriendsPage;
