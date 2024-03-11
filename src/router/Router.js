import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SearchPage from "../pages/SearchPage";
import CompanyInfoPage from "../pages/CompanyInfoPage";
import CompanyEstablishmentPage from "../pages/CompanyEstablishmentPage";
import CompanyShareholderManagePage from "../pages/CompanyShareholderManagePage";
import Layout from "../components/feature/navbar/Navbar";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<SearchPage />} />
                    <Route path="andmed" element={<CompanyInfoPage />} />
                    <Route path="asutamine" element={<CompanyEstablishmentPage />} />
                    <Route path="muutmine" element={<CompanyShareholderManagePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
