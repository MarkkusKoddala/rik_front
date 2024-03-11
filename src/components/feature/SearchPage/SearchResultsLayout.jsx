import React from 'react';
import styles from './css/SearchResultsLayout.module.css';
import {Link} from "react-router-dom"; // Make sure to create this CSS module file

const SearchResultsLayout = ({results}) => {
    return (
        <div className={styles.resultsContainer}>
            <ul className={styles.resultsList}>
                {results.map((result, index) => (
                    <li key={index} className={styles.resultItem}>
                        <Link className={styles.resultContent} to={"/andmed"} state={ {registerCode: result.register_code}}>
                            <h3>{result.name}</h3>
                            <p className={styles.resultCode}>Code: {result.register_code}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResultsLayout;