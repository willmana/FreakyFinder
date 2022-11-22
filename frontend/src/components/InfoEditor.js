import React, { useState } from 'react';
import styles from './InfoEditor.module.scss';
import Button from './Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const InfoEditor = ({ fieldName, fieldValue }) => {
    const [modifyOpen, setModifyOpen] = useState(false);
    const [formValue, setFormValue] = useState(fieldValue);

    const onClickModify = () => {
        setModifyOpen(true);
    };

    const onChangeValue = (e) => {
        setFormValue(e.target.value);
    };
    const onClickConfirm = () => {
        setModifyOpen(false);
    };
    const onClickClose = () => {
        setModifyOpen(false);
        setFormValue(fieldValue);
    };

    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.fieldname}>{fieldName}</div>
                {modifyOpen ? (
                    <div className={styles.formcontainer}>
                        <input
                            value={formValue}
                            onChange={onChangeValue}
                        ></input>
                        <Button
                            className={styles.confirmbutton}
                            onClick={onClickConfirm}
                            text={<CheckIcon />}
                        />
                        <Button
                            onClick={onClickClose}
                            text={<CloseIcon />}
                            className={styles.declinebutton}
                        />
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
