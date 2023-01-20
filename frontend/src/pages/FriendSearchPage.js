import React, { useEffect, useState } from 'react';
import styles from './FriendSearchPage.module.scss';
import userApi from './../api/user';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/app';
import SuggestionCard from '../components/SuggestionCard';
import { useHorizontalScroll } from './../utils/useHorizontalScroll';

const FriendSearchPage = () => {
    const [firstRecommendations, setFirstRecommendations] = useState([]);
    const [secondRecommendations, setSecondRecommendations] = useState([]);
    const user = useSelector(getUser);
    useEffect(() => {
        async function fetchRecommendations() {
            const response = await userApi.getRecommendations(user.id);
            setFirstRecommendations(response.followYouFollowAlso);
            setSecondRecommendations(response.youFollowFollowAlso);
        }
        fetchRecommendations();
    }, [user.id]);
    const scrollRef1 = useHorizontalScroll();
    const scrollRef2 = useHorizontalScroll();
    return (
        <div className={styles.maincontainer}>
            <div className={styles.midbox}>
                <h3 className={styles.title}>
                    Ihmiset joita seuraat, seuraavat myös:
                </h3>
                <div className={styles.uppercontainer}>
                    <div className={styles.scrollercontainer} ref={scrollRef1}>
                        {firstRecommendations &&
                            firstRecommendations.map((recommendation, i) => (
                                <SuggestionCard
                                    user={recommendation}
                                    key={`firstcard-${i}`}
                                />
                            ))}
                    </div>
                </div>
                <h3 className={styles.title}>
                    Ihmiset jotka seuraavat sinua, seuraavat myös:
                </h3>
                <div className={styles.uppercontainer}>
                    <div className={styles.scrollercontainer} ref={scrollRef2}>
                        {secondRecommendations &&
                            secondRecommendations.map((recommendation, i) => (
                                <SuggestionCard
                                    user={recommendation}
                                    key={`secondcard-${i}`}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendSearchPage;
