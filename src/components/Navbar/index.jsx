import styled from "styled-components"
import { ThemeToogleButton } from "../Theme-toogle-button"

const StyleNavBar = styled.div`
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 0 1.5rem;
     position: fixed;
     height: 52px;
     top: 0;
     left: 0;
     right: 0;
     z-index: 1;
`
const StyleImage = styled.img`
    width: 150px;
    padding: 1rem;
`
const StyleInput = styled.input`
    padding: 0.6rem;
    border-radius: 10px;
    border: 1px solid #ffe62d;
`
export const Navbar = () => {
    return (
        <StyleNavBar>
            <StyleImage src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi-logo"  className="navbar-logo"/>
            <StyleInput type="text" placeholder="Pesquise o seu pokemon" />
            <ThemeToogleButton/>
        </StyleNavBar>
    )
}

