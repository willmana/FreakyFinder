import React from 'react';
import { useDispatch } from 'react-redux';
import { reducerTester } from '../redux/app';

const LoginForm = (params) => {
    const dispatch = useDispatch();
    const onClickLogin = () => {
        dispatch(reducerTester('hi all'));
    };

    return (
        <div>
            <form>
                <label>username</label>
                <input></input>
            </form>
            <form>
                <label>password</label>
                <input></input>
            </form>
            <button onClick={() => onClickLogin()}>Log in</button>
        </div>
    );
};

export default LoginForm;
