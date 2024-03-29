import React, { useState } from 'react';
import styles from './InfoEditor.module.scss';
import Button from './Button';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { updateAndFetch } from '../redux/app';
import { useMessageGetter } from '@messageformat/react';

const InfoEditor = ({ fieldName, fieldValue, userId, fieldText }) => {
    const [modifyOpen, setModifyOpen] = useState(false);
    const [formValue, setFormValue] = useState(fieldValue);
    const msg = useMessageGetter('Settings.personal');
    const dispatch = useDispatch();
    const onClickModify = () => {
        setModifyOpen(true);
    };

    const onChangeValue = (e) => {
        setFormValue(e.target.value);
    };
    const onClickConfirm = async () => {
        if (formValue.length > 20 || formValue.length < 3) {
            window.alert(msg('error'));
            return;
        }
        const requestBody = {
            userId: userId,
            updatedvalue: formValue,
            fieldname: fieldName
        };
        dispatch(updateAndFetch(userId, requestBody));
        setModifyOpen(false);
    };
    const onClickClose = () => {
        setModifyOpen(false);
        setFormValue(fieldValue);
    };

    return (
        <>
            <div className={styles.maincontainer}>
                <div className={styles.fieldname}>{fieldText}</div>
                {modifyOpen ? (
                    <div className={styles.formcontainer}>
                        <div className={styles.searchcontainer}>
                            <input
                                className={styles.forminput}
                                value={formValue}
                                onChange={onChangeValue}
                            ></input>
                        </div>
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
                        <div className={styles.searchcontainer}>
                            <div className={styles.fieldvalue}>
                                {fieldValue}
                            </div>
                        </div>
                        <Button
                            text={msg('edit')}
                            onClick={onClickModify}
                            className={styles.editbutton}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default InfoEditor;
