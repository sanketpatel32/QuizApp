import styles from './TopDiv.module.css'

const TopDiv = () => {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.cardTopSide}>
                    <div className={styles.cardNumber}>13</div>
                    <div className={styles.cardName}>Views</div>
                </div>
                <div className={styles.cardBottomSide}>
                    <div className={styles.cardVerb}>Created</div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardTopSide}>
                    <div className={styles.cardNumber}>13</div>
                    <div className={styles.cardName}>Views</div>
                </div>
                <div className={styles.cardBottomSide}>
                    <div className={styles.cardVerb}>Created</div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardTopSide}>
                    <div className={styles.cardNumber}>13</div>
                    <div className={styles.cardName}>Views</div>
                </div>
                <div className={styles.cardBottomSide}>
                    <div className={styles.cardVerb}>Created</div>
                </div>
            </div>
        </div>
    )
}

export default TopDiv