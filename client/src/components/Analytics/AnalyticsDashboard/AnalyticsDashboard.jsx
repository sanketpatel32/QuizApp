import React from 'react'
import styles from './AnalyticsDashboard.module.css'
const AnalyticsDashboard = () => {
    return (
        <div >
            <table className={styles.table}>
                <tr>
                    <th>S.No</th>
                    <th>Quiz Name</th>
                    <th>Created On</th>
                    <th>Impression</th>
                    <th> </th>
                    <th> </th>
                </tr>
            </table>

        </div>
    )
}

export default AnalyticsDashboard