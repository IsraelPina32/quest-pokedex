import { Cards } from "../components/Cards/index"
import { Header } from "../components/Header/index"
import { ThemeContext } from "../contexts/index"
import { useContext } from "react"
import styled from "styled-components"

const StyleHomePage = styled.body`
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        background: ${({ theme }) => theme.background};
`
export const Home = () =>  {
    const {theme} = useContext(ThemeContext)
    return (
        <StyleHomePage style={{color: theme.color, background: theme.background} }>
            <Header/>
            <Cards/> 
        </StyleHomePage>
    )
}
