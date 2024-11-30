import { Cards } from "../../src/components/Cards/index"
import { Navbar } from "../../src/components/Navbar/index"
import { ThemeContext } from "../../src/contexts/index"
import { useContext } from "react"
import { Button } from "../components/Button"
import styled from "styled-components"

const StyleHomePage = styled.div`
        height: 100vh;
        margin: 0 auto;
`
export const Home = () =>  {
    const {theme} = useContext(ThemeContext)
    return (
        <StyleHomePage style={{color: theme.color, background: theme.background} }>
            <Navbar/>
            
            <Cards/> 
            <Button/>
        </StyleHomePage>
    )
}
