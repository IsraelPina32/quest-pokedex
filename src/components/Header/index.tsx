import styled from "styled-components"
import { ThemeToogleButton } from "../Theme-toogle-button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getTypeColors from "../../utils/GetTypeColors"

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

    @media (max-width: 425px) {
        flex-direction: column;
        height: auto;
        padding: 0 0.5rem 0 0.5rem;
        gap:1rem;
    }
`

const StyleImage = styled.img`
    width: 150px;
    padding: 1rem;

     @media (max-width: 425px) {
        width: 100px;
        padding: 0 0.5rem;
    }
`

const StyleCardsInputs = styled.div`
    display: flex;
`
const StyleInput = styled.input`
    padding: 0.6rem;
    border-radius: 10px;
    border: 1px solid #ffffff;
    margin-right: 0.2rem;

    &.error {
        border-color: red;
        color: red;
    }
    &.error::placeholder {
        color: red;
    }

       @media (max-width: 425px) {
        width: 100%;
       padding: 0.7rem 0.5rem;
    }
`

const StyleSelect = styled.select`
    padding: 0.6rem;
    border-radius:  10px;
    border: 1px solid #ffffff;
    margin-right: 0.2rem;

    &.error {
        border-color: red;
        color: red;
    }

    @media (max-width: 425px) {
        width: 100%;
        padding: 0.7rem 0.5rem;
    }
`
const StyleOption = styled.option`
    background-color: ${({ type }) => getTypeColors(type)};
    padding: 1rem;
    font-weight: bold;
    font-size: 0.8rem;
    text-align: center;
    color: #e7d8c9;
`
const StyleButton = styled.button`
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #ffffff;
    background-color: #ffff;
    cursor: pointer;

     &.error {
        border-color: red;
        color: red;
    }

    @media (max-width: 425px) {
        width: 30%;
        padding: 0.5rem;
    }

`

export const Header = () => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimedQuery = query.trim().toLowerCase();
        if (trimedQuery) {
            navigate(`/pokemon/${trimedQuery}`);
            setError("");
        } else if (type) {
            navigate(`/type/${type}`);
            setError("");
        } else {
            setError("Digite o nome de um Pokémon ou selecione um tipo 👨🏻‍🚀");
        }
    }
    return (
        <StyleNavBar>
            <StyleImage src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="pokeapi-logo" className="navbar-logo" />
            <StyleCardsInputs>
                <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
                    <StyleInput type="text" placeholder="Pesquise o seu pokemon"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={error ? "error" : ""}
                    />
                    <StyleSelect value={type} className={error ? "error" : ""} onChange={(e) => setType(e.target.value)}>
                        <StyleOption value="" type="">Selecione o seu tipo</StyleOption>
                        <StyleOption value="normal" type="normal">Normal</StyleOption>
                        <StyleOption value="fire" type="fire">Fogo</StyleOption>
                        <StyleOption value="water" type="water">Água</StyleOption>
                        <StyleOption value="electric" type="electric">Elétrico</StyleOption>
                        <StyleOption value="grass" type="grass">Grama</StyleOption>
                        <StyleOption value="ice" type="ice">Gelo</StyleOption>
                        <StyleOption value="fighting" type="fighting">Lutador</StyleOption>
                        <StyleOption value="poison" type="poison">Veneno</StyleOption>
                        <StyleOption value="ground" type="ground">Terra</StyleOption>
                        <StyleOption value="flying" type="flying">Voador</StyleOption>
                        <StyleOption value="psychic" type="psychic">Psíquico</StyleOption>
                        <StyleOption value="bug" type="bug">Inseto</StyleOption>
                        <StyleOption value="rock" type="rock">Pedra</StyleOption>
                        <StyleOption value="ghost" type="ghost">Fantasma</StyleOption>
                        <StyleOption value="dragon" type="dragon">Dragão</StyleOption>
                        <StyleOption value="dark" type="dark">Sombrio</StyleOption>
                        <StyleOption value="steel" type="steel">Aço</StyleOption>
                        <StyleOption value="fairy" type="fairy">Fada</StyleOption>
                    </StyleSelect>
                    <StyleButton type="submit" className={error ? "error" : ""}>🏸</StyleButton>
                </form>
            </StyleCardsInputs>
            <ThemeToogleButton />
        </StyleNavBar>
    )
}

