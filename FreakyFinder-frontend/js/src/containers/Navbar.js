import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/app';

const Navbar = () => {
    const dispatch = useDispatch();
    const onClickLogout = () => {
        window.localStorage.clear();
        dispatch(setUser(null));
    };
    return (
        <div>
            <button onClick={onClickLogout}>Kirjaudu ulos</button>
        </div>
    );
};

export default Navbar;
