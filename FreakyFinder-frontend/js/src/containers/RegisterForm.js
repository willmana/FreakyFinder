import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useMessageGetter } from '@messageformat/react';

export const RegisterForm = () => {
    const [step, setStep] = useState('1');
    const msg = useMessageGetter('RegisterForm');

    const onClickContinue = () => {
        setStep('2');
    };
    const onClickReturn = () => {
        setStep('1');
    };
    const onClickSubmit = () => {
        setStep('3');
    };
    return (
        <div>
            <p></p>
            {step === '1' ? (
                <div>
                    <h3 className={styles.title}>{msg('title')}</h3>
                    <form className={styles.formcontainer}>
                        <label>{msg('firstName')}</label>
                        <input></input>
                        <label>{msg('lastName')}</label>
                        <input></input>
                        <label>{msg('dateOfBirth')}</label>
                        <input></input>
                        <label>{msg('gender')}</label>
                        <input></input>
                        <label>{msg('country')}</label>
                        <input></input>
                        <label>{msg('city')}</label>
                        <input></input>
                    </form>
                    <button onClick={onClickContinue}>
                        {msg('continueButton')}
                    </button>
                </div>
            ) : step === '2' ? (
                <div>
                    <h3 className={styles.title}>{msg('title')}</h3>
                    <form className={styles.formcontainer}>
                        <label>{msg('username')}</label>
                        <input></input>
                        <label>{msg('password1')}</label>
                        <input></input>
                        <label>{msg('password2')}</label>
                        <input></input>
                    </form>
                    <button onClick={onClickReturn}>{msg('backButton')}</button>
                    <button onClick={onClickSubmit}>
                        {msg('submitButton')}
                    </button>
                </div>
            ) : (
                step === '3' && (
                    <div>
                        <h3 className={styles.title}>
                            {msg('successTitle', { firstname: 'jäbä' })}
                        </h3>
                        <p>
                            {msg('successDescription', {
                                username: 'käyttäjä'
                            })}
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default RegisterForm;
