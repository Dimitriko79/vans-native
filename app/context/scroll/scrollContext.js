import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const [resetScroll, setResetScroll] = useState(false);

    return (
        <ScrollContext.Provider value={{ resetScroll, setResetScroll }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollContext = () => useContext(ScrollContext);