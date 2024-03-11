import React, { useState } from 'react';
import styles from "./css/SearchForm.module.css";

const SearchForm = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        companyCode: '',
        shareholderName: '',
        shareholderCode: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(value)
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(formData);
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.centeredForm} onSubmit={handleSubmit}>
                <div className={styles.formObjects}>
                    <div className={styles.inputGroup}>
                        <label htmlFor={"companyName"}> Osaühingu nimi </label>
                        <input
                            type={"text"}
                            id={"companyName"}
                            name={"companyName"}
                            value={formData.companyName}
                            onChange={handleChange}/>

                        <label htmlFor={"companyCode"}> Osaühingu kood </label>
                        <input
                            type={"number"}
                            id={"companyCode"}
                            name={"companyCode"}
                            value={formData.companyCode}
                            onChange={handleChange}/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor={"shareholderName"}> Osaniku nimi </label>
                        <input
                            type={"text"}
                            id={"shareholderName"}
                            name={"shareholderName"}
                            value={formData.shareholderName}
                            onChange={handleChange}/>
                        <label htmlFor={"shareholderCode"}> Osaniku kood </label>
                        <input
                            type={"number"}
                            id={"shareholderCode"}
                            name={"shareholderCode"}
                            value={formData.shareholderCode}
                            onChange={handleChange}/>
                    </div>
                </div>
                <button type={"submit"} className={styles.searchButton}> Otsi </button>
            </form>
        </div>
    );
};

export default SearchForm;
