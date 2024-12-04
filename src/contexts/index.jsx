import React, {createContext, useState} from "react";

export const themes =  {
    light: {
        color: '#2b2d42',
        background: '#edf2f4'
    },
    dark: {
        color: '#edf2f4',
        background: '#0a0908'
    }
}

export const ThemeContext = createContext({})
export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}
