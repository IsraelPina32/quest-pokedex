import { useContext } from "react"
import { ThemeContext } from "../../contexts/index";
import { themes } from "../../styles/themes";
import styled, {css} from "styled-components";

const glowColorLight = "rgba(255, 215, 0, 0.22)"; // dourado suave
const glowColorDark = "rgba(82, 183, 136, 0.18)"; // ciano suave para dark

const Size = {
  px: 36,
  icon: 20,
};

const StyleButtonTheme = styled.button<{ $isLight: boolean}>`
    display: flex;
    border: none;
    padding: 0.3rem;
    border-radius: 0.8rem;
    cursor: pointer;
    --size: ${Size.px}px;
    position: relative;
    background: ${({ $isLight }) =>
    $isLight
      ? "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.14))"
      : "linear-gradient(180deg, rgba(10,10,12,0.22), rgba(10,10,12,0.12))"};
    color: ${({ $isLight }) => ($isLight ? "#111" : "#fff")};
    transition: transform 160ms ease, box-shadow 180ms ease, background 180ms ease;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border: 1px solid
    ${({ $isLight }) => ($isLight ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.06)")};
    box-shadow:
    0 6px 18px rgba(2,6,23,0.06), /* soft outer shadow */
    inset 0 0 10px ${({ $isLight }) => ($isLight ? glowColorLight : glowColorDark)}; /* inner glow */

  @supports not ((-webkit-backdrop-filter: blur(8px)) or (backdrop-filter: blur(8px))) {
    background: ${({ $isLight }) =>
      $isLight ? "rgba(255,255,255,0.88)" : "rgba(20,20,20,0.86)"};
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.03);
    box-shadow:
      0 14px 30px rgba(2,6,23,0.12),
      inset 0 0 10px ${({ $isLight }) => ($isLight ? glowColorLight : glowColorDark)};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.99);
    box-shadow:
      0 8px 18px rgba(2,6,23,0.08),
      inset 0 0 10px ${({ $isLight }) => ($isLight ? glowColorLight : glowColorDark)};
  }

  &:focus-visible {
    outline: 3px solid rgba(82, 183, 136, 0.18);
    outline-offset: 4px;
  }

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const StyleImage = styled.img`
  width: ${Size.icon}px;
  height: ${Size.icon}px;
  display: block;
  object-fit: contain;  
   user-select: none;
  -webkit-user-drag: none;
  fill: #ffff;
`
export const ThemeToogleButton = () => {

    const { theme, setTheme } = useContext(ThemeContext) as any;
    const isLight = theme === themes.light;
    const toggle = () => setTheme(isLight ? themes.dark : themes.light);

    return  (
        <StyleButtonTheme 
            $isLight={theme === themes.light}
            onClick={toggle}
             aria-label="Toggle theme"
            >
                <StyleImage 
                    src={theme === themes.light ? 'https://img.icons8.com/m_rounded/512/FFFFFF/sun.png' : 'https://cdn3.iconfinder.com/data/icons/weather-ios-11-1/50/Clear_Night_Night_sky_Crescent_Stars_Apple_Flat_Weather-512.png'}
                    alt={theme === themes.light ? 'Icone de um sol para o tema claro' : 'Icone de uma Lua para o tema escuro'}
                />
                </StyleButtonTheme>
    )
}