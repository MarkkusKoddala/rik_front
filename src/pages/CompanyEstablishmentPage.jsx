import React, {useState} from 'react';
import EstablishmentGeneralInfo from "../components/feature/CompanyEstablishmentPage/EstablishmentGeneralInfo";
import styles from "./css/CompanyEstablishmentPage.module.css"
import EstablishmentShareholdersData
    from "../components/feature/CompanyEstablishmentPage/EstablishmentShareholdersData";
import {useError} from "../contexts/ErrorContext";
import apiService from "../services/ApiService";
import {useNavigate} from "react-router-dom";
const CompanyEstablishmentPage = () => {
    const [companyInformation, setCompanyInformation]= useState({
        companyName: "",
        registerCode: "",
        establishmentDate: "",
        totalCapital:  0,
        shareholders: [{
            name: "",
            shareSize: 0,
            isFounder: true,
            id: null
        }]
    })
    const {showError} = useError();
    const navigate = useNavigate();



    const handleShareholdersData = (shareholdersArray) => {
        setCompanyInformation(prevState => ({
            ...prevState,
            shareholders: shareholdersArray,
            totalCapital: shareholdersArray.reduce((accumulator, shareholder) => {
                return accumulator + shareholder.shareSize;
            }, 0)
        }));
    };

    const saveClicked = () => {

        if (companyInformation.companyName.length < 3 || companyInformation.companyName.length > 100 ) {
            showError("Ettevõtte nimi peab jääma vahemikku 3 kuni 100 tähemärki")
            return;
        } else if (companyInformation.registerCode.toString().length !== 7){
            showError("Ettevõtte registrikood peab olema 7 numbrit pikk")
            return;
        } else if (companyInformation.establishmentDate > new Date().getTime() || companyInformation.establishmentDate.length === 0){
            showError("Ettevõtte registreerimiskuupäev ei tohi olla hilisem kui tänane kuupäev")
            return;
        } else if (companyInformation.totalCapital < 2500){
            showError("Ettevõtte kogukapital peab ületama 2500 eurot")
            return;
        } else if (!Number.isInteger(companyInformation.totalCapital)){
            showError("Ettevõtte kogukapital peab olema täisarv")
            return;
        }

        console.log(companyInformation)

        apiService.addCompany(companyInformation)
            .then(response => {
                console.log(response)
                navigate("/andmed", { state: { registerCode: companyInformation.registerCode } });

            })
            .catch(error => {
                showError(error.message);
            });


    }

    return (
        <div className={styles.block}>
            <EstablishmentGeneralInfo
                setCompanyInformation={setCompanyInformation}
                totalCapital={companyInformation.totalCapital}
            />
            <EstablishmentShareholdersData
                handleShareholdersData={handleShareholdersData}
            />
            <button onClick={saveClicked} className={styles.saveButton}> Salvesta </button>
        </div>
    );
};

export default CompanyEstablishmentPage;