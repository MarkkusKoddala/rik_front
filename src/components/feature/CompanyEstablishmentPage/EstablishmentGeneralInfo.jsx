import React from 'react';
import styles from './css/EstablishmentGeneralInfo.module.css'; // Ensure you have the correct path to your CSS module file

const EstablishmentGeneralInfo = ({setCompanyInformation, totalCapital}) => {

    const handleChange = (event) => {
        const { name, value, type  } = event.target;

        if (name === "establishmentDate" && value) {
            const dateObject = new Date(value);

            setCompanyInformation(prevState => ({
                ...prevState,
                [name]: dateObject,
            }));
        } else {
            setCompanyInformation(prevState => ({
                ...prevState,
                [name]: type === 'number' ? Number(value) : value,
            }));
        }
    };


    return (
        <div className={styles.block}>
            <h2>Osaühingu asutamise vorm</h2>
            <h3>Üldinfo</h3>
            <div className={styles.inputGroup}>
                <label htmlFor="companyName" className={styles.label}>Osaühingu nimi</label>
                <input id="companyName"
                       name="companyName"
                       type="text"
                       onChange={handleChange}
                       className={styles.input}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="registerCode" className={styles.label}>Registrikood</label>
                <input id="registerCode"
                       name="registerCode"
                       type="number"
                       className={styles.input}
                       onChange={handleChange}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="establishmentDate" className={styles.label}>Asutamiskuupäev</label>
                <input id="establishmentDate"
                       name="establishmentDate"
                       type="date"
                       className={styles.input}
                       onChange={handleChange}/>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="totalCapital" className={styles.label}>Kogukapitali suurus (€)</label>
                <input id="totalCapital"
                       name="totalCapital"
                       type="number"
                       value={totalCapital !== null ? totalCapital.toString() : ''}
                       className={styles.input}
                       onChange={handleChange}
                       readOnly
                />
            </div>
        </div>
    );
};

export default EstablishmentGeneralInfo;
