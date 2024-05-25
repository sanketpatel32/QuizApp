import { useContext, useState } from "react";

import globalModalStyles from "../Modal.module.css";
import styles from './QnAQuizCreatingModal.module.css';

import { ModalContext } from "../../../context/ModalContext";

const QnAQuizCreatingModal = () => {
  const { setShowQnAQuizCreatingModal } = useContext(ModalContext);
  return (
    <>
      <div className={globalModalStyles.darkBG} onClick={() => setShowQnAQuizCreatingModal(false)} />
      <div className={globalModalStyles.centered}>
        <div className={styles.modal}>

          <div className={styles.topDiv}> 
            <div className={styles.slidesIndex}>1</div>
            <div className={styles.slidesIndex}>2</div>
            <div className={styles.slidesIndex}>3</div>
          </div>

          
        </div>
      </div>

    </>
  )
}

export default QnAQuizCreatingModal