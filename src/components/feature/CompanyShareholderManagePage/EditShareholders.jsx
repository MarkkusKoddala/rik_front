import React, {useState} from 'react';
import styles from "./css/EditShareholders.module.css"
import apiService from "../../../services/ApiService";
import {useError} from "../../../contexts/ErrorContext";

const EditShareholders = ({shareholders, handleSaveClicked, setShareholders}) => {
    const [editableRow, setEditableRow] = useState([]);
    const [showAddNewShareholder, setShowAddNewShareholder] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const {showError} = useError();



    const handleRowButtonClick = (index) => {

        if(editableRow.includes(index)) { //If true, siis on vajutatud salvesta nuppu mingil real
            if (shareholders[index].share_size < 1){
                showError("Osa suurus ei tohi olla väiksem kui 1")
                return
            }
            setEditableRow( (prevState) => {
                return prevState.filter(item => item !== index);
            })
        } else { //"Muuda" nupp on näha
            setEditableRow( (prevState) => {
                return [...prevState, index]
            })
        }
    }

    const handleShareSizeChange = (index, value) =>  {
        const updatedShareholders = shareholders.map((shareholder, idx) => {
            if (idx === index) {
                return { ...shareholder, share_size: Number(value) };
            }
            return shareholder;
        });
        setShareholders(updatedShareholders)
    }

    const handleAddShareholderClick = () => {
        setShowAddNewShareholder(prevState => !prevState)
        fetchPersons()
    }

    const fetchPersons = async () => {
        try {
            const response = await apiService.getPersons();
            setSearchResult(response);
        } catch (error) {
            console.error("Failed to fetch company data:", error);
        }
    };

    const handleSelectedPersonClick =  (selectedPerson) => {
        const personExists = shareholders.some(shareholder => shareholder.identification_code === selectedPerson.identification_code);

        if(personExists) {
            showError("Valitud isik on juba osanik")
            return
        }

        const newShareholder = {
            name: selectedPerson.name,
            identification_code: selectedPerson.identification_code,
            share_size: 1,
            is_founder: false
        }

        setShareholders( (prevState) => {
            return [...prevState, newShareholder]
        })

        setShowAddNewShareholder(false)

    }

    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Registrikood/Isikukood</th>
                    <th>Osa suurus</th>
                    <th>Asutaja</th>
                    <th className={styles.editButtonCell}></th>
                </tr>
                </thead>
                <tbody>
                {shareholders.map((tablerow, index) => (
                    <tr key={index}>
                        <td>{tablerow.name}</td>
                        <td>{tablerow.identification_code}</td>
                        <td>
                            {editableRow.includes(index) ?
                                <input
                                    value={tablerow.share_size || null}
                                    type={"number"}
                                    onChange={(e) => handleShareSizeChange(index, e.target.value)}
                                    className={styles.inputShareSize}
                                /> :
                                tablerow.share_size}
                        </td>
                        <td>{tablerow.is_founder ? 'Jah' : 'Ei'}</td>
                        <td className={styles.editButtonCell}>
                            <button className={styles.editButton} onClick={() => handleRowButtonClick(index)}>
                                {editableRow.includes(index) ? "Salvesta" : "Muuda"}
                            </button>
                        </td>
                    </tr>
                ))}
                {showAddNewShareholder &&
                    <tr>
                        <td>
                            <select
                                name="identification_code"
                                onChange={(e) => handleSelectedPersonClick(searchResult[e.target.value])}
                                className={styles.selectShareholder}
                                value={''}>
                                <option value="">Vali isik</option>
                                {searchResult.map((person, index) => (
                                    <option key={index} value={index}>{person.name}</option>
                                ))}
                            </select>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                }
                </tbody>
            </table>
            <button onClick={handleAddShareholderClick}>+ Lisa osanik</button>
            <br/>
            <div className={styles.saveButtonDiv}>
                <button onClick={handleSaveClicked}>Salvesta</button>
            </div>
        </div>
    );
};

export default EditShareholders;