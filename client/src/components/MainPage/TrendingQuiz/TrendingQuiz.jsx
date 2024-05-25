import styles from './TrendingQuiz.module.css'

import TrendingQuizCard from './TrendingQuizCard/TrendingQuizCard'

const TrendingQuiz = () => {

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Trending Quiz</div>
      <div className={styles.cardContainer}>
        <TrendingQuizCard title="Quiz 1" impression={34} date="04 Sept 2024" />
        <TrendingQuizCard title="Quiz 1" impression={34} date="04 Sept 2024" />
        <TrendingQuizCard title="Quiz 1" impression={34} date="04 Sept 2024" />
        <TrendingQuizCard title="Quiz 1" impression={34} date="04 Sept 2024" />
        <TrendingQuizCard title="Quiz 1" impression={34} date="04 Sept 2024" />
      </div>

    </div>
  )
}

export default TrendingQuiz