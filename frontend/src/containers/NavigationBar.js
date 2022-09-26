import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUser } from '../redux/app';
import LoginForm from '../components/LoginForm';
import { useMessageGetter } from '@messageformat/react';
import styles from './NavigationBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../components/Button';

const NavigationBar = ({ onChangeLocale }) => {
    const msg = useMessageGetter('NavigationBar');
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const onClickLogout = () => {
        window.localStorage.clear();
        dispatch(setUser(null));
    };

    return (
        <div className={styles.navbarcontainer}>
            <header className={styles.header}>
                {msg('header', { parameter: 'Test' })}
            </header>
            <div className={styles.middlecontainer}>
                <div className={styles.searchcontainer}>
                    <input
                        className={styles.searchinput}
                        placeholder={msg('search.placeHolder')}
                    />
                    <div className={styles.searchdivider}></div>
                    <button className={styles.searchbutton}>
                        <SearchIcon />
                    </button>
                </div>
            </div>
            <div className={styles.rightcontainer}>
                <div className={styles.localecontainer}>
                    <button
                        onClick={() => onChangeLocale('fi')}
                        className={styles.localebutton}
                    >
                        {msg('localeFi')}
                    </button>
                    <div className={styles.localedivider}></div>
                    <button
                        onClick={() => onChangeLocale('en')}
                        className={styles.localebutton}
                    >
                        {msg('localeEn')}
                    </button>
                </div>
                {user ? (
                    <Button
                        className={styles.margin}
                        onClick={onClickLogout}
                        text={'Kirjaudu ulos'}
                    />
                ) : (
                    <LoginForm />
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
