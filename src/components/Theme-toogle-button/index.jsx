import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/index";
import styled from "styled-components";

const StyleButtonTheme = styled.button`
    background-color: #FE4B00;
    color: #FAFAFA;
    border: none;
    padding: 0.6rem;
    border: 1px solid #FBD570;
    border-radius: 0.5rem;
    cursor: pointer;
`
export const ThemeToogleButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return <StyleButtonTheme onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>Mude o tema</StyleButtonTheme>
}