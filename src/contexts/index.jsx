import React, {createContext, useState} from "react";
export const themes =  {
    light: {
        color: '#111d13',
        background: '#ecf8f8',        
    },
    dark: {
        color: '#fbfbf2',
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
