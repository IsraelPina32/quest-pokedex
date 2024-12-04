import { Cards } from "../../src/components/Cards/index"
import { Navbar } from "../../src/components/Navbar/index"
import { ThemeContext } from "../../src/contexts/index"
import { useContext } from "react"
import { Button } from "../components/Button"
import styled from "styled-components"

const StyleHomePage = styled.div`
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
`
export const Home = () =>  {
    const {theme} = useContext(ThemeContext)
    return (
        <StyleHomePage style={{color: theme.color, background: theme.background} }>
            <Navbar/>
            <Cards/> 
        </StyleHomePage>
    )
}
