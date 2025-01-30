import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/index";
import styled from "styled-components";

const StyleButtonTheme = styled.button`
    display: flex;
    background-color: #ffff;
    border: none;
    padding: 0.3rem;
    border: 0.5px solid rgb(238, 208, 125);
    border-radius: 0.8rem;
    cursor: pointer;
`

const StyleImage = styled.img`
    width: 25px;
    height: 25px;  
`
export const ThemeToogleButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return  (
        <StyleButtonTheme 
            onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}
             aria-label="Toggle theme"
            >
                <StyleImage 
                    src={theme === themes.light ? 'https://img.icons8.com/ios/25/000000/sun.png' : 'https://cdn3.iconfinder.com/data/icons/meteocons/512/moon-symbol-512.png'}
                 alt={theme === themes.light ? 'Icone de um sol para o tema claro' : 'Icone de uma Lua para o tema escuro'}
                />
                </StyleButtonTheme>
    )
}