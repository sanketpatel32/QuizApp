import { createContext, useState } from 'react';

export const SideBarContext = createContext();

const SideBarContextProvider = ({ children }) => {
    
    const [optionSelected, setOptionSelected] = useState("Dashboard");

    return (
        <SideBarContext.Provider value={{ optionSelected, setOptionSelected }}>
            {children}
        </SideBarContext.Provider>
    );
}

export default SideBarContextProvider;
