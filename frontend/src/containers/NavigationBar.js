import { useDispatch, useSelector } from 'react-redux';
import { getUser, searchAndUpdate, setUser } from '../redux/app';
import LoginForm from '../components/LoginForm';
import { useLocales, useMessageGetter } from '@messageformat/react';
import styles from './NavigationBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../components/Button';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Path } from '../constants';

const NavigationBar = ({ onChangeLocale }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const msg = useMessageGetter('NavigationBar');
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onClickLogout = () => {
        window.localStorage.clear();
        dispatch(setUser(null));
        navigate('/');
    };
    const locales = useLocales();
    const onChangeSearchQuery = (e) => {
        setSearchQuery(e.target.value);
    };
    const onClickSearch = (e) => {
        e.preventDefault();
        dispatch(searchAndUpdate(searchQuery));
        setSearchQuery('');
        navigate(Path.results);
    };
    return (
        <div className={styles.navbarcontainer}>
            <header className={styles.header}>
                {msg('header', { parameter: '' })}
                {user && <small> Logged in as {user.username}</small>}
            </header>
            {user ? (
                <div className={styles.middlecontainer}>
                    <div className={styles.searchcontainer}>
                        <input
                            className={styles.searchinput}
                            placeholder={msg('search.placeHolder')}
                            value={searchQuery}
                            onChange={onChangeSearchQuery}
                            autoComplete="off"
                        />
                        <div className={styles.searchdivider}></div>
                        <button
                            className={styles.searchbutton}
                            onClick={onClickSearch}
                        >
                            <SearchIcon />
                        </button>
                    </div>
                </div>
            ) : (
                <LoginForm />
            )}
            <div className={styles.rightcontainer}>
                <div className={styles.localecontainer}>
                    <button
                        onClick={() => onChangeLocale('fi')}
                        className={classNames(styles.localebutton, {
                            [styles.localebuttonselected]: locales[0] === 'fi'
                        })}
                    >
                        {msg('localeFi')}
                    </button>
                    <div className={styles.localedivider}></div>
                    <button
                        onClick={() => onChangeLocale('en')}
                        className={classNames(styles.localebutton, {
                            [styles.localebuttonselected]: locales[0] === 'en'
                        })}
                    >
                        {msg('localeEn')}
                    </button>
                </div>
                {user && (
                    <Button
                        className={styles.margin}
                        onClick={onClickLogout}
                        text={'Kirjaudu ulos'}
                    />
                )}
            </div>
        </div>
    );
};

export default NavigationBar;
