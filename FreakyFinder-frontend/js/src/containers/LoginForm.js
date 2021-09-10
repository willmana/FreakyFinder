import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { consoleLogTestMessage, getTestMessage } from '../redux/app';
import { setTestMessage } from './../redux/app';

const LoginForm = (params) => {
    const dispatch = useDispatch();
    const username = useSelector(getTestMessage);
    const onChangeUserName = (event) => {
        dispatch(setTestMessage(event.target.value));
    };
    const onClickLogin = () => {
        dispatch(consoleLogTestMessage());
    };

    return (
        <div>
            <form>
                <label>username</label>
                <input onChange={onChangeUserName} value={username}></input>
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
