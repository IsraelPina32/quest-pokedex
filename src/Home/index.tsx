import { Cards } from "../components/Cards/index"
import { Header } from "../components/Header/index"
import { ThemeContext } from "../contexts/index"
import { useContext } from "react"
import styled from "styled-components"

const StyleHomePage = styled.div`
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        min-height: 100vh;
`
export const Home = () =>  {
    const { theme }  = useContext(ThemeContext)
    return (
        <StyleHomePage theme={theme}>
            <Header/>
            <Cards/> 
        </StyleHomePage>
    )
}