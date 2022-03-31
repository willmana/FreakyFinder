import React from 'react';
import styles from './RegisterForm.module.scss';

export const RegisterForm = () => {
    return (
        <div className={styles.formcontainer}>
            <h3 className={styles.title}>Rekisteröidy</h3>
            <form className={styles.inputrow}>
                <label>username: </label>
                <input></input>
            </form>
            <form className={styles.inputrow}>
                <label>password: </label>
                <input></input>
            </form>
            <form className={styles.inputrow}>
                <label>repeat password: </label>
                <input></input>
            </form>
            <button>Rekisteröidy</button>
        </div>
    );
};

export default RegisterForm;
