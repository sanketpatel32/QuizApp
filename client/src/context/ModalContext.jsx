import { createContext, useState } from "react";

export const ModalContext = createContext();
const ModalContextProvider = ({ children }) => {
    const [showQuizCreatingModal, setShowQuizCreatingModal] = useState(false);
    const [showQnAQuizCreatingModal, setShowQnAQuizCreatingModal] = useState(false);
    
    return (
        <ModalContext.Provider value={{ showQuizCreatingModal, setShowQuizCreatingModal }}>
            {children}
        </ModalContext.Provider>
    )
}
export default ModalContextProvider;