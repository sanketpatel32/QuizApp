import { useContext, useState } from "react";

import globalModalStyles from "../Modal.module.css";
import styles from './QnAQuizCreatingModal.module.css';

import { ModalContext } from "../../../context/ModalContext";
const PollQuizCreatingModal = () => {
  const { setShowPollQuizCreatingModal } = useContext(ModalContext);
  return (
    <>
      <div className={globalModalStyles.darkBG} onClick={() => setShowPollQuizCreatingModal(false)} />
      <div className={globalModalStyles.centered}>
        <div className={styles.modal}>
        </div>
      </div>
    </>
  )
}

export default PollQuizCreatingModal