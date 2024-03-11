import styles from "./css/CompanyShareholdersData.module.css";
import {useNavigate} from "react-router-dom";

const CompanyShareholdersData = ({shareholdersData, registerCode}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.block}>
            <h2 className={styles.pealkiri}>Osalus</h2>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Nimi</th>
                    <th>Registrikood/Isikukood</th>
                    <th>Osa suurus</th>
                    <th>Asutaja</th>
                </tr>
                </thead>
                <tbody>
                {shareholdersData.map((tablerow, index) => (
                    <tr key={index}>
                        <td>{tablerow.name}</td>
                        <td>{tablerow.identification_code}</td>
                        <td>{tablerow.share_size}</td>
                        <td>{tablerow.is_founder ? 'Jah' : 'Ei'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.saveButtonDiv}>
                <button onClick={() => navigate("/muutmine", { state: {shareholdersData: shareholdersData, registerCode: registerCode}})}>Muuda</button>
            </div>
        </div>
    );
};

export default CompanyShareholdersData;
