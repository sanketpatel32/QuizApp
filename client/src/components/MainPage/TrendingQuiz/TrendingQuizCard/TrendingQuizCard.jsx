import React from 'react'
import styles from './TrendingQuizCard.module.css'
import { FaRegEye } from "react-icons/fa6";
const TrendingQuizCard = ({title,impression,date}) => {
    return (
        <div className={styles.container}>
            <div className={styles.upperPart}>
                <div className={styles.heading}>{title}</div>
                <div className={styles.eyeIcon}>{impression} <FaRegEye/></div>
            </div>
            <div className={styles.lowerPart}>
                Created on: {date}
            </div>
        </div>

    )
}

export default TrendingQuizCard;