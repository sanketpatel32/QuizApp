import React from 'react'
import styles from './AnalyticsDashboard.module.css'
import AnalyticsDashboardItem from './AnalyticsDashboardItem/AnalyticsDashboardItem'
const AnalyticsDashboard = () => {
    return (
        <div >
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Quiz Name</th>
                        <th>Created On</th>
                        <th>Impression</th>
                        <th> </th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <AnalyticsDashboardItem/>
                    <AnalyticsDashboardItem/>
                    <AnalyticsDashboardItem/>
                    <AnalyticsDashboardItem/>
                </tbody>
            </table>

        </div>
    )
}

export default AnalyticsDashboard