import React from 'react';
import styles from './ErrorPopup.module.css'; // Make sure the path is correct

export const ErrorPopup = ({ message, onClose }) => {
    return (
        <div className={styles.errorPopup}>
            <h3>Viga</h3>
            <span>{message}</span> <br/>
            <button className={styles.closeButton} onClick={onClose}>Sulge</button>
        </div>
    );
};
