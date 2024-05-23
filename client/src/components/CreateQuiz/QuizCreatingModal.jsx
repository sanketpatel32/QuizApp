import { useContext, useState } from "react";
import globalModalStyles from "./Modal.module.css";
import styles from './QuizCreatingModal.module.css';
import { ModalContext } from "../../context/ModalContext";

const QuizCreatingModal = () => {
    const { showQuizCreatingModal, setShowQuizCreatingModal } = useContext(ModalContext);


    const [quizName, setQuizName] = useState("");
    const changeHandler = (e) => {
        console.log(e.target.value);
        setQuizName(e.target.value);
    }

    const [quizType, SetQuizType] = useState("QnA");

    return (
        <>
            <div className={globalModalStyles.darkBG} onClick={() => setShowQuizCreatingModal(false)} />
            <div className={globalModalStyles.centered}>
                <div className={styles.modal}>
                    <form className={styles.form}>
                        <div className={styles.inputBox}>
                            <input
                                className={styles.input}
                                type="text"
                                id="QuizName"
                                name="QuizName"
                                placeholder="Quiz Name"
                                onChange={changeHandler}
                                required
                            />
                        </div>

                        <div className={styles.questionType}>
                            <span className={styles.label}>Quiz Type</span>
                            <div className={`${styles.typeOptions} ${quizType === "QnA" ? styles.universalGreenBackground : ""}`} onClick={()=>SetQuizType("QnA")}>Q & A</div>
                            <div className={`${styles.typeOptions} ${quizType === "Poll" ? styles.universalGreenBackground : ""}`} onClick={() => SetQuizType("Poll")}>Poll</div>
                        </div>

                        <div className={styles.bottomDiv}>
                            <div className={styles.bottomDivOption} onClick={() => setShowQuizCreatingModal(false)}>Cancel</div>
                            <div className={styles.bottomDivOption}>Continue</div>
                        </div>


                    </form>
                </div >
            </div >
        </>
    );
};
export default QuizCreatingModal;