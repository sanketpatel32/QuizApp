import styles from './MainPage.module.css'

import TopDiv from './TopDiv/TopDiv'
import TrendingQuiz from './TrendingQuiz/TrendingQuiz'

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.TopDiv}>
        <TopDiv />
      </div>
      <div className={styles.TrendingQuiz}>
        <TrendingQuiz />
      </div>

    </div>
  )
}

export default MainPage