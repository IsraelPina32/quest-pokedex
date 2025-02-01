import styled from "styled-components"
import { ThemeToogleButton } from "../Theme-toogle-button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
    
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`
const StyleImage = styled.img`
    width: 150px;
    padding: 1rem;
`
const StyleInput = styled.input`
    padding: 0.6rem;
    border-radius: 10px;
    border: 1px solid #ffffff;
    margin-right: 0.2rem;
`
const StyleButton = styled.button`
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #ffffff;
    background-color: #ffff;
    cursor: pointer;
    `
export const Navbar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimedQuery = query.trim().toLowerCase();
        if (trimedQuery) {
            navigate(`/pokemon/${query.toLowerCase()}`)
        }
    }
    return (
        <StyleNavBar>
            <StyleImage src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi-logo" className="navbar-logo" />
            <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
                <StyleInput type="text" placeholder="Pesquise o seu pokemon"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <StyleButton type="submit">🏸</StyleButton>
            </form>
            <ThemeToogleButton />
        </StyleNavBar>
    )
}

