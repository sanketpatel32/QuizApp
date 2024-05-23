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
        </div>
      </div>

    </>
  )
}

export default QnAQuizCreatingModal