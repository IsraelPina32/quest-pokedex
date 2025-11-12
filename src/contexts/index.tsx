import {createContext, useState} from "react";
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

type ThemeProviderProps = {
    children: React.ReactNode;
}

export const ThemeContext = createContext({})
export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(themes.light);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
