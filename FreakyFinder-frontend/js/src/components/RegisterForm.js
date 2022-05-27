import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useMessageGetter } from '@messageformat/react';

const RegisterForm = () => {
    const [step, setStep] = useState('1');
    const msg = useMessageGetter('RegisterForm');
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [gender, setGender] = useState();
    const [country, setCountry] = useState();
    const [city, setCity] = useState();
    const [username, setUsername] = useState();
    const [password1, setPassword1] = useState();
    const [password2, setPassword2] = useState();

    const onButtonClick = (step) => {
        setStep(step);
    };

    console.log(step);
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
                    <button onClick={() => onButtonClick('2')}>
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
                    <button onClick={() => onButtonClick('1')}>
                        {msg('backButton')}
                    </button>
                    <button onClick={() => onButtonClick('3')}>
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
