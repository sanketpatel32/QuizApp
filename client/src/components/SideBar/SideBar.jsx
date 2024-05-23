import { useContext, useState } from 'react'
import styles from './SideBar.module.css'
import {ModalContext} from '../../context/ModalContext'
import { SideBarContext } from '../../context/SideBarContext'
import QuizCreatingModal from '../CreateQuiz/QuizCreatingModal'
import QnAQuizCreatingModal from '../CreateQuiz/QuizTypeModal/QnAQuizCreatingModal'
import PollQuizCreatingModal from '../CreateQuiz/QuizTypeModal/PollQuizCreatingModal'
const SideBar = () => {

  const { setOptionSelected } = useContext(SideBarContext);
  const { showQuizCreatingModal, setShowQuizCreatingModal, showQnAQuizCreatingModal, setShowQnAQuizCreatingModal, showPollQuizCreatingModal, setShowPollQuizCreatingModal } = useContext(ModalContext)
  const handleOptionChange = (newOption) => {
    setOptionSelected(newOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>QUIZZIE</div>
      <div className={styles.optionsBar}>
        <div className={styles.options} onClick={() => handleOptionChange("Dashboard")}>Dashboard</div>
        <div className={styles.options} onClick={() => handleOptionChange("Analytics")}>Analytics</div>
        <div className={styles.options} onClick={() => setShowQuizCreatingModal(true)}>Create Quiz</div>

        {showQuizCreatingModal && <QuizCreatingModal/>}
        {showQnAQuizCreatingModal && <QnAQuizCreatingModal/>}
        {showPollQuizCreatingModal && <PollQuizCreatingModal/>}
      </div>
      <div className={styles.bottomDiv}>

        <div className={styles.options}>LOGOUT</div>
      </div>
    </div>
  )
}

export default SideBar