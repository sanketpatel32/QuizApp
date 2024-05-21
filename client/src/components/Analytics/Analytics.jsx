import React from 'react'
import styles from './Analytics.module.css'
import AnalyticsDashboard from './AnalyticsDashboard/AnalyticsDashboard'
const Analytics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        Quiz Analysis
      </div>
      <div className={styles.AnalyticsDashboard}>
        <AnalyticsDashboard />
      </div>

    </div>
  )
}

export default Analytics