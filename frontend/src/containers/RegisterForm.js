import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import { useMessageGetter } from '@messageformat/react';
import authApi from '../api/auth';
import Button from '../components/Button';

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
        <div className={styles.maincontainer}>
            {step === '1' ? (
                <div className={styles.formcontainer}>
                    <h2 className={styles.title}>{msg('title')}</h2>
                    <label className={styles.labeltext} htmlFor="firstname">
                        {msg('firstName')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        id="firstname"
                    ></input>
                    <label className={styles.labeltext} htmlFor="lastName">
                        {msg('lastName')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        type="text"
                        id="lastName"
                    ></input>
                    <label className={styles.labeltext} htmlFor="dateOfBirth">
                        {msg('dateOfBirth')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        value={dateOfBirth}
                        type="date"
                        id="dateOfBirth"
                    ></input>
                    <label className={styles.labeltext} htmlFor="gender">
                        {msg('gender')}
                    </label>
                    <select
                        className={styles.input}
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        id="gender"
                    >
                        <option hidden></option>
                        <option value={'1'}>Mies</option>
                        <option value={'2'}>Nainen</option>
                        <option value={'3'}>Apache Attack Helicopter</option>
                    </select>
                    <label className={styles.labeltext} htmlFor="country">
                        {msg('country')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        type="text"
                        id="country"
                    ></input>
                    <label className={styles.labeltext} htmlFor="city">
                        {msg('city')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        type="text"
                        id="city"
                    ></input>
                    <div className={styles.buttoncontainer}>
                        <div className={styles.rightbutton}>
                            <Button
                                onClick={() => onButtonClick('2')}
                                text={msg('continueButton')}
                            ></Button>
                        </div>
                    </div>
                </div>
            ) : step === '2' ? (
                <div className={styles.formcontainer}>
                    <h2 className={styles.title}>{msg('title')}</h2>
                    <label className={styles.labeltext} htmlFor="username">
                        {msg('username')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text"
                        id="username"
                    ></input>
                    <label className={styles.labeltext} htmlFor="password1">
                        {msg('password1')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setPassword1(e.target.value)}
                        value={password1}
                        type="text"
                        id="password1"
                    ></input>
                    <label className={styles.labeltext} htmlFor="password2">
                        {msg('password2')}
                    </label>
                    <input
                        className={styles.input}
                        onChange={(e) => setPassword2(e.target.value)}
                        value={password2}
                        type="text"
                        id="password2"
                    ></input>
                    <div className={styles.buttoncontainer}>
                        <div className={styles.leftbutton}>
                            <Button
                                onClick={() => onButtonClick('1')}
                                text={msg('backButton')}
                            ></Button>
                        </div>
                        <div className={styles.rightbutton}>
                            <Button
                                onClick={onClickSubmit}
                                text={msg('submitButton')}
                            ></Button>
                        </div>
                    </div>
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
