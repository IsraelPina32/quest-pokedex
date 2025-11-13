import {createContext, useState} from "react";
import { themes, ThemeType } from "../styles/themes";

type ThemeContextType = {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: themes.light,
    setTheme: () => {}
});

type ThemeProviderProps = {
    children: React.ReactNode;
};

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>(themes.light);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};