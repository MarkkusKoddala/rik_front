import React from 'react';
import styles from "./css/CompanyGeneralInfo.module.css";
import {formatDate} from "../../../utils/formatDate";
const CompanyGeneralInfo = ({companyData}) => {
    return (
        <div className={styles.block}>
            <h2 className={styles.pealkiri}>Üldinfo</h2>
            <div className={styles.row}>
                <div className={styles.featuredescription}> Osaühingi nimi</div>
                <div className={styles.featurevalue}>{companyData.name}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.featuredescription}> Registrikood</div>
                <div className={styles.featurevalue}>{companyData.register_code}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.featuredescription}> Asutamise kuupäev</div>
                <div className={styles.featurevalue}>{formatDate(companyData.formation_date)}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.featuredescription}> Kogukapitali suurus</div>
                <div className={styles.featurevalue}>{companyData.total_capital}</div>
            </div>
        </div>
    );
};

export default CompanyGeneralInfo;