import { useContext } from 'react'
import styles from './SideBar.module.css'
import { SideBarContext } from '../../context/SideBarContext'
const SideBar = () => {

  const { optionSelected, setOptionSelected } = useContext(SideBarContext);
  const handleOptionChange = (newOption) => {
    setOptionSelected(newOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>QUIZZIE</div>
      <div className={styles.optionsBar}>
        <div className={styles.options} onClick={() => handleOptionChange("Dashboard")}>Dashboard</div>
        <div className={styles.options} onClick={() => handleOptionChange("Analytics")}>Analytics</div>
        <div className={styles.options} onClick={() => handleOptionChange("CreateQuiz")}>Create Quiz</div>
      </div>
      <div className={styles.bottomDiv}>

        <div className={styles.options}>LOGOUT</div>
      </div>
    </div>
  )
}

export default SideBar