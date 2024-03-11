import React, { useEffect, useState } from 'react';
import styles from "./css/EstablishmentShareholdersData.module.css";
import apiService from "../../../services/ApiService";
import { useError } from "../../../contexts/ErrorContext";

const EstablishmentShareholdersData = ({ handleShareholdersData }) => {
    const [shareholders, setShareholders] = useState([]);
    const [showLastRow, setShowLastRow] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [newShareholder, setNewShareholder] = useState({
        identification_code: '',
        shareSize: 0,
    });
    const { showError } = useError();

    useEffect(() => {
        handleShareholdersData(shareholders);
    }, [shareholders]);

    const fetchPersons = async () => {
        try {
            const response = await apiService.getPersons();
            setSearchResults(response);
        } catch (error) {
            console.error("Failed to fetch company data:", error);
        }
    };

    const handleAddShareholderClicked = () => {
        setShowLastRow(true);
        fetchPersons();
    };

    const handleNewShareholderChange = (event) => {
        const { name, value } = event.target;
        setNewShareholder(prevState => ({
            ...prevState,
            [name]: name === 'shareSize' ? Number(value) : value,
        }));
    };

    const handleAddRowClicked = () => {
        if (!newShareholder.identification_code) {
            showError('Palun vali isik');
            return;
        }
        if (!newShareholder.shareSize || isNaN(newShareholder.shareSize) || newShareholder.shareSize <= 0) {
            showError("Palun sisesta õige osaniku osa suurus (miinimum on 1 euro)");
            return;
        }

        const existingIndex = shareholders.findIndex(shareholder => shareholder.identification_code === newShareholder.identification_code);

        if (existingIndex !== -1) {
            const updatedShareholders = [...shareholders];
            updatedShareholders[existingIndex] = {
                ...updatedShareholders[existingIndex],
                shareSize: updatedShareholders[existingIndex].shareSize + newShareholder.shareSize,
            };
            setShareholders(updatedShareholders);
        } else {
            setShareholders(prevShareholders => [
                ...prevShareholders,
                {
                    ...newShareholder,
                    name: searchResults.find(p => p.identification_code === newShareholder.identification_code)?.name,
                    isFounder: true,
                }
            ]);
        }

        setNewShareholder({ identification_code: '', shareSize: 0 });
        setShowLastRow(false);
    };

    return (
        <div>
            <h3>Osanikud</h3>
            <table>
                <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Osaniku osa suurus (€)</th>
                </tr>
                </thead>
                <tbody>
                {shareholders.map((shareholder, index) => (
                    <tr key={index}>
                        <td>{shareholder.name}</td>
                        <td>{shareholder.shareSize}</td>
                    </tr>
                ))}
                {showLastRow && (
                    <tr>
                        <td>
                            <select name="identification_code" onChange={handleNewShareholderChange} value={newShareholder.identification_code || ''}>
                                <option value="">Vali isik</option>
                                {searchResults.map((person, index) => (
                                    <option key={index} value={person.identification_code}>{person.name}</option>
                                ))}
                            </select>
                        </td>
                        <td className={styles.lastColumn}>
                            <input type="number" name="shareSize" onChange={handleNewShareholderChange} value={newShareholder.shareSize || ''} />
                            <button className={styles.addButton} onClick={handleAddRowClicked}>Lisa</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <button className="shareholderButton" onClick={handleAddShareholderClicked}>+ Lisa osanik</button>
        </div>
    );
};

export default EstablishmentShareholdersData;
