import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ onClick, text, className }) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={classNames(className, styles.button)}
            >
                {text}
            </button>
        </div>
    );
};

export default Button;
