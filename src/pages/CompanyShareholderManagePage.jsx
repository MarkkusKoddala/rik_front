// noinspection UnnecessaryLocalVariableJS

import React, {useState} from 'react';
import EditShareholders from "../components/feature/CompanyShareholderManagePage/EditShareholders";
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./css/CompanyShareholderManagePage.module.css"
import apiService from "../services/ApiService";
import {useError} from "../contexts/ErrorContext";

const CompanyShareholderManagePage = () => {
    const navigate = useNavigate()
    const {state} = useLocation();
    const [shareholders, setShareholders] = useState(state.shareholdersData)
    const {showError} = useError();


    const saveTableClicked = () => {
        let share_size_total = 0;
        const updatableShareholders = shareholders.filter(sh => {
            share_size_total += sh.share_size
            const stateShareholder = state.shareholdersData.find(s => s.identification_code === sh.identification_code);

            if (!stateShareholder) {
                return true;
            }

            return stateShareholder.share_size !== sh.share_size;
        });

        if(share_size_total < 2500) {
            showError("Osanike osa suurus kokku peab olema vähemalt 2500")
            return
        }

        apiService.updateShareholders({shareholders: updatableShareholders, registerCode: state.registerCode})
            .then(() => {
                navigate("/andmed", { state: { registerCode: state.registerCode } });
            })
            .catch(() => {
            });
    };

    return (
        <div className={styles.editBlock}>
            <EditShareholders
                shareholders={shareholders}
                handleSaveClicked= {saveTableClicked}
                setShareholders = {setShareholders}/>
        </div>
    );
};

export default CompanyShareholderManagePage;