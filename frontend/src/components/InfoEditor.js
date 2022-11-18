import React, { useState } from 'react';
import styles from './InfoEditor.module.scss';
import Button from './Button';

const InfoEditor = ({ fieldName, fieldValue }) => {
    const [modifyOpen, setModifyOpen] = useState(false);
    const [formValue, setFormValue] = useState(fieldValue);
    const onClickModify = () => {
        setModifyOpen(true);
    };

    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.fieldname}>{fieldName}</div>
                {modifyOpen ? (
                    <div>
                        <input value={formValue}></input>
                        <button></button>
                        <button></button>
                    </div>
                ) : (
                    <div className={styles.infocontainer}>
                        <div>{fieldValue}</div>
                        <Button text={'Muokkaa'} onClick={onClickModify} />
                    </div>
                )}
            </div>
        </>
    );
};

export default InfoEditor;
