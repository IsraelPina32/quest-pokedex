import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { ThemeContext } from "../../contexts/index";
import { useContext } from "react";

const StyleContainer = styled.div`
    height: 100vh;
    max-width: 2240px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`
const StyleCardDefault = styled.div`
    position: relative;
    top: 200px;
    font-size: 1.2rem;
    font-weight:600;
`

const StyleCardDetails = styled.div`
    display: flex;
    gap: 0.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    list-style: none;
    font-weight: 500;
    width: 45%;
    border-radius: 0.5rem;
    background: url("/assets/background.jpg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    object-fit: cover;
    box-shadow: 0 0 1em #000;
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
    opacity: 0.9;
`
const StyleH1 = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;
`
const StyleImg = styled.img`
    width: 250px;
    height: 250px;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`
const StyleSkills = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgb(82, 84, 85);
    border: 1px solid #ffffff;
`
const StyleP = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
`
const StyleList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
`
const StyleL = styled.li`
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 0.8rem;
    font-weight: 700;
    list-style: none;
    background-color: ${({ type }) => getTypeColors(type)}
`
const StyleButton = styled.button`
    padding: 0.5rem;
    margin-top: 0.5rem;
    background: none;
    background-color:rgb(93, 96, 97);
    box-shadow: 0 0 0.5em #000;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    top: 15px;
    right: 130px;
`

const StyleArrowReturn = styled.img`
    height: 30px;
    width: 30px;
`
export const CardsDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                if (!response.ok) {
                    throw new Error(`Error de requisição : ${response.status}`);
                }
                const data = await response.json();
                setPokemon(data)
                setLoading(false);
            } catch (error) {
                console.log("Error: ", error.message);
                setError(error.message);
            }
        }
        fetchPokemon();
    }, [name]);

    if (loading) {
        return (
            <StyleCardDefault>
                <StyleImg src="https://pbs.twimg.com/media/EQCJmpQUEAA4eQj.jpg:large" alt="Carregando" />
                <StyleH1>Buscando o seu Pokemon, aguarde...</StyleH1>
                <StyleButton onClick={() => navigate("/")}>Voltar para a Pagina Inicial</StyleButton>
            </StyleCardDefault>
        )
    }

    if (error) {
        return (
            <StyleCardDefault>
                <StyleImg src="https://media.tenor.com/QvnSpdGuVXUAAAAM/pikachu-crying.gif" alt="Erro 404" />
                <StyleH1>Error o Pokemon Digitado não foi encontrado, tente novamente.</StyleH1>
                <StyleButton onClick={() => navigate("/")}>Volte para a Pagina Inicial</StyleButton>
            </StyleCardDefault>
        )
    }
    const { theme } = useContext(ThemeContext)

    return (
        <StyleContainer style={{ color: theme.color, background: theme.background }}>
            <StyleCardDetails>
                <StyleButton onClick={() => navigate("/")} aria-label="Voltar para o Menu Principal">
                    <StyleArrowReturn src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-2/48/123-512.png" alt="Icone de Voltar" />
                </StyleButton>
                <StyleH1>{pokemon.name}</StyleH1>
                <StyleImg src={pokemon.sprites?.front_default || 'url_not_found'} alt={pokemon.name} />
                <StyleSkills>
                    <StyleP>Altura: {(pokemon.height / 10).toFixed(1)} m</StyleP>
                    <StyleP>Peso: {(pokemon.weight / 10).toFixed(1)} kg</StyleP>
                    <StyleP>Tipos </StyleP>
                    <StyleList> {pokemon.types?.length > 0 ? (
                        pokemon.types.map((type) => (
                            <StyleL key={type.type.name} type={type.type.name}>{type.type.name}</StyleL>
                        ))
                    ) : (
                        <StyleL type="normal">Normal</StyleL>
                    )}
                    </StyleList>
                </StyleSkills>
            </StyleCardDetails>
        </StyleContainer>
    )
}