import { useContext } from "react"
import { ThemeContext, themes } from "../../contexts/index";

export const ThemeToogleButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <>
            <button onClick={() => setTheme(theme === themes.light ? themes.dark : themes.light)}>Mude o tema</button>
        </>
    )
}