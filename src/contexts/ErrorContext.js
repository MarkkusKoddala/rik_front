// ErrorContext.js
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ErrorPopup} from "../components/feature/ErrorPopup/ErrorPopup";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState({ message: '', isVisible: false });
    const errorDisplayDuration = 3000; // in milliseconds


    const showError = (message) => {
        setError({ message, isVisible: true });
    };

    const hideError = () => {
        setError({ message: '', isVisible: false });
    };

    useEffect(() => {
        let timeoutId;
        if (error.isVisible) {
            timeoutId = setTimeout(() => {
                hideError();
            }, errorDisplayDuration);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [error.isVisible, errorDisplayDuration]);

    return (
        <ErrorContext.Provider value={{ showError, hideError }}>
            {children}
            {error.isVisible && <ErrorPopup message={error.message} onClose={hideError} />}
        </ErrorContext.Provider>
    );
};
