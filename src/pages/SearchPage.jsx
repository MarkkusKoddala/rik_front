import React, { useEffect, useState } from 'react';
import SearchForm from "../components/feature/SearchPage/SearchForm";
import SearchResultsLayout from "../components/feature/SearchPage/SearchResultsLayout";
import ApiService from "../services/ApiService";

const initialFormState = {
    companyName: '',
    companyCode: '',
    shareholderName: '',
    shareholderCode: ''
};

const SearchPage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiService.getCompanies(initialFormState);
                setResults(response);
            } catch (error) {
                console.error('Search failed:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (formData) => {
        console.log('Searching with params:', formData);
        try {
            const response = await ApiService.getCompanies(formData);
            setResults(response);
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <SearchResultsLayout results={results} />
        </div>
    );
};

export default SearchPage;
