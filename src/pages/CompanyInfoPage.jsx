import React, {useEffect, useState} from 'react';
import CompanyGeneralInfo from "../components/feature/CompanyDataPage/CompanyGeneralInfo";
import CompanyShareholdersData from "../components/feature/CompanyDataPage/CompanyShareholdersData";
import styles from "./css/CompanyInfoPage.module.css"
import { useLocation } from 'react-router-dom';
import apiService from "../services/ApiService";

const CompanyInfoPage = () => {
    const {state} = useLocation();
    const [shareholders, setShareholders] = useState([])
    const [companyData, setCompanyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {

            try {
                setIsLoading(true);
                // Assuming `apiService.getCompanyData` is an async function that returns a promise
                const response = await apiService.getCompanyData(state.registerCode);
                const { shareholders, ...companyDetailsWithoutShareholders } = response;

                setShareholders(shareholders)
                setCompanyData(companyDetailsWithoutShareholders)
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch company data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if(isLoading) {
        return null
    }



    return (
        <div className={styles.block}>
            <CompanyGeneralInfo companyData={companyData}/>
            <CompanyShareholdersData shareholdersData={shareholders} registerCode={companyData.register_code}/>
        </div>
    );
};

export default CompanyInfoPage;