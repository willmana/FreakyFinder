import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUser } from '../redux/app';
import LoginForm from '../components/LoginForm';
import { useMessageGetter } from '@messageformat/react';
import styles from './NavigationBar.module.scss';

const NavigationBar = () => {
    const msg = useMessageGetter('NavigationBar');
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const onClickLogout = () => {
        window.localStorage.clear();
        dispatch(setUser(null));
    };

    return (
        <div className={styles.navbarcontainer}>
            <header className={styles.margin}>
                {msg('header', { parameter: 'Test' })}
            </header>
            {user ? (
                <button className={styles.margin} onClick={onClickLogout}>
                    Kirjaudu ulos
                </button>
            ) : (
                <LoginForm />
            )}
        </div>
    );
};

export default NavigationBar;
