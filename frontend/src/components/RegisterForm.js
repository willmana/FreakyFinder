import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useMessageGetter } from '@messageformat/react';
import authApi from './../api/auth';

const RegisterForm = () => {
    const [step, setStep] = useState('1');
    const msg = useMessageGetter('RegisterForm');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const onButtonClick = (step) => {
        setStep(step);
    };
    const onClickSubmit = async (event) => {
        event.preventDefault();
        try {
            const registerData = {
                first_name: firstName,
                last_name: lastName,
                date_of_birth: dateOfBirth,
                gender: gender,
                country: country,
                city: city,
                username: username,
                password: password1
            };
            await authApi.register(registerData);
            setStep('3');
        } catch (error) {}
    };
    return (
        <div>
            <p></p>
            {step === '1' ? (
                <div>
                    <h3 className={styles.title}>{msg('title')}</h3>
                    <form className={styles.formcontainer}>
                        <label>{msg('firstName')}</label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        ></input>
                        <label>{msg('lastName')}</label>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        ></input>
                        <label>{msg('dateOfBirth')}</label>
                        <input
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            value={dateOfBirth}
                            type={'date'}
                        ></input>
                        <label>{msg('gender')}</label>
                        <input
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
                        ></input>
                        <label>{msg('country')}</label>
                        <input
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                        ></input>
                        <label>{msg('city')}</label>
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        ></input>
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
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        ></input>
                        <label>{msg('password1')}</label>
                        <input
                            onChange={(e) => setPassword1(e.target.value)}
                            value={password1}
                        ></input>
                        <label>{msg('password2')}</label>
                        <input
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                        ></input>
                    </form>
                    <button onClick={() => onButtonClick('1')}>
                        {msg('backButton')}
                    </button>
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
