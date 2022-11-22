import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({ onClick, text, className, ...rest }) => {
    return (
        <button
            onClick={onClick}
            className={classNames(className, styles.button)}
            {...rest}
        >
            {text}
        </button>
    );
};

export default Button;
