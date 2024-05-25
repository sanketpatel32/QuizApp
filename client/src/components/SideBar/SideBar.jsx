import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast, Flip } from 'react-toastify';
import axios from 'axios';

import styles from './SideBar.module.css'

import { ModalContext } from '../../context/ModalContext'
import { SideBarContext } from '../../context/SideBarContext'
import { AuthorizationContext } from '../../context/AuthorizationContext.jsx';

import QuizCreatingModal from '../CreateQuiz/QuizCreatingModal'
import QnAQuizCreatingModal from '../CreateQuiz/QuizTypeModal/QnAQuizCreatingModal'
import PollQuizCreatingModal from '../CreateQuiz/QuizTypeModal/PollQuizCreatingModal'

const SideBar = () => {

  const navigate = useNavigate();

  //------------------------------------------CONTEXTS-------------------------------------------------
  const { setOptionSelected } = useContext(SideBarContext);
  const { setUserDetails, setIsLoggedIn } = useContext(AuthorizationContext);
  const { showQuizCreatingModal, setShowQuizCreatingModal, showQnAQuizCreatingModal, showPollQuizCreatingModal, } = useContext(ModalContext)

  const handleOptionChange = (newOption) => {
    setOptionSelected(newOption);
  };

  const logoutClickHandler = () => {
    axios.post('api/auth/logout')
      .then((res) => {
        toast.success('LogOut was Successful', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Flip,
        });
        setIsLoggedIn(false);
        localStorage.removeItem('currentUser');
        setUserDetails(null);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>QUIZZIE</div>
      <div className={styles.optionsBar}>
        <div className={styles.options} onClick={() => handleOptionChange("Dashboard")}>Dashboard</div>
        <div className={styles.options} onClick={() => handleOptionChange("Analytics")}>Analytics</div>
        <div className={styles.options} onClick={() => setShowQuizCreatingModal(true)}>Create Quiz</div>

        {showQuizCreatingModal && <QuizCreatingModal />}
        {showQnAQuizCreatingModal && <QnAQuizCreatingModal />}
        {showPollQuizCreatingModal && <PollQuizCreatingModal />}
      </div>
      <div className={styles.bottomDiv}>

        <div className={styles.options} onClick={logoutClickHandler}>LOGOUT</div>
      </div>
    </div>
  )
}

export default SideBar