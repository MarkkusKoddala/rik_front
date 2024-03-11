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
    const [formData, setFormData] = useState(initialFormState);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Adjusted to fetch data using initial form state on component mount
                const response = await ApiService.getCompanies(initialFormState);
                setResults(response);
            } catch (error) {
                console.error('Search failed:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once on mount

    const handleSearch = async () => {
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
            <SearchForm setFormData={setFormData} onSearch={handleSearch} />
            <SearchResultsLayout results={results} />
        </div>
    );
};

export default SearchPage;
