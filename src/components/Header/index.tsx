import styled from "styled-components"
import { ThemeToogleButton } from "../Theme-toogle-button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getTypeColors from "../../utils/GetTypeColors"


const brightTypes = ['electric', 'ice', 'flying', 'bug', 'grass', 'normal', 'steel'];

const StyleNavBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    position: fixed;
    height: 60px;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40; 
    
    /* Apple Glassmorphism Effect */
    background: rgba(255, 255, 255, 0.14); /* Quase transparente */
    backdrop-filter: blur(20px) saturate(180%); /* O desfoque pesado característico da Apple */
    -webkit-backdrop-filter: blur(20px) saturate(180%); /* Suporte Safari/iOS */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Borda de vidro sutil */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); /* Sombra suave e difusa */

    @media (max-width: 425px) {
        flex-direction: column;
        height: auto;
        padding: 0.5rem;
        gap: 0.4rem;
        background: rgba(255, 255, 255, 0.1); 
        backdrop-filter: blur(25px);
    }
`

const StyleImage = styled.img`
    width: 150px;
    padding: 1rem;
    border-radius: 0.8rem;

     @media (max-width: 425px) {
        width: 90px;
        padding: 0 0.4rem;
    }
`
const StyleCardsInputs = styled.div`
    display: flex;
`

const StyleInput = styled.input`
    padding: 0.7rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3); /* Ajustei a borda para combinar com o vidro */
    background: rgba(255, 255, 255, 0.15); /* Fundo levemente translúcido */
    backdrop-filter: blur(10px);
    margin-right: 0.7rem;
    font-weight: bold;
    color: inherit; /* Herda a cor do tema */

    &::placeholder {
        color: rgba(100, 100, 100, 0.8); /* Placeholder neutro */
    }

    &.error {
        border-color: #ff4d4d;
        color: #ff4d4d;
        background: rgba(255, 77, 77, 0.1);
    }
    &.error::placeholder {
        color: #ff4d4d;
    }

    @media (max-width: 425px) {
        width: 90%;
       padding: 0.4rem 0.4rem;
    }
`

const StyleSelect = styled.select`
    padding: 0.7rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15); /* Consistência com o Input */
    backdrop-filter: blur(10px);
    margin-right: 0.7rem;
    cursor: pointer;

    &.error {
        border-color: #ff4d4d;
        color: #ff4d4d;
    }

    @media (max-width: 425px) {
        width: 90%;
        padding: 0.4rem 0.4rem;
    }
`

const StyleOption = styled.option<{type: string}>`
    background-color: ${({ type }) => getTypeColors(type)};
    padding: 1.2rem;
    font-weight: 900;
    font-size: 0.9rem;
    text-align: center;
    color: ${({ type }) => brightTypes.includes(type) ? '#121212' : '#edf2f4'};
    
    text-shadow: ${({ type }) => brightTypes.includes(type) 
        ? 'none' 
        : '1px 1px 2px rgba(0,0,0,0.5)'};
`

const StyleButton = styled.button`
    padding: 0.5rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.4);
    }

     &.error {
        border-color: #ff4d4d;
        color: #ff4d4d;
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

    const handleSearch = (e: any) => {
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