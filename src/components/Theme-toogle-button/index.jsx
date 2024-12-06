import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/index";
import styled from "styled-components";

const StyleButtonTheme = styled.button`
    display: flex;
    background-color: #E7E7E6;
    border: none;
    padding: 0.3rem;
    border: 0.5px solid #FBD570;
    border-radius: 0.8rem;
    cursor: pointer;
`
export const ThemeToogleButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return <StyleButtonTheme onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>< img src={theme === themes.light ? 'https://img.icons8.com/ios/25/000000/sun.png' : 'https://img.icons8.com/ios/25/000000/moon.png'}/></StyleButtonTheme>
}