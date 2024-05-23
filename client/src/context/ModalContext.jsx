import { createContext, useState } from "react";

export const ModalContext = createContext();
const ModalContextProvider = ({ children }) => {
    const [showQuizCreatingModal, setShowQuizCreatingModal] = useState(false);
    const [showQnAQuizCreatingModal, setShowQnAQuizCreatingModal] = useState(false);
    const [showPollQuizCreatingModal, setShowPollQuizCreatingModal] = useState(false);

    return (
        <ModalContext.Provider value={{ showQuizCreatingModal, setShowQuizCreatingModal, showQnAQuizCreatingModal, setShowQnAQuizCreatingModal, showPollQuizCreatingModal, setShowPollQuizCreatingModal }}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalContextProvider;